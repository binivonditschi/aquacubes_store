"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowDownAZ, ArrowUpAZ, ArrowUpNarrowWide, ArrowDownWideNarrow, X } from "lucide-react";
import { useCart } from "@/store/useCart";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";
import Newsletter from "@/components/sections/Newsletter";

const categories = ["All", "System", "Add-on"] as const;
type Category = (typeof categories)[number];

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const sortOptions: { value: SortOption; label: string; icon: typeof SlidersHorizontal }[] = [
  { value: "featured", label: "Featured", icon: SlidersHorizontal },
  { value: "price-asc", label: "Price: Low to High", icon: ArrowUpNarrowWide },
  { value: "price-desc", label: "Price: High to Low", icon: ArrowDownWideNarrow },
  { value: "name-asc", label: "Name: A-Z", icon: ArrowDownAZ },
  { value: "name-desc", label: "Name: Z-A", icon: ArrowUpAZ },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Shop() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [sort, setSort] = useState<SortOption>("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const addItem = useCart((s) => s.addItem);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setAllProducts(data.filter((p) => p.isVisible));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const products = useMemo(() => {
    let list = allProducts;
    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sorted.sort((a, b) => a.position - b.position);
    }
    return sorted;
  }, [allProducts, category, search, sort]);

  const handleAddToCart = useCallback(
    (product: Product) => {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image ?? undefined });
    },
    [addItem]
  );

  const currentSortLabel = sortOptions.find((s) => s.value === sort)?.label || "Featured";

  return (
    <div>
      <section className="bg-off-white pb-10 pt-[120px]">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <nav aria-label="Breadcrumb">
            <ol className="mb-4 flex items-center gap-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="text-teal transition-colors hover:text-teal-dark">Home</Link>
              </li>
              <li>/</li>
              <li className="text-gray-300">Shop</li>
            </ol>
          </nav>

          <h1 className="text-h1 font-heading text-navy">Shop Aquacubes</h1>
          <p className="mt-3 max-w-xl font-body text-base text-gray-500">
            Smart aquaculture systems and accessories for every space and budget.
          </p>
        </div>
      </section>

      <section className="bg-off-white pb-20">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <div className="sticky top-[72px] z-40 mb-8 -mx-6 -mt-px border-b border-gray-100 bg-white px-6 py-4 lg:-mx-10 lg:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="h-10 w-full rounded-lg border border-gray-100 bg-gray-50 pl-10 pr-16 font-body text-sm text-navy placeholder-gray-300 outline-none transition-all focus:border-teal focus:ring-[3px] focus:ring-teal-glow sm:w-[280px]"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-300 hover:text-navy"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`whitespace-nowrap rounded-full px-4 py-2 font-body text-sm font-medium transition-all ${
                        category === cat ? "bg-teal text-navy" : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-navy"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 md:justify-end">
                <div className="relative">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-4 py-2 font-body text-sm text-navy transition-colors hover:bg-gray-100"
                  >
                    <SlidersHorizontal className="h-4 w-4 text-gray-300" />
                    <span className="hidden sm:inline">Sort by:</span>
                    <span className="text-gray-500">{currentSortLabel}</span>
                  </button>
                  <AnimatePresence>
                    {isSortOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-1.5 shadow-modal"
                        >
                          {sortOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setSort(option.value);
                                  setIsSortOpen(false);
                                }}
                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm transition-colors ${
                                  sort === option.value ? "bg-teal-glow text-navy font-medium" : "text-gray-500 hover:bg-gray-50 hover:text-navy"
                                }`}
                              >
                                <Icon className="h-4 w-4 text-gray-300" />
                                {option.label}
                              </button>
                            );
                          })}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                <span className="font-body text-sm text-gray-300">
                  Showing {products.length} product{products.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] rounded-t-xl bg-gray-100" />
                  <div className="rounded-b-xl bg-white p-5">
                    <div className="mb-2 h-4 w-3/4 rounded bg-gray-100" />
                    <div className="mb-4 h-3 w-1/2 rounded bg-gray-100" />
                    <div className="h-4 w-1/3 rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="mb-4 h-16 w-16 text-gray-100" />
              <h3 className="text-h3 font-heading text-gray-500">No products found</h3>
              <p className="mt-2 font-body text-base text-gray-300">Try adjusting your search or filters.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-6 rounded-lg px-6 py-3 font-body text-sm font-medium text-navy transition-colors hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    layout
                    className="group cursor-pointer"
                  >
                    <Link href={`/shop/${product.id}`} className="block">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-t-xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image || "/product-standard.jpg"}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105"
                        />
                      </div>
                    </Link>

                    <div className="rounded-b-xl bg-white p-5 transition-shadow duration-300 group-hover:shadow-card-hover">
                      <Link href={`/shop/${product.id}`} className="block">
                        <h3 className="font-body text-base font-semibold text-navy">{product.name}</h3>
                        <p className="mt-1 font-body text-xs uppercase tracking-[0.05em] text-gray-300">{product.category}</p>
                        <p className="mt-2 font-mono-label text-xl font-bold text-navy">{formatPrice(product.price)}</p>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        disabled={product.stock <= 0}
                        className="mt-3 flex w-full items-center justify-center rounded-lg bg-teal py-2.5 font-body text-sm font-medium text-navy transition-all hover:bg-teal-dark active:scale-[0.98] disabled:opacity-50"
                      >
                        {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
