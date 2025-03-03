import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { Hero } from "../components/Hero";
import { Product } from "../components/Product";

export const ProductList = () => {
  const { products } = useContext(ProductContext);

  return (
    <>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <h1 className="uppercase mb-6 font-bold text-2xl text-primary">
            Los smartphones más vendidos
          </h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};