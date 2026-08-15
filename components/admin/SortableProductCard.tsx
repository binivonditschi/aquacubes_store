"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Product } from "@/lib/types";
import { GripVertical, Pencil, Eye, EyeOff, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface SortableProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string, visible: boolean) => void;
}

export default function SortableProductCard({ product, onEdit, onDelete, onToggleVisibility }: SortableProductCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-shadow ${
        isDragging ? "shadow-lg ring-2 ring-teal/20" : "hover:shadow-sm"
      } ${!product.isVisible ? "opacity-60" : ""}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none rounded-md p-1.5 text-gray-300 hover:bg-gray-50 active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image || "/product-standard.jpg"} alt={product.name} className="h-full w-full object-cover" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-body text-sm font-medium text-navy">{product.name}</h3>
          {!product.isVisible && <Badge variant="secondary" className="text-[10px]">Hidden</Badge>}
        </div>
        <p className="text-xs text-gray-300">{product.category}</p>
        <p className="font-mono-label text-sm font-semibold text-navy">{formatPrice(product.price)}</p>
      </div>

      <div className="hidden flex-col items-end gap-1 sm:flex">
        <span className="text-xs text-gray-300">Stock</span>
        <span className={`text-sm font-medium ${product.stock <= 3 ? "text-error" : "text-navy"}`}>{product.stock}</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onToggleVisibility(product.id, !product.isVisible)}
          className="rounded-md p-2 text-gray-300 transition-colors hover:bg-gray-50 hover:text-navy"
          title={product.isVisible ? "Hide product" : "Show product"}
        >
          {product.isVisible ? <Eye className="h-4 w-4" strokeWidth={1.5} /> : <EyeOff className="h-4 w-4" strokeWidth={1.5} />}
        </button>
        <button
          onClick={() => onEdit(product)}
          className="rounded-md p-2 text-gray-300 transition-colors hover:bg-gray-50 hover:text-navy"
          title="Edit product"
        >
          <Pencil className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="rounded-md p-2 text-gray-300 transition-colors hover:bg-error/10 hover:text-error"
          title="Delete product"
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
