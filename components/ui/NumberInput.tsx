// components/ui/number-input.tsx

import { Minus, Plus } from "lucide-react";
import clsx from "clsx";

interface NumberInputProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  onChange: (value: string) => void;
}

export function NumberInput({
  value,
  placeholder,
  disabled,
  min = 0,
  max,
  step = 1,
  className,
  onChange,
}: NumberInputProps) {
  const update = (delta: number) => {
    const current = Number(value || 0);

    let next = current + delta;

    if (next < min) next = min;
    if (max !== undefined) {
      next = Math.min(next, max);
    }

    onChange(String(next));
  };

  return (
    <div
      className={clsx(
        "flex items-center w-full rounded-md border border-border/30 bg-input",
        className
      )}
    >
      <button
        type="button"
        onClick={() => update(-step)}
        className="px-2 shrink-0 cursor-pointer hover:text-primary transition-all ease-in"
      >
        <Minus size={16} />
      </button>

      <input
        type="number"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          min-w-0
          px-2
          py-3
          text-center
          bg-transparent
          outline-none

          [appearance:textfield]
          [&::-webkit-inner-spin-button]:appearance-none
          [&::-webkit-outer-spin-button]:appearance-none
        "
      />

      <button
        type="button"
        onClick={() => update(step)}
        className="px-2 shrink-0 cursor-pointer hover:text-primary transition-all ease-in"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}