"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  paid: "default",
  pending: "secondary",
  canceled: "outline",
  failed: "destructive",
  expired: "outline",
};

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6 text-sm text-gray-500">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-100 p-12 text-center">
        <p className="text-gray-500">No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono-label text-xs">{order.id}</TableCell>
              <TableCell>{order.customerEmail}</TableCell>
              <TableCell className="font-mono-label">{formatPrice(order.total)}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[order.status] ?? "outline"} className="capitalize">
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
