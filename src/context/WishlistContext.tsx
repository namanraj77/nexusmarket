
import React, { createContext, useState, useContext, useEffect } from "react";
import { ProductProps } from "@/components/ProductCard";
import { toast } from "sonner";

interface WishlistContextProps {
  wishlistItems: ProductProps[];
  addToWishlist: (product: ProductProps) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<ProductProps[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: ProductProps) => {
    setWishlistItems(prevItems => {
      // Check if item is already in wishlist
      if (prevItems.some(item => item.id === product.id)) {
        return prevItems;
      }
      
      toast.success(`Added ${product.name} to wishlist`);
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prevItems => {
      const item = prevItems.find(item => item.id === productId);
      if (item) {
        toast(`Removed ${item.name} from wishlist`);
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast("Wishlist has been cleared");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
