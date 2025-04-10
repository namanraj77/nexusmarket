
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Heart, LogIn, LogOut, Smartphone, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { user, signOut } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
      setIsMenuOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const categories = [
    { name: "All", path: "/" },
    { name: "Electronics", path: "/category/electronics" },
    { name: "Mobile Phones", path: "/category/mobile-phones", icon: <Smartphone className="mr-1 h-4 w-4" aria-hidden="true" /> },
    { name: "Clothing", path: "/category/clothing" },
    { name: "Fashion", path: "/category/fashion", icon: <ShoppingBag className="mr-1 h-4 w-4" aria-hidden="true" /> },
    { name: "Groceries", path: "/category/groceries" },
  ];

  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">NexusMarket</span>
        </Link>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="flex items-center text-sm font-medium transition-colors hover:text-primary"
              >
                {category.icon && category.icon}
                <span>{category.name}</span>
              </Link>
            ))}
          </nav>
        )}

        {/* Search - Desktop */}
        {!isMobile && (
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        )}

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}

          {/* Mobile Search Toggle */}
          {isMobile && (
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {/* Wishlist */}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/wishlist" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>

          {/* Cart */}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart" aria-label="Shopping Cart">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          {/* Auth */}
          {user ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/account" aria-label="Account">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </Button>
              {!isMobile && (
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Button>
              )}
            </>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/auth" aria-label="Login">
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="border-t border-border bg-background p-4 absolute w-full animate-fade-in">
          <nav className="grid gap-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.icon && category.icon}
                <span>{category.name}</span>
              </Link>
            ))}
            
            {user && (
              <Button 
                variant="ghost" 
                className="flex items-center justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            )}
          </nav>
          <div className="mt-4">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      )}
    </header>
  );
}
