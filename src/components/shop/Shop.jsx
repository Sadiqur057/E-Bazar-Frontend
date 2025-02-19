import ProductCard from "../shared/ProductCard";
import fruit from "@/assets/images/apple.png";
import egg from "@/assets/images/egg.png";
import honey from "@/assets/images/honey.png";
import avocado from "@/assets/images/avocado.png";
import { ShopHeader } from "./ShopHeader";
import { ShopSidebar } from "./ShopSidebar";

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

const Shop = () => {
  return (
    <div className="container pb-8">
      <div className="lg:grid lg:grid-cols-[240px,1fr] gap-10">
        <ShopSidebar className="hidden lg:block" />
        <div>
          <ShopHeader />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shop;
