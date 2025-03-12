import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

test("Filtra los productos según la entrada del usuario", () => {
  const onSearchMock = jest.fn(); // Simulamos la función de búsqueda
  render(<SearchBar onSearch={onSearchMock} />);

  const input = screen.getByPlaceholderText(/Buscar por marca o modelo.../i);
  fireEvent.change(input, { target: { value: "acer" } });

  expect(onSearchMock).toHaveBeenCalledWith("acer");
});
