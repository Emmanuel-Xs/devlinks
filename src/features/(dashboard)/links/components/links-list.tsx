"use client";

import dynamic from "next/dynamic";
import { memo, useCallback, useState } from "react";

import {
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Loader from "@/components/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, User } from "@/drizzle/schema";

import { Button } from "../../../../components/ui/button";

import LinkCard from "./link-card";
import LinksPrompt from "./links-prompt";

const DndContextWithNoSSR = dynamic(
  () => import("@dnd-kit/core").then((mod) => mod.DndContext),
  { ssr: false, loading: () => <Loader /> }
);

const LinksList = memo(
  ({ user, userLinks }: { user: User; userLinks: Link[] }) => {
    const [linksArray, setLinksArray] = useState<Link[]>(
      userLinks.toSorted((a, b) => b.sequence - a.sequence)
    );
    const [activeItem, setActiveItem] = useState<Link | undefined>(undefined);

    const sensors = useSensors(
      useSensor(MouseSensor),
      useSensor(TouchSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    const addNewLink = useCallback(() => {
      setLinksArray((prev) =>
        [
          {
            id: Date.now(),
            userId: user.id,
            sequence: prev.length + 1,
            url: "",
            platform: "github" as const,
          },
          ...prev,
        ].toSorted((a, b) => b.sequence - a.sequence)
      );
    }, [user.id]);

    const updateLink = useCallback((id: number, updates: Partial<Link>) => {
      setLinksArray((prevLinks) =>
        prevLinks.map((link) =>
          link.id === id ? { ...link, ...updates } : link
        )
      );
    }, []);

    const removeLink = useCallback((id: number) => {
      setLinksArray((prev) => {
        const filtered = prev.filter((link) => link.id !== id);
        return filtered
          .map((link, i) => ({ ...link, sequence: filtered.length - i }))
          .toSorted((a, b) => b.sequence - a.sequence);
      });
    }, []);

    const reorderLinks = useCallback(
      (sequence: number, direction: "up" | "down") => {
        setLinksArray((prevLinks) => {
          const linkIndex = prevLinks.findIndex(
            (link) => link.sequence === sequence
          );
          if (
            (direction === "up" && linkIndex > 0) ||
            (direction === "down" && linkIndex < prevLinks.length - 1)
          ) {
            const newLinkIndex =
              direction === "up" ? linkIndex - 1 : linkIndex + 1;
            const newLinksArray = arrayMove(prevLinks, linkIndex, newLinkIndex);
            return newLinksArray
              .map((link, index) => ({
                ...link,
                sequence: newLinksArray.length - index,
              }))
              .toSorted((a, b) => b.sequence - a.sequence);
          }
          return prevLinks.toSorted((a, b) => b.sequence - a.sequence);
        });
      },
      []
    );

    const handleDragStart = useCallback(
      (event: DragStartEvent) => {
        const { active } = event;
        setActiveItem(linksArray?.find((link) => link.sequence === active.id));
      },
      [linksArray]
    );

    const handleDragEnd = useCallback(
      (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeItem = linksArray.find((ex) => ex.sequence === active.id);
        const overItem = linksArray.find((ex) => ex.sequence === over.id);

        if (!activeItem || !overItem) return;

        const activeIndex = linksArray.findIndex(
          (ex) => ex.sequence === active.id
        );
        const overIndex = linksArray.findIndex((ex) => ex.sequence === over.id);

        if (activeIndex !== overIndex) {
          setLinksArray((prev) =>
            arrayMove(prev, activeIndex, overIndex)
              .map((link, index) => ({
                ...link,
                sequence: prev.length - index,
              }))
              .toSorted((a, b) => b.sequence - a.sequence)
          );
        }

        setActiveItem(undefined);
      },
      [linksArray]
    );

    const handleDragCancel = useCallback(() => {
      setActiveItem(undefined);
    }, []);

    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          size="md"
          className="w-full"
          onClick={addNewLink}
        >
          + Add new link
        </Button>

        {linksArray?.length ? (
          <ScrollArea className="h-[70vh] w-full rounded-md">
            <div className="space-y-6">
              <DndContextWithNoSSR
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={linksArray.map((link) => link.sequence)}
                  strategy={verticalListSortingStrategy}
                >
                  {linksArray.map((link) => (
                    <LinkCard
                      links={link}
                      key={link.id}
                      updateLink={updateLink}
                      removeLink={removeLink}
                      reorderLinks={reorderLinks}
                    />
                  ))}
                </SortableContext>
                <DragOverlay
                  adjustScale
                  style={{ transformOrigin: "0 0 " }}
                  dropAnimation={null}
                  modifiers={[restrictToWindowEdges]}
                >
                  {activeItem ? (
                    <LinkCard
                      links={activeItem}
                      updateLink={updateLink}
                      removeLink={removeLink}
                      reorderLinks={reorderLinks}
                      forceDragging
                    />
                  ) : null}
                </DragOverlay>
              </DndContextWithNoSSR>
            </div>
          </ScrollArea>
        ) : (
          <LinksPrompt />
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Compare user and userLinks for equality
    return (
      prevProps.user.id === nextProps.user.id &&
      JSON.stringify(prevProps.userLinks) ===
        JSON.stringify(nextProps.userLinks)
    );
  }
);

// Set display name for debugging
LinksList.displayName = "LinksList";

export default LinksList;
