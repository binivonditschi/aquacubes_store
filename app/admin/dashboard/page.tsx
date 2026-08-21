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
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Product } from "@/lib/types";
import SortableProductCard from "@/components/admin/SortableProductCard";
import ProductForm from "@/components/admin/ProductForm";
import OrdersTable from "@/components/admin/OrdersTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Save } from "lucide-react";
import { toast } from "sonner";

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
    toast.success("Order saved");
  };

  const handleSaveProduct = async (formData: Partial<Product>) => {
    if (editingProduct) {
      await fetch(`/api/products/${editingProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      toast.success("Product updated");
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      toast.success("Product added");
    }
    setFormOpen(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    toast.success("Product deleted");
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

  return (
    <div className="mx-auto max-w-4xl p-6 md:p-10">
      <div className="mb-8">
        <h1 className="mb-1 font-heading text-3xl font-semibold text-navy">Admin</h1>
        <p className="text-sm text-gray-500">Manage products and view orders.</p>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">Drag to reorder. Click edit to modify details.</p>
            <div className="flex items-center gap-3">
              {hasChanges && (
                <Button onClick={saveOrder} variant="outline" className="gap-2 border-teal text-teal hover:bg-teal/5">
                  <Save className="h-4 w-4" />
                  Save Order
                </Button>
              )}
              <Button
                onClick={() => {
                  setEditingProduct(null);
                  setFormOpen(true);
                }}
                className="gap-2 bg-teal text-white hover:bg-teal-dark"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-gray-500">Loading products...</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={products.map((p) => p.id)} strategy={verticalListSortingStrategy}>
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
          )}

          {!loading && products.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-100 p-12 text-center">
              <p className="mb-4 text-gray-500">No products yet.</p>
              <Button
                onClick={() => {
                  setEditingProduct(null);
                  setFormOpen(true);
                }}
                variant="outline"
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
        </TabsContent>

        <TabsContent value="orders">
          <OrdersTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
