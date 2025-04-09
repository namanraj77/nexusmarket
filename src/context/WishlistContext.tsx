
import React, { createContext, useState, useContext, useEffect } from "react";
import { ProductProps } from "@/components/ProductCard";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

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
  const { user } = useAuth();
  
  // Load wishlist from Supabase on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      // Load from localStorage for anonymous users
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist));
        } catch (error) {
          console.error("Failed to parse wishlist from localStorage:", error);
        }
      }
    }
  }, [user]);
  
  // Fetch wishlist from Supabase
  const fetchWishlist = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("wishlists")
        .select("product_id")
        .eq("user_id", user.id);
        
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        // Convert product_ids to actual products
        // In a real app, you would fetch these from your products table
        // For now, we'll use localStorage as a product cache
        const savedProducts = localStorage.getItem("wishlistProducts");
        if (savedProducts) {
          const parsedProducts = JSON.parse(savedProducts);
          const filteredProducts = parsedProducts.filter((product: ProductProps) => 
            data.some(item => item.product_id === product.id)
          );
          setWishlistItems(filteredProducts);
        }
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  // Save products to localStorage as a cache
  useEffect(() => {
    localStorage.setItem("wishlistProducts", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = async (product: ProductProps) => {
    if (user) {
      try {
        const { error } = await supabase
          .from("wishlists")
          .insert({ user_id: user.id, product_id: product.id });
          
        if (error) {
          if (error.code === '23505') { // Unique constraint violation
            toast("Item already in your wishlist");
            return;
          }
          throw error;
        }
        
        toast.success(`Added ${product.name} to wishlist`);
        
        // Update local state
        setWishlistItems(prevItems => {
          if (prevItems.some(item => item.id === product.id)) {
            return prevItems;
          }
          return [...prevItems, product];
        });
      } catch (error) {
        console.error("Error adding to wishlist:", error);
        toast.error("Failed to add item to wishlist");
      }
    } else {
      // Handle non-authenticated users with localStorage
      setWishlistItems(prevItems => {
        if (prevItems.some(item => item.id === product.id)) {
          return prevItems;
        }
        
        toast.success(`Added ${product.name} to wishlist`);
        return [...prevItems, product];
      });
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (user) {
      try {
        const { error } = await supabase
          .from("wishlists")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);
          
        if (error) {
          throw error;
        }
        
        const item = wishlistItems.find(item => item.id === productId);
        if (item) {
          toast(`Removed ${item.name} from wishlist`);
        }
        
        // Update local state
        setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
      } catch (error) {
        console.error("Error removing from wishlist:", error);
        toast.error("Failed to remove item from wishlist");
      }
    } else {
      // Handle non-authenticated users with localStorage
      setWishlistItems(prevItems => {
        const item = prevItems.find(item => item.id === productId);
        if (item) {
          toast(`Removed ${item.name} from wishlist`);
        }
        return prevItems.filter(item => item.id !== productId);
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from("wishlists")
          .delete()
          .eq("user_id", user.id);
          
        if (error) {
          throw error;
        }
        
        toast("Wishlist has been cleared");
        setWishlistItems([]);
      } catch (error) {
        console.error("Error clearing wishlist:", error);
        toast.error("Failed to clear wishlist");
      }
    } else {
      // Handle non-authenticated users with localStorage
      setWishlistItems([]);
      toast("Wishlist has been cleared");
    }
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
