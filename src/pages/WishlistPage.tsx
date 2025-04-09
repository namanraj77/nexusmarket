
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingCart, Trash2, Bell } from "lucide-react";
import { toast } from "sonner";
import { electronicProducts, clothingProducts } from "@/data/mockData";

// Sample wishlist items for demonstration
const initialWishlistItems = [
  {
    ...electronicProducts[0],
    priceAlert: false,
    alertPrice: 0
  },
  {
    ...clothingProducts[1],
    priceAlert: true,
    alertPrice: 110
  }
];

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [alertPrice, setAlertPrice] = useState<Record<string, string>>({});

  const removeItem = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    toast("Item removed from wishlist");
  };

  const addToCart = (id: string) => {
    const item = wishlistItems.find(item => item.id === id);
    if (item) {
      if (item.inStock) {
        toast.success(`${item.name} added to cart`);
      } else {
        toast.error("This item is out of stock");
      }
    }
  };

  const togglePriceAlert = (id: string) => {
    setWishlistItems(
      wishlistItems.map(item => {
        if (item.id === id) {
          if (item.priceAlert) {
            return {
              ...item,
              priceAlert: false,
              alertPrice: 0
            };
          } else {
            const newAlertPrice = parseFloat(alertPrice[id] || "0");
            if (newAlertPrice <= 0 || isNaN(newAlertPrice)) {
              toast.error("Please enter a valid price");
              return item;
            }
            toast.success(`We'll notify you when the price drops below $${newAlertPrice}`);
            return {
              ...item,
              priceAlert: true,
              alertPrice: newAlertPrice
            };
          }
        }
        return item;
      })
    );
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Wishlist</h1>
          <p className="mt-2 text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} in your wishlist
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="rounded-lg border bg-card">
            {wishlistItems.map((item, index) => (
              <div key={item.id}>
                <div className="flex flex-col p-6 sm:flex-row sm:items-center">
                  {/* Product Image */}
                  <Link to={`/product/${item.id}`} className="sm:w-24">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-md object-cover sm:h-24 sm:w-24"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col sm:ml-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-medium">{item.name}</h3>
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.category}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:text-right">
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                        {item.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            ${item.originalPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      {item.priceAlert ? (
                        <div className="flex items-center text-sm">
                          <Bell className="mr-1 h-4 w-4 text-primary" />
                          <span>
                            Price alert set at ${item.alertPrice}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePriceAlert(item.id)}
                            className="ml-2 h-auto p-1"
                          >
                            <span className="text-xs">Remove</span>
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`alert-price-${item.id}`} className="whitespace-nowrap">
                              <Bell className="mr-1 inline-block h-4 w-4" />
                              Notify me when price drops below
                            </Label>
                            <Input
                              id={`alert-price-${item.id}`}
                              type="number"
                              placeholder="Price"
                              className="w-24"
                              value={alertPrice[item.id] || ""}
                              onChange={(e) => setAlertPrice({
                                ...alertPrice,
                                [item.id]: e.target.value
                              })}
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => togglePriceAlert(item.id)}
                          >
                            Set Alert
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => addToCart(item.id)}
                        disabled={!item.inStock}
                      >
                        <ShoppingCart className="mr-1.5 h-4 w-4" />
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="mr-1.5 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                {index < wishlistItems.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border bg-card p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Heart className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-lg font-medium">Your wishlist is empty</h2>
            <p className="mt-2 text-muted-foreground">
              Start adding products you like to your wishlist for easy access later.
            </p>
            <Button className="mt-6" asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
