import { render, screen } from '@testing-library/react';
import App from './App';
import { SidebarContext } from './contexts/SiderbarContext';
import { CartContext } from './contexts/CartContext';
import { useLocation } from 'react-router-dom';
import { ProductContext } from './contexts/ProductContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Mocking react-router-dom inside jest.mock()
jest.mock('react-router-dom', () => {
  const actualRouterDom = jest.requireActual('react-router-dom'); // Get actual react-router-dom
  return {
    ...actualRouterDom,
    useLocation: jest.fn(),
    useParams: jest.fn(),
    useNavigate: jest.fn(),
    BrowserRouter: ({ children }) => <div>{children}</div>,  // Mock BrowserRouter
    Routes: ({ children }) => <div>{children}</div>,  // Mock Routes for testing
    Route: ({ element }) => <div>{element}</div>,
    Link: ({ children }) => <a href={'/'}>{children}</a>,   
  };
});

beforeEach(() => {
  useLocation.mockReturnValue({ location: { pathname: '/about'} }); // Correct the mock setup
  useParams.mockReturnValue({id: "1"})
  useNavigate.mockReturnValue('/')
});


const mockSidebarContext = {
  isOpen: false,
  setIsOpen: jest.fn(),
};

const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();
const mockClearCart = jest.fn();
const mockIncreaseAmount = jest.fn();
const mockDecreaseAmount = jest.fn();
const mockItemAmount = 5;
const mockTotal = 4995;

const mockCart = [
  {
    id: '1',
    colorCode: 'red',
    storageCode: '128GB',
    amount: 1,
  },
];

const mockCartContext = {
  cart: mockCart,
  addToCart: mockAddToCart,
  removeFromCart: mockRemoveFromCart,
  clearCart: mockClearCart,
  increaseAmount: mockIncreaseAmount,
  decreaseAmount: mockDecreaseAmount,
  itemAmount: mockItemAmount,
  total: mockTotal,
}

const mockProduct = {
  id: '1',
  model: 'iPhone 13',
  brand: 'Apple',
  price: '999',
  imgUrl: 'https://example.com/iphone13.jpg',
};

const mockProducts = [mockProduct];


// Mocking the context providers that wrap App in the real implementation
const MockProviders = ({ children }) => (
  <SidebarContext.Provider value={mockSidebarContext}>
    <CartContext.Provider value={mockCartContext}>
      <ProductContext.Provider value={{ products: mockProducts }}>
        {children}
      </ProductContext.Provider>
    </CartContext.Provider>
  </SidebarContext.Provider>
);


test('React Routes with Jest', async () => {
  render(
    <MockProviders>
      <App />
    </MockProviders>
  );

  // Check that the text from ProductList is being rendered.
  const text = await screen.findByText("Los smartphones más vendidos");
  expect(text).toBeInTheDocument();
});
