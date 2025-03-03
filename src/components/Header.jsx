import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { Navbar } from "./Navbar";
import { BsBag } from "react-icons/bs";
import Logo from "../img/logo.png";
import { SidebarContext } from "../contexts/SiderbarContext";

export const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } top-0 fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex items-center gap-4">
            <img className="w-[40px]" src={Logo} alt="Logo" />
            <h2 className="uppercase text-xl font-bold">IFX Mobile </h2>
          </div>
        </Link>

        {/* Menu */}
        <div className="flex gap-10">
          <div className="absolute right-0 left-0 bg-white border-[20px] w-full h-full -bottom-[70px] flex justify-center sm:bg-none sm:relative sm:right-0 sm:bottom-0">
            <Navbar />
          </div>
          {/* Carrito de compra */}
          <div
            className="cursor-pointer flex relative items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <BsBag className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};