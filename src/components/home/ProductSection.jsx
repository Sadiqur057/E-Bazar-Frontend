import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductCard from "../shared/ProductCard";
import Link from "next/link";

export function ProductSection({ products }) {
  return (
    <section className="my-20">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-start">
            Featured Products
          </h2>
          <Link href="/shop">
            <Button>
              View All <ArrowRight />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.slice(0, 6)?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
