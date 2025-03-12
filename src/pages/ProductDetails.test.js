
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductDetails } from './ProductDetails';
import { ProductContext } from '../contexts/ProductContext';
import { CartContext } from '../contexts/CartContext';
import useProductInfo from '../hooks/useProductInfo';
import { useParams, useNavigate } from 'react-router-dom'; 

// Mock data for products and cart context
const mockProduct = {
  id: '1',
  model: 'iPhone 13',
  brand: 'Apple',
  price: '999',
  imgUrl: 'https://example.com/iphone13.jpg',
};

const mockAddToCart = jest.fn();

const mockProducts = [mockProduct];

const mockProductDetail = {
  description: 'This is an awesome iPhone 13',
};

// Mocking `useProductInfo` before tests
jest.mock('../hooks/useProductInfo', () => ({
    __esModule: true, // Make sure to mock as an ES module
    default: jest.fn(), // Mock default export
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Keep actual imports except for useParams
    useParams: jest.fn(), // Mock `useParams`
    useNavigate: jest.fn()
}));

beforeEach(() => {
  // Clear any previous mocks
  jest.clearAllMocks();

  useParams.mockReturnValue({ id: '1' });

  // Mocking the custom hook useProductInfo
  useProductInfo.mockReturnValue({
    productDetail: mockProductDetail,
    loading: false,
    error: null,
  });

  useNavigate.mockReturnValue('/')

});

test('renders product details and interacts with add to cart button', async () => {
  render(
    <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <ProductContext.Provider value={{ products: mockProducts }}>
            <ProductDetails />
        </ProductContext.Provider>
    </CartContext.Provider>
  );

  // Wait for the product details to be rendered
  await screen.findByText(/iPhone 13/i);

  // Check if product details are displayed correctly
  expect(screen.getByText(/Apple: iPhone 13/i)).toBeInTheDocument();
  expect(screen.getByText(/999€/i)).toBeInTheDocument();
  expect(screen.getByAltText('iPhone 13')).toHaveAttribute('src', 'https://example.com/iphone13.jpg');
  
  // Simulate clicking the "Add to Cart" button
  const addButton = screen.getByText(/Agregar al carrito/i);
  fireEvent.click(addButton);

  // Verify if addToCart was called
  expect(mockAddToCart).toHaveBeenCalledTimes(1);
  expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, mockProduct.id, undefined, undefined); // Add mock values for storageCode and colorCode if necessary
});
