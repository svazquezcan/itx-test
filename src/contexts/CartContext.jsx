import { createContext, useState, useEffect } from "react";

// crear el context
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  const updateCartOnServer = async (updatedCart) => {
    const endpointDomain = process.env.REACT_APP_ENDPOINT_DOMAIN
  
    try {
      await fetch(`${endpointDomain}/api/cart}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCart),
      });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
    const saveCartBeforeUnload = () => {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    };

    window.addEventListener("beforeunload", saveCartBeforeUnload);
    return () => {
        window.removeEventListener("beforeunload", saveCartBeforeUnload);
    };
  }, [cart]);

  // actualizar cantidad del item
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  // agregar al carrito
  const addToCart = (product, id, storageCode, colorCode) => {
    const newItem = { ...product, colorCode, storageCode, amount: 1 };
    // comprobar si el artículo ya está en el carrito
    const cartItem = cart.find((item) => item.id === id && item.storageCode === storageCode && item.colorCode === colorCode);
    // si el artículo del carrito ya está en el carrito
    let newCart;
    if (cartItem) {
      newCart = [...cart].map((item) => {
        if (item.id === id && item.storageCode === storageCode && item.colorCode === colorCode) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });;
    } else {
      newCart = ([...cart, newItem]);
    }
    setCart(newCart)
    updateCartOnServer(newCart)
  };

  // quitar del carrito
  const removeFromCart = (id, storageCode, colorCode) => {
    const newCart = cart.filter((item) => item.id !== id && item.storageCode !== storageCode && item.colorCode !== colorCode);
    setCart(newCart);
    updateCartOnServer(newCart)
  };

  // limpiar carrito
  const clearCart = () => {
    setCart([]);
    updateCartOnServer([])
  };

  // incrementar la cantidad de producto
  const increaseAmount = (id, colorCode, storageCode) => {
    const cartItem = cart.find((item) => item.id === id && item.storageCode === storageCode && item.colorCode === colorCode);
    addToCart(cartItem, id, storageCode, colorCode);
  };

  // decrementar cantidad de producto
  const decreaseAmount = (id, colorCode, storageCode) => {
    const cartItem = cart.find((item) => item.id === id && item.storageCode === storageCode && item.colorCode === colorCode);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem?.amount < 2) {
      removeFromCart(id, storageCode, colorCode);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;