import { render, screen } from "@testing-library/react";
import { ProductList } from "./ProductList";
import { ProductContext } from "../contexts/ProductContext";

const mockProduct = {
  id: '1',
  model: 'iPhone 13',
  brand: 'Apple',
  price: '999',
  imgUrl: 'https://example.com/iphone13.jpg',
};

const mockProducts = [mockProduct];

jest.mock('react-router-dom', () => {
  const actualRouterDom = jest.requireActual('react-router-dom'); // Get actual react-router-dom
  return {
    ...actualRouterDom,
    Link: ({ children, to }) => <a href={to}>{children}</a>,   
  };
});

test("renders product list correctly", () => {
  render(
      <ProductContext.Provider value={{ products: mockProducts }}>
        <ProductList />
      </ProductContext.Provider>
  );

  expect(screen.getByText(/iPhone 13/i)).toBeInTheDocument();
});
