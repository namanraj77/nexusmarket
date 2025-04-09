
import React, { createContext, useState, useContext, useEffect } from "react";
import { ProductProps } from "@/components/ProductCard";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

type CartItem = {
  product: ProductProps;
  quantity: number;
};

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: ProductProps, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();
  
  // Load cart from Supabase on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      // Load from localStorage for anonymous users
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error);
        }
      }
    }
  }, [user]);
  
  // Fetch cart from Supabase
  const fetchCart = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("carts")
        .select("product_id, quantity")
        .eq("user_id", user.id);
        
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        // Convert product_ids to actual products
        // In a real app, you would fetch these from your products table
        // For now, we'll use localStorage as a product cache
        const savedProducts = localStorage.getItem("cartProducts");
        if (savedProducts) {
          const parsedProducts = JSON.parse(savedProducts);
          const cartItemsFromDb = data.map((item) => {
            const product = parsedProducts.find((p: ProductProps) => p.id === item.product_id);
            return {
              product,
              quantity: item.quantity
            };
          }).filter((item: CartItem) => item.product); // Remove any items where product isn't found
          
          setCartItems(cartItemsFromDb);
        }
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Save products to localStorage as a cache
  useEffect(() => {
    if (cartItems.length > 0) {
      const products = cartItems.map(item => item.product);
      localStorage.setItem("cartProducts", JSON.stringify(products));
    }
    
    // If not logged in, save cart to localStorage
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product: ProductProps, quantity: number = 1) => {
    if (!product.inStock) {
      toast.error("This product is out of stock");
      return;
    }

    if (user) {
      try {
        const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);
        
        if (existingItemIndex !== -1) {
          // Update quantity if item already exists
          const newQuantity = cartItems[existingItemIndex].quantity + quantity;
          
          const { error } = await supabase
            .from("carts")
            .update({ quantity: newQuantity })
            .eq("user_id", user.id)
            .eq("product_id", product.id);
            
          if (error) throw error;
          
          // Update local state
          const updatedItems = [...cartItems];
          updatedItems[existingItemIndex].quantity = newQuantity;
          setCartItems(updatedItems);
          
          toast.success(`Updated ${product.name} quantity in cart`);
        } else {
          // Add new item
          const { error } = await supabase
            .from("carts")
            .insert({ 
              user_id: user.id, 
              product_id: product.id,
              quantity
            });
            
          if (error) throw error;
          
          // Update local state
          setCartItems([...cartItems, { product, quantity }]);
          
          toast.success(`Added ${product.name} to cart`);
        }
      } catch (error) {
        console.error("Error updating cart:", error);
        toast.error("Failed to update cart");
      }
    } else {
      // Handle non-authenticated users with localStorage
      setCartItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);

        if (existingItemIndex !== -1) {
          // Update quantity if item already exists
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += quantity;
          toast.success(`Updated ${product.name} quantity in cart`);
          return updatedItems;
        } else {
          // Add new item
          toast.success(`Added ${product.name} to cart`);
          return [...prevItems, { product, quantity }];
        }
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    if (user) {
      try {
        const { error } = await supabase
          .from("carts")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);
          
        if (error) throw error;
        
        // Update local state
        const item = cartItems.find(item => item.product.id === productId);
        if (item) {
          toast(`Removed ${item.product.name} from cart`);
        }
        
        setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast.error("Failed to remove item from cart");
      }
    } else {
      // Handle non-authenticated users with localStorage
      setCartItems(prevItems => {
        const item = prevItems.find(item => item.product.id === productId);
        if (item) {
          toast(`Removed ${item.product.name} from cart`);
        }
        return prevItems.filter(item => item.product.id !== productId);
      });
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (user) {
      try {
        const { error } = await supabase
          .from("carts")
          .update({ quantity })
          .eq("user_id", user.id)
          .eq("product_id", productId);
          
        if (error) throw error;
        
        // Update local state
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        );
      } catch (error) {
        console.error("Error updating cart quantity:", error);
        toast.error("Failed to update cart quantity");
      }
    } else {
      // Handle non-authenticated users with localStorage
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from("carts")
          .delete()
          .eq("user_id", user.id);
          
        if (error) throw error;
        
        setCartItems([]);
        toast("Cart has been cleared");
      } catch (error) {
        console.error("Error clearing cart:", error);
        toast.error("Failed to clear cart");
      }
    } else {
      // Handle non-authenticated users with localStorage
      setCartItems([]);
      toast("Cart has been cleared");
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
