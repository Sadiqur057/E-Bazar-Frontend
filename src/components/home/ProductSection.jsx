import fruit from "@/assets/images/apple.png";
import egg from "@/assets/images/egg.png";
import honey from "@/assets/images/honey.png";
import avocado from "@/assets/images/avocado.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductCard from "../shared/ProductCard";
import Link from "next/link";

const products = [
  {
    name: "Organic Apples",
    price: 3.99,
    image: fruit,
    description: "Fresh, crisp organic apples from local orchards.",
  },
  {
    name: "Organic Honey",
    price: 7.99,
    image: honey,
    description: "Pure, unprocessed organic honey from local beekeepers.",
  },
  {
    name: "Organic Avocados",
    price: 4.99,
    image: avocado,
    description: "Creamy, ripe organic avocados for your healthy recipes.",
  },
  {
    name: "Free-Range Eggs",
    price: 5.49,
    image: egg,
    description: "Ethically sourced free-range eggs from happy hens.",
  },

  {
    name: "Organic Spinach",
    price: 2.99,
    image: honey,
    description:
      "Nutrient-rich organic spinach, perfect for salads and cooking.",
  },
  {
    name: "Grass-Fed Beef",
    price: 12.99,
    image: fruit,
    description: "Premium grass-fed beef from sustainable farms.",
  },
  {
    name: "Organic Apples",
    price: 3.99,
    image: fruit,
    description: "Fresh, crisp organic apples from local orchards.",
  },
  {
    name: "Organic Honey",
    price: 7.99,
    image: honey,
    description: "Pure, unprocessed organic honey from local beekeepers.",
  },
];
export function ProductSection() {
  return (
    <section className="my-20">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap mb-8">
          <h2 className="text-3xl font-semibold text-start">
            Featured Products
          </h2>
          <Link href="/shop">
            <Button>
              View All Products <ArrowRight />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
