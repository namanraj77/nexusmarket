
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: string;
  rating: number;
  inStock: boolean;
}

export function ProductCard({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  category, 
  badge, 
  rating, 
  inStock 
}: ProductProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const isWishlisted = isInWishlist(id);
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, originalPrice, image, category, badge, rating, inStock });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inStock) {
      addToCart({ id, name, price, originalPrice, image, category, badge, rating, inStock });
    }
  };

  // Calculate the discount percentage if there's an original price
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  return (
    <Card className="product-card h-full overflow-hidden">
      <Link to={`/product/${id}`} className="block h-full">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
            onClick={toggleWishlist}
          >
            <Heart 
              className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} 
            />
          </Button>
          {badge && (
            <Badge className="absolute left-2 top-2">
              {badge}
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="absolute left-2 bottom-2">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <p className="text-xs uppercase text-muted-foreground">
            {category}
          </p>
          <h3 className="mt-1 truncate font-medium">{name}</h3>
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(rating) ? "text-yellow-400" : "text-muted"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-muted-foreground">
              ({rating})
            </span>
          </div>
          <div className="mt-2 flex items-center">
            <p className="font-medium">
              ${price.toFixed(2)}
            </p>
            {originalPrice && (
              <p className="ml-2 text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full" 
            onClick={handleAddToCart}
            variant={inStock ? "default" : "outline"}
            disabled={!inStock}
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
