import { cn } from "@/lib/utils";

/** Google Material Symbols glyph, as used by the b2b design. */
export default function Icon({
  name,
  size = 24,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("material-symbols-outlined inline-block shrink-0 overflow-hidden", className)}
      style={{ fontSize: size, width: size, height: size }}
    >
      {name}
    </span>
  );
}
