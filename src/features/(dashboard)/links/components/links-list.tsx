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
import { useLinksStore } from "@/store/links-store";

// import useLinksStore from "@/store/links-store";

import { Button } from "../../../../components/ui/button";

import LinkCard from "./link-card";
import LinksPrompt from "./links-prompt";

const DndContextWithNoSSR = dynamic(
  () => import("@dnd-kit/core").then((mod) => mod.DndContext),
  { ssr: false, loading: () => <Loader /> }
);

const LinksList = memo(
  ({ user }: { user: User }) => {
    const { links, addNewLink, updateLink, removeLink, reorderLinks } =
      useLinksStore((state) => state);

    const [activeItem, setActiveItem] = useState<Link | undefined>(undefined);

    const sensors = useSensors(
      useSensor(MouseSensor),
      useSensor(TouchSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    const handleAddNewLink = useCallback(() => {
      addNewLink({
        id: Date.now(),
        userId: user.id,
        sequence: links.length + 1,
        url: "",
        platform: "github" as const,
      });
    }, [addNewLink, user.id, links.length]);

    const handleUpDownMove = useCallback(
      (sequence: number, direction: "up" | "down") => {
        const currentIndex = links.findIndex(
          (link) => link.sequence === sequence
        );

        const newIndex =
          direction === "up" ? currentIndex - 1 : currentIndex + 1;
        if (newIndex >= 0 && newIndex < links.length) {
          const newLinks = arrayMove(links, currentIndex, newIndex);
          reorderLinks(newLinks);
        }
      },
      [links, reorderLinks]
    );

    const handleDragStart = useCallback(
      (event: DragStartEvent) => {
        const { active } = event;
        setActiveItem(links?.find((link) => link.sequence === active.id));
      },
      [links]
    );

    const handleDragEnd = useCallback(
      (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeIndex = links.findIndex((ex) => ex.sequence === active.id);
        const overIndex = links.findIndex((ex) => ex.sequence === over.id);

        if (activeIndex !== overIndex) {
          const newLinks = arrayMove(links, activeIndex, overIndex);
          reorderLinks(newLinks);
        }

        setActiveItem(undefined);
      },
      [links, reorderLinks]
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
          onClick={handleAddNewLink}
        >
          + Add new link
        </Button>

        {links?.length ? (
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
                  items={links.map((link) => link.sequence)}
                  strategy={verticalListSortingStrategy}
                >
                  {links.map((link) => (
                    <LinkCard
                      links={link}
                      key={link.id}
                      updateLink={updateLink}
                      removeLink={removeLink}
                      handleUpDownMove={handleUpDownMove}
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
                      handleUpDownMove={handleUpDownMove}
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
    return prevProps.user.id === nextProps.user.id;
  }
);

// Set display name for debugging
LinksList.displayName = "LinksList";

export default LinksList;
