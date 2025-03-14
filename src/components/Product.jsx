import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Product = ({ product }) => {
  const { id, imgUrl, brand, model, price } = product;

  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={imgUrl}
              alt={model}
            />
          </div>
          <div className="absolute top-6 -right-10 group-hover:right-1 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link
              to={`/product/${id}`}
              className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
            >
              <BsEyeFill />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">{brand}</div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold mb-1">{model}</h2>
        </Link>
        <div className="font-semibold">{price}€</div>
      </div>
    </div>
  );
};