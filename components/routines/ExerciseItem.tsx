import { Exercise } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Ellipsis, EllipsisVertical, GripVertical } from "lucide-react";

const ExerciseItem = (exercise: Exercise) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exercise.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center"
    >
      {/* Handle de arrastre */}
      <button
        {...attributes}
        {...listeners}
        className="text-muted-foreground/40 hover:text-muted-foreground
                   cursor-grab active:cursor-grabbing mr-2 touch-none bg-card py-10 px-4 rounded-md"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      <div className="flex items-center justify-between flex-1 bg-card py-6.5 px-4 rounded-md">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium">{exercise.name}</h1>
          <p className="text-muted-foreground text-sm">{exercise.weight} kg</p>
        </div>

        <div className="flex items-center text-muted-foreground gap-20">
          <div className="flex flex-col text-sm">
            <span>{exercise.sets} series</span>
            <span>{exercise.reps} reps</span>
          </div>
          <EllipsisVertical className="cursor-pointer hover:text-foreground transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default ExerciseItem;
