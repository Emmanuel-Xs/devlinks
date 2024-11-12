"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import LinkCard from "./link-card";
import LinksPrompt from "./links-prompt";
import { LinkCardProps } from "@/lib/types";
import dynamic from "next/dynamic";
import {
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const DndContextWithNoSSR = dynamic(
  () => import("@dnd-kit/core").then((mod) => mod.DndContext),
  { ssr: false },
);

export default function LinksList() {
  const [linksArray, setLinksArray] = useState<LinkCardProps[]>([]);
  const [activeItem, setActiveItem] = useState<LinkCardProps | undefined>(
    undefined,
  );

  // for input methods detection
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const addNewLink = () => {
    setLinksArray((prev) =>
      [
        {
          id: Date.now(),
          order: prev.length + 1,
          platform: "github",
          link: "",
        },
        ...prev,
      ].sort((a, b) => b.order - a.order),
    );
  };

  const updateLink = (id: number, updates: Partial<LinkCardProps>) => {
    setLinksArray((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, ...updates } : link,
      ),
    );
  };

  const removeLink = (id: number) => {
    const updatedLinksArray = linksArray
      .filter((link) => link.id !== id)
      .map((link, i) => ({ ...link, order: i + 1 }))
      .sort((a, b) => b.order - a.order);

    setLinksArray(updatedLinksArray);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(linksArray?.find((link) => link.order === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeIndex = linksArray.findIndex((ex) => ex.order === active.id);
    const overIndex = linksArray.findIndex((ex) => ex.order === over.id);

    if (activeIndex !== overIndex) {
      setLinksArray((prev) => {
        const movedArray = arrayMove(prev, activeIndex, overIndex);

        const updatedArray = movedArray
          .map((item, index) => ({
            ...item,
            order: movedArray.length - index,
          }))
          .sort((a, b) => b.order - a.order);

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
                items={linksArray.map((link) => link.order)}
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
