"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

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
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, User } from "@/drizzle/schema";

import { Button } from "../../../../components/ui/button";

import LinkCard from "./link-card";
import LinksPrompt from "./links-prompt";

const DndContextWithNoSSR = dynamic(
  () => import("@dnd-kit/core").then((mod) => mod.DndContext),
  { ssr: false }
);

export default function LinksList({ user }: { user: User }) {
  const [linksArray, setLinksArray] = useState<Link[]>([]);
  const [activeItem, setActiveItem] = useState<Link | undefined>(undefined);

  // for input methods detection
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addNewLink = () => {
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
      ].sort((a, b) => b.sequence - a.sequence)
    );
  };

  const updateLink = (id: number, updates: Partial<Link>) => {
    setLinksArray((prevLinks) =>
      prevLinks.map((link) => (link.id === id ? { ...link, ...updates } : link))
    );
  };

  const removeLink = (id: number) => {
    const updatedLinksArray = linksArray
      .filter((link) => link.id !== id)
      .map((link, i) => ({ ...link, sequence: i + 1 }))
      .sort((a, b) => b.sequence - a.sequence);

    setLinksArray(updatedLinksArray);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(linksArray?.find((link) => link.sequence === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeIndex = linksArray.findIndex((ex) => ex.sequence === active.id);
    const overIndex = linksArray.findIndex((ex) => ex.sequence === over.id);

    if (activeIndex !== overIndex) {
      setLinksArray((prev) => {
        const movedArray = arrayMove(prev, activeIndex, overIndex);

        const updatedArray = movedArray
          .map((item, index) => ({
            ...item,
            sequence: movedArray.length - index,
          }))
          .sort((a, b) => b.sequence - a.sequence);

        return updatedArray;
      });
    }

    setActiveItem(undefined);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };

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
                  />
                ))}
              </SortableContext>
              <DragOverlay>
                {activeItem ? (
                  <LinkCard
                    links={activeItem}
                    updateLink={updateLink}
                    removeLink={removeLink}
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
}
