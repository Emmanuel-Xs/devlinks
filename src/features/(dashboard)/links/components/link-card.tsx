import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EqualIcon, X } from "lucide-react";

import { Link, PlatformKey } from "@/drizzle/schema";

import LinkInput from "./link-input";
import LinkPlatform from "./link-select-platform";

type LinkCardProp = {
  links: Link;
  // eslint-disable-next-line no-unused-vars
  removeLink: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  updateLink: (id: number, updates: Partial<Link>) => void;
  forceDragging?: boolean;
};

export default function LinkCard({
  links,
  forceDragging = false,
  updateLink,
  removeLink,
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

  const parentStyles = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? "0.4" : "1",
  };

  const draggableStyles = {
    cursor: isDragging || forceDragging ? "grabbing" : "grab",
  };

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
            <EqualIcon size={20} className="touch-none" />
          </div>
          <h3 className="text">Link #{links.sequence}</h3>
        </div>
        <span className="cursor-pointer" onClick={() => removeLink(links.id)}>
          <X size={18} className="text-red-900" />
        </span>
      </div>
      <LinkPlatform
        platform={links.platform}
        onPlatformChange={handlePlatformChange}
      />
      <LinkInput url={links.url} onLinkChange={handleLinkChange} />
    </div>
  );
}
