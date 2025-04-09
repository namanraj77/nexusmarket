
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, AlertCircle, TruckIcon, RotateCcw, Shield } from "lucide-react";
import { toast } from "sonner";
import { electronicProducts, clothingProducts, groceryProducts } from "@/data/mockData";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Find the product with the matching ID from all product categories
  const allProducts = [...electronicProducts, ...clothingProducts, ...groceryProducts];
  const product = allProducts.find((p) => p.id === id);

  // Get similar products from the same category
  const similarProducts = allProducts
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  if (!product) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold">Product Not Found</h1>
          <p className="mt-2 text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button className="mt-6" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name} to your cart`);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    
    if (!isWishlisted) {
      toast.success("Added to wishlist");
    } else {
      toast("Removed from wishlist");
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div>
            <div className="overflow-hidden rounded-lg border bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="mt-2 text-sm text-muted-foreground uppercase">
                {product.category}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(product.rating)
                        ? "text-yellow-400"
                        : "text-muted"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating} Rating
              </span>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-end gap-2">
                <h2 className="text-3xl font-bold">${product.price.toFixed(2)}</h2>
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="mt-1 text-sm text-green-600">
                  Save ${(product.originalPrice - product.price).toFixed(2)} ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%)
                </p>
              )}
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="w-24">Quantity:</span>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <div className="flex h-8 w-12 items-center justify-center border-y">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-l-none"
                    onClick={increaseQuantity}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button 
                  className="flex-1" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={toggleWishlist}
                >
                  <Heart 
                    className={`mr-2 h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                  Wishlist
                </Button>
              </div>
            </div>

            <Separator />

            {/* Shipping and Returns */}
            <div className="space-y-3">
              <div className="flex items-start">
                <TruckIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">
                    Free standard shipping on orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <RotateCcw className="mr-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-sm text-muted-foreground">
                    30 day return policy
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="mr-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Secure Checkout</p>
                  <p className="text-sm text-muted-foreground">
                    Protected by industry leading encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <div className="prose max-w-none">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                  in dui mauris. Vivamus hendrerit arcu sed erat molestie
                  vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh
                  porttitor. Ut in nulla enim.
                </p>
                <p>
                  Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis
                  porttitor posuere. Praesent id metus massa, ut blandit odio.
                  Proin quis tortor orci. Etiam at risus et justo dignissim
                  congue.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <div className="prose max-w-none">
                <ul>
                  <li>Feature 1: High-quality materials</li>
                  <li>Feature 2: Durable construction</li>
                  <li>Feature 3: Premium finish</li>
                  <li>Feature 4: Ergonomic design</li>
                  <li>Feature 5: Energy efficient</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="prose max-w-none">
                <p>
                  Customer reviews coming soon. Be the first to review this product!
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Similar Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
