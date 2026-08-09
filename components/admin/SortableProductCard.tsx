"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { Product } from "@/lib/data";
import { GripVertical, Pencil, Eye, EyeOff, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface SortableProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string, visible: boolean) => void;
}

export default function SortableProductCard({
  product,
  onEdit,
  onDelete,
  onToggleVisibility,
}: SortableProductCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-center gap-4 rounded-md border border-border bg-card p-4 transition-shadow ${
        isDragging ? "shadow-lg ring-2 ring-primary/20" : "hover:shadow-sm"
      } ${!product.isVisible ? "opacity-60" : ""}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none rounded-md p-1.5 text-muted-foreground hover:bg-muted active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-body-sm font-medium text-foreground truncate">
            {product.name}
          </h3>
          {!product.isVisible && (
            <Badge variant="secondary" className="text-[10px]">Hidden</Badge>
          )}
        </div>
        <p className="text-caption text-muted-foreground">{product.category}</p>
        <p className="text-body-sm font-semibold text-foreground">
          {formatPrice(product.price)}
        </p>
      </div>

      <div className="hidden sm:flex flex-col items-end gap-1">
        <span className="text-caption text-muted-foreground">Stock</span>
        <span className={`text-body-sm font-medium ${product.stock <= 3 ? "text-destructive" : "text-foreground"}`}>
          {product.stock}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onToggleVisibility(product.id, !product.isVisible)}
          className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title={product.isVisible ? "Hide product" : "Show product"}
        >
          {product.isVisible ? (
            <Eye className="h-4 w-4" strokeWidth={1.5} />
          ) : (
            <EyeOff className="h-4 w-4" strokeWidth={1.5} />
          )}
        </button>
        <button
          onClick={() => onEdit(product)}
          className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title="Edit product"
        >
          <Pencil className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          title="Delete product"
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
