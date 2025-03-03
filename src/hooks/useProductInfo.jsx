import { useState, useEffect } from "react";

const useProductInfo = (id) => {
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; 

    const fetchProductInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpointDomain = process.env.REACT_APP_ENDPOINT_DOMAIN
        const endpoint = `${endpointDomain}/api/product/${id}`;
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Error al obtener datos");
        const data = await response.json();
        setProductDetail(data);
      } catch (error) { 
        console.error("❌ Error al obtener datos:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductInfo();
  }, [id]);

  return { productDetail, loading, error };
};

export default useProductInfo;
