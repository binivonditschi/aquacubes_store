"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProductFormProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
}

export default function ProductForm({ product, open, onClose, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    stock: 0,
    isPreOrder: false,
    deliveryDate: "",
    kautionAmount: 0,
    subscription3YearPrice: undefined,
    subscription5YearPrice: undefined,
    isVisible: true,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        stock: product.stock,
        isPreOrder: product.isPreOrder,
        deliveryDate: product.deliveryDate || "",
        kautionAmount: product.kautionAmount,
        subscription3YearPrice: product.subscription3YearPrice,
        subscription5YearPrice: product.subscription5YearPrice,
        isVisible: product.isVisible,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        stock: 0,
        isPreOrder: false,
        deliveryDate: "",
        kautionAmount: 0,
        subscription3YearPrice: undefined,
        subscription5YearPrice: undefined,
        isVisible: true,
      });
    }
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-heading-3 font-medium text-foreground">
            {product ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-body-sm text-foreground">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-md border-border bg-background"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category" className="text-body-sm text-foreground">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="rounded-md border-border bg-background"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-body-sm text-foreground">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="rounded-md border-border bg-background min-h-[80px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="price" className="text-body-sm text-foreground">Price (€)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="rounded-md border-border bg-background"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="stock" className="text-body-sm text-foreground">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="rounded-md border-border bg-background"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="image" className="text-body-sm text-foreground">Image URL</Label>
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="rounded-md border-border bg-background"
              placeholder="https://..."
              required
            />
          </div>

          <div className="rounded-md border border-border bg-muted p-4 space-y-4">
            <p className="text-sm font-medium text-foreground">Pre-order & Subscription</p>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPreOrder"
                checked={formData.isPreOrder}
                onChange={(e) => setFormData({ ...formData, isPreOrder: e.target.checked })}
                className="rounded border-border"
              />
              <Label htmlFor="isPreOrder" className="text-sm text-foreground cursor-pointer">
                This is a pre-order product
              </Label>
            </div>

            {formData.isPreOrder && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="deliveryDate" className="text-body-sm text-foreground">Estimated Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    className="rounded-md border-border bg-background"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="kautionAmount" className="text-body-sm text-foreground">Kaution Amount (€)</Label>
                  <Input
                    id="kautionAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.kautionAmount}
                    onChange={(e) => setFormData({ ...formData, kautionAmount: parseFloat(e.target.value) })}
                    className="rounded-md border-border bg-background"
                  />
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="sub3yr" className="text-body-sm text-foreground">3-Year Monthly (€)</Label>
                <Input
                  id="sub3yr"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.subscription3YearPrice || ""}
                  onChange={(e) => setFormData({ ...formData, subscription3YearPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                  className="rounded-md border-border bg-background"
                  placeholder="Optional"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="sub5yr" className="text-body-sm text-foreground">5-Year Monthly (€)</Label>
                <Input
                  id="sub5yr"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.subscription5YearPrice || ""}
                  onChange={(e) => setFormData({ ...formData, subscription5YearPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                  className="rounded-md border-border bg-background"
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-2 gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-md">
              Cancel
            </Button>
            <Button type="submit" className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
              {product ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
