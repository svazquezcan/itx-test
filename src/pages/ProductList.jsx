import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { Hero } from "../components/Hero";
import { Product } from "../components/Product";
import SearchBar from "../components/SearchBar";

export const ProductList = () => {
  const { products } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  const handleSearch = (query) => {

    if (!query.trim()) {
        setFilteredProducts(products); 
        return;
    }

    const lowerCaseQuery = query.toLowerCase();

    const filtered = products.filter(
      (product) =>
        product.brand.toLowerCase().includes(lowerCaseQuery) ||
        product.model.toLowerCase().includes(lowerCaseQuery)
    );

    setFilteredProducts(filtered);
  };

  return (
    <>
     
      <Hero />
      <section className="py-16 w-full">
        <div className="container mx-auto w-full">
          <div className=" justify-between flex items-center w-full">
            <h1 className='uppercase mb-6 font-bold text-2xl text-primary w-full'>
                Los smartphones más vendidos
            </h1>
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};