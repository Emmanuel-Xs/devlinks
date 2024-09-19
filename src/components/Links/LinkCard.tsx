import { EqualIcon } from "lucide-react";
import LinkPlatform from "./LinkPlatform";
import LinkInput from "./LinkInput";
import { LinkCardProps } from "@/lib/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type LinkCard = {
  links: LinkCardProps;
  removeLink: (id: number) => void;
  forceDragging?: boolean;
};

export default function LinkCard({
  links,
  forceDragging = false,
  removeLink,
}: LinkCard) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: links.order,
  });

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
            <EqualIcon size={20} />
          </div>
          <h3 className="text">Link #{links.order}</h3>
        </div>
        <p className="cursor-pointer" onClick={() => removeLink(links.id)}>
          remove
        </p>
      </div>
      <LinkPlatform platform={links.platform} />
      <LinkInput link={links.link} />
    </div>
  );
}
