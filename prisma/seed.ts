import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const products = [
  {
    id: "standard",
    name: "Aquacubes Standard",
    description: "Perfect for beginners. Compact, efficient, and easy to set up.",
    price: 2499,
    image: "/product-standard.jpg",
    category: "System",
    position: 0,
    stock: 25,
  },
  {
    id: "pro",
    name: "Aquacubes Pro",
    description: "For serious growers. Double capacity, premium materials, app control.",
    price: 4999,
    image: "/product-pro.jpg",
    category: "System",
    position: 1,
    stock: 15,
  },
  {
    id: "enterprise",
    name: "Aquacubes Enterprise",
    description: "Commercial-grade systems for restaurants, schools, and farms.",
    price: 9999,
    image: "/product-enterprise.jpg",
    category: "System",
    position: 2,
    stock: 5,
  },
  {
    id: "seedlings",
    name: "Seedling Starter Pack",
    description: "A curated set of fast-germinating seedlings ready to transplant into your Aquacubes system.",
    price: 29,
    image: "/addon-seedlings.jpg",
    category: "Add-on",
    position: 3,
    stock: 100,
  },
  {
    id: "nutrients",
    name: "Premium Nutrients",
    description: "Concentrated aquaponic nutrient blend that keeps your fish and plants thriving.",
    price: 49,
    image: "/addon-nutrients.jpg",
    category: "Add-on",
    position: 4,
    stock: 80,
  },
  {
    id: "filter",
    name: "Advanced Filter Kit",
    description: "Upgraded bio-filtration kit for clearer water and healthier fish.",
    price: 89,
    image: "/addon-filter.jpg",
    category: "Add-on",
    position: 5,
    stock: 40,
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
