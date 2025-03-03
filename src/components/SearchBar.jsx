import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="mb-6 w-full flex justify-end">
      <input
        type="text"
        placeholder="Buscar por marca o modelo..."
        value={query}
        onChange={handleChange}
        className="border rounded p-2 w-full max-w-lg"
        />
    </div>
  );
};

export default SearchBar;
