'use client';

import { useContext, createContext, useState, useEffect } from 'react';
import { SHIPPING, TAX } from '@/constants/constants';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: Product[];
  cartCount: number; 
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
  total: number; 
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ 
  children 
}: { 
  children: React.ReactNode; 
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart'); 
    }

    const calculatedSubtotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    setSubtotal(Number(calculatedSubtotal.toFixed(2)));

    const calculatedTotal = (calculatedSubtotal + SHIPPING + TAX).toFixed(2);
    setTotal(Number(calculatedTotal));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevCart, product];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      if (updatedCart.length === 0) {
        localStorage.removeItem('cart'); 
      }
      return updatedCart;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartCount = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        cartCount, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        subtotal, 
        total,
        isLoading
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
