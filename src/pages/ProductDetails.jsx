import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";
import useProductInfo from "../hooks/useProductInfo";
import ProductDescription from "../components/ProductDescription";
import { IoMdArrowBack } from "react-icons/io";

export const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { productDetail, loading, error } = useProductInfo(id)
  const [storageCode, setStorageCode] = useState();
  const [colorCode, setColorCode] = useState();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === id);
  const { model, brand, price, imgUrl } = product;

  if (!product || loading || error) {
    return (
      <section className="h-screen flex justify-center items-center">
        Cargando...
      </section>
    );
  } 

  return (
    <div className='flex gap-4 lg:gap-20 justify-center relative'>
        <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
            <IoMdArrowBack size={50} className='absolute top-[7rem] left-0 cursor-pointer fixed' onClick={() => navigate('/')}/>
            <div className="container mx-auto">
                <div className="flex flex-col items-center">
                    <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                        <img
                            className="max-w-[200px] lg:max-w-sm"
                            src={imgUrl}
                            alt={model}
                        />
                    </div>
                    <div className="flex-1 text-center mt-4">
                        <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                            {`${brand}: ${model}`}
                        </h1>
                        <div className="text-xl text-red-500 font-medium mb-6">
                            {price}€
                        </div>
                        <button
                            onClick={() => addToCart(product, product.id, storageCode, colorCode)}
                            className="bg-primary py-4 px-8 text-white"
                        >
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <ProductDescription productDetail={productDetail} setStorageCode={setStorageCode} setColorCode={setColorCode}/>
       
    </div>
  );
};