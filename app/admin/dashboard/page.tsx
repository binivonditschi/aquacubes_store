"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Product } from "@/lib/data";
import SortableProductCard from "@/components/admin/SortableProductCard";
import ProductForm from "@/components/admin/ProductForm";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchProducts = useCallback(async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setProducts((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
    setHasChanges(true);
  };

  const saveOrder = async () => {
    const orderedIds = products.map((p) => p.id);
    await fetch("/api/products/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds }),
    });
    setHasChanges(false);
  };

  const handleSaveProduct = async (formData: Partial<Product>) => {
    if (editingProduct) {
      await fetch(`/api/products/${editingProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    setFormOpen(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleToggleVisibility = async (id: string, visible: boolean) => {
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVisible: visible }),
    });
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <p className="text-base text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-medium text-foreground mb-1">Products</h1>
          <p className="text-sm text-muted-foreground">
            Drag to reorder. Click edit to modify details.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <Button
              onClick={saveOrder}
              variant="outline"
              className="rounded-md gap-2 border-primary text-primary hover:bg-primary/5"
            >
              <Save className="h-4 w-4" />
              Save Order
            </Button>
          )}
          <Button
            onClick={() => {
              setEditingProduct(null);
              setFormOpen(true);
            }}
            className="rounded-md gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={products.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <SortableProductCard
                key={product.id}
                product={product}
                onEdit={(p) => {
                  setEditingProduct(p);
                  setFormOpen(true);
                }}
                onDelete={handleDelete}
                onToggleVisibility={handleToggleVisibility}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {products.length === 0 && (
        <div className="rounded-md border border-dashed border-border p-12 text-center">
          <p className="text-base text-muted-foreground mb-4">No products yet.</p>
          <Button
            onClick={() => {
              setEditingProduct(null);
              setFormOpen(true);
            }}
            variant="outline"
            className="rounded-md"
          >
            Add your first product
          </Button>
        </div>
      )}

      <ProductForm
        product={editingProduct}
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
