import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const CACHE_KEY = "apiCache";
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hora

// Función para obtener datos del caché
const getCachedData = (key) => {
  const cachedItem = localStorage.getItem(key);
  if (!cachedItem) return null;

  const { data, timestamp } = JSON.parse(cachedItem);
  const now = Date.now();

  if (now - timestamp > CACHE_EXPIRATION_TIME) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
};

// Función para guardar datos en caché
const setCachedData = (key, data) => {
  const cacheEntry = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheEntry));
};

// Función para obtener datos con caché
const fetchDataWithCache = async (url) => {
  const cachedData = getCachedData(CACHE_KEY);
  if (cachedData) {
    console.log("✅ Usando datos desde caché");
    return cachedData;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener datos");

    const data = await response.json();
    setCachedData(CACHE_KEY, data);
    console.log("✅ Datos guardados en caché");

    return data;
  } catch (error) {
    console.error("❌ Error al obtener datos:", error);
    return null;
  }
};

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => getCachedData(CACHE_KEY) || []);

  useEffect(() => {
    const fetchProducts = async () => {
    const endpointDomain = process.env.REACT_APP_ENDPOINT_DOMAIN
      const data = await fetchDataWithCache(`${endpointDomain}/api/product`);
      if (data) setProducts(data);
    };
    
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
