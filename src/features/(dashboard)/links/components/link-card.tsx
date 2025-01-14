import { useMemo } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDownIcon, ChevronUpIcon, EqualIcon, X } from "lucide-react";

import { Link, PlatformKey } from "@/drizzle/schema";

import LinkInput from "./link-input";
import LinkPlatform from "./link-select-platform";

type LinkCardProp = {
  links: Link;
  // eslint-disable-next-line no-unused-vars
  updateLink: (id: number, updates: Partial<Link>) => void;
  // eslint-disable-next-line no-unused-vars
  removeLink: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  handleUpDownMove: (sequence: number, direction: "up" | "down") => void;
  forceDragging?: boolean;
};

export default function LinkCard({
  links,
  forceDragging = false,
  updateLink,
  removeLink,
  handleUpDownMove,
}: LinkCardProp) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: links.sequence,
  });

  const handlePlatformChange = (newPlatform: PlatformKey) => {
    updateLink(links.id, { platform: newPlatform });
  };

  const handleLinkChange = (newUrl: string) => {
    updateLink(links.id, { url: newUrl });
  };

  const parentStyles = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition: transition || undefined,
      opacity: isDragging ? "0.4" : "1",
    }),
    [transform, transition, isDragging]
  );

  const draggableStyles = useMemo(
    () => ({
      cursor: isDragging || forceDragging ? "grabbing" : "grab",
    }),
    [isDragging, forceDragging]
  );

  console.log("links platform: ", links.platform);
  console.log("links url: ", links.url);

  return (
    <div
      className="space-y-3 rounded-xl bg-background p-[20px]"
      style={parentStyles}
      ref={setNodeRef}
    >
      <div className="-my-[6px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            style={draggableStyles}
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
          >
            <EqualIcon size={20} className="touch-none text-primary" />
          </div>
          <h3 className="text text-card-foreground">Link #{links.sequence}</h3>
        </div>
        <div className="flex gap-4">
          <button
            className="rounded-lg p-2 text-sm text-foreground hover:bg-active-link focus-visible:bg-active-link"
            onClick={() => handleUpDownMove(links.sequence, "up")}
            aria-label="Move Link Card"
          >
            <ChevronUpIcon />
          </button>
          <button
            className="rounded-lg p-2 text-sm text-foreground hover:bg-active-link focus-visible:bg-active-link"
            onClick={() => handleUpDownMove(links.sequence, "down")}
            aria-label="Move Link Card"
          >
            <ChevronDownIcon />
          </button>
        </div>
        <span className="cursor-pointer" onClick={() => removeLink(links.id)}>
          <X size={18} className="text-red-900" />
        </span>
      </div>
      <LinkPlatform
        platform={links.platform}
        onPlatformChange={handlePlatformChange}
      />
      <LinkInput
        id={links.id}
        url={links.url}
        onLinkChange={handleLinkChange}
      />
    </div>
  );
}
