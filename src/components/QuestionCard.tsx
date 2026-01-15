import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuestionCardProps<T extends string> {
  value: T;
  label: string;
  description: string;
  icon?: React.ReactNode;
  selected: boolean;
  onSelect: (value: T) => void;
}

export function QuestionCard<T extends string>({
  value,
  label,
  description,
  icon,
  selected,
  onSelect,
}: QuestionCardProps<T>) {
  return (
    <motion.button
      onClick={() => onSelect(value)}
      className={cn(
        "group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300",
        "min-h-[140px] text-center cursor-pointer",
        selected
          ? "border-primary bg-primary/5 shadow-glow"
          : "border-border bg-card hover:border-sage-light hover:shadow-soft"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {icon && (
        <div
          className={cn(
            "mb-3 transition-colors duration-300",
            selected ? "text-primary" : "text-muted-foreground group-hover:text-sage-light"
          )}
        >
          {icon}
        </div>
      )}
      <h3
        className={cn(
          "font-serif text-lg font-semibold transition-colors duration-300",
          selected ? "text-primary" : "text-foreground"
        )}
      >
        {label}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      
      {/* Selection indicator */}
      <motion.div
        className={cn(
          "absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all duration-300",
          selected
            ? "border-primary bg-primary"
            : "border-muted-foreground/30"
        )}
        initial={false}
        animate={selected ? { scale: 1 } : { scale: 0.8 }}
      >
        {selected && (
          <motion.svg
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full text-primary-foreground p-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
      </motion.div>
    </motion.button>
  );
}
