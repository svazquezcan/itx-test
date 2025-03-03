import React, { useState, useEffect } from "react";

const ProductDescription = ({ productDetail, setStorageCode, setColorCode }) => {
  const [openSections, setOpenSections] = useState({
    technicalData: true,
    options: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const allowedKeys = [
    "brand",
    "model",
    "price",
    "cpu",
    "ram",
    "os",
    "screen resolution",
    "battery",
    "camera",
    "dimensions",
    "weight",
  ];

 
  const detailEntries = Object.entries(productDetail).filter(([key]) =>
    allowedKeys.includes(key)
  );

  const colors = productDetail?.options?.colors || [];
  const storages = productDetail?.options?.storages || [];

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("")

  useEffect(() => {
    if (colors.length) {
      setSelectedColor(colors[0].code);
      setColorCode(colors[0].code);
    }
    if (storages.length) {
      setSelectedStorage(storages[0].code);
      setStorageCode(storages[0].code);
    }
  }, [productDetail, colors, storages, setColorCode, setStorageCode]);


  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center flex flex-col">
        <button
            onClick={() => toggleSection("technicalData")}
            className="flex items-center w-full text-left"
        >
            <span className="font-bold">Ficha técnica</span>
            <span className="text-xl transform transition-transform duration-200">
            {openSections.technicalData ? "▲" : "▼"}
            </span>
        </button>

        {openSections.technicalData && (
            <div className="mt-4 grid grid-cols-2 gap-4 max-w-[50vw]">
            {detailEntries.map(([key, value], idx) => (
                <div key={idx} className="flex flex-col gap-0">
                    <span className="text-sm font-semibold capitalize">
                        {key.replaceAll("_", " ")}:
                    </span>
                    <span className="text-sm">{value}</span>
                </div>
            ))}
            </div>
        )}

        <button
            onClick={() => toggleSection("options")}
            className="flex items-center w-full text-left mt-12"
        >
            <span className="font-bold">Opciones</span>
            <span className="text-xl transform transition-transform duration-200">
            {openSections.options ? "▲" : "▼"}
            </span>
        </button>
        {openSections.options && (
        <div className="mt-4 max-w-[50vw] flex flex-col gap-4 w-full items-start">

          <div>
            <label className="block font-semibold">Color:</label>
            <select
              value={selectedColor}
              onChange={(e) => setColorCode(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="">Selecciona un color</option>
              {colors.map((color) => (
                <option key={color.code} value={color.code}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold">Almacenamiento:</label>
            <select
              value={selectedStorage}
              onChange={(e) => setStorageCode(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="">Selecciona Almacenamiento</option>
              {storages.map((storage) => (
                <option key={storage.code} value={storage.code}>
                  {storage.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDescription;