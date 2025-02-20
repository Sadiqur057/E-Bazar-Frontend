import ProductCard from "../shared/ProductCard";
import { ShopHeader } from "./ShopHeader";
import { ShopSidebar } from "./ShopSidebar";

const Shop = ({ products }) => {
  return (
    <div className="container pb-8">
      <div className="lg:grid lg:grid-cols-[240px,1fr] gap-10">
        <ShopSidebar className="hidden lg:block" />
        <div>
          <ShopHeader />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shop;
