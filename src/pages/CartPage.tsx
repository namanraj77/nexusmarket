
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ProductCard";
import { Trash2, ShoppingBag, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { electronicProducts } from "@/data/mockData";

// Sample cart items for demonstration
const initialCartItems = [
  {
    id: "e1",
    name: "Premium Wireless Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop",
    quantity: 1,
  },
  {
    id: "e2",
    name: "Ultra HD Smart TV 55\"",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=2624&auto=format&fit=crop",
    quantity: 1,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const recommendedProducts = electronicProducts.slice(0, 4);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast("Item removed from cart");
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setIsPromoApplied(true);
      toast.success("Promo code applied successfully!");
    } else {
      toast.error("Invalid promo code");
    }
  };

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="mt-2 text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            {/* Cart Items List */}
            <div className="md:col-span-2">
              <div className="rounded-lg border bg-card">
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex flex-col p-4 sm:flex-row sm:items-center">
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
                        <div className="flex justify-between">
                          <Link to={`/product/${item.id}`}>
                            <h3 className="font-medium">{item.name}</h3>
                          </Link>
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <div className="flex h-8 w-12 items-center justify-center border-y">
                              {item.quantity}
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="ml-2 hidden sm:inline">Remove</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-xl font-semibold">Order Summary</h3>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {isPromoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Promo Code */}
                  <div className="pt-4">
                    <p className="text-sm font-medium">Promo Code</p>
                    <div className="mt-2 flex">
                      <Input
                        placeholder="Enter code"
                        className="rounded-r-none"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={isPromoApplied}
                      />
                      <Button
                        className="rounded-l-none"
                        onClick={applyPromoCode}
                        disabled={!promoCode || isPromoApplied}
                      >
                        Apply
                      </Button>
                    </div>
                    {isPromoApplied && (
                      <p className="mt-2 text-xs text-green-600">
                        10% discount applied!
                      </p>
                    )}
                  </div>

                  <Button className="w-full" size="lg">
                    Checkout
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border bg-card p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-lg font-medium">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button className="mt-6" asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        )}

        {/* Recommended Products */}
        {cartItems.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-semibold">You might also like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
