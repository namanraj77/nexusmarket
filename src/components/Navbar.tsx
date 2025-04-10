
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Heart, LogIn, LogOut, Smartphone, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function Navbar() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { user, signOut } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  
  // New state for category collapsibles
  const [openCategory, setOpenCategory] = useState<string | null>(null);

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

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const mainCategories = [
    { name: "All", path: "/" },
    { name: "Electronics", path: "/category/electronics", hasSubcategories: true },
    { name: "Clothing", path: "/category/clothing" },
    { name: "Fashion", path: "/category/fashion", icon: <ShoppingBag className="mr-1 h-4 w-4" aria-hidden="true" /> },
    { name: "Groceries", path: "/category/groceries" },
  ];

  const subcategories = {
    "Electronics": [
      { name: "Mobile Phones", path: "/category/mobile-phones", icon: <Smartphone className="mr-1 h-4 w-4" aria-hidden="true" /> },
      { name: "Laptops", path: "/category/electronics/laptops" },
      { name: "Audio", path: "/category/electronics/audio" },
    ]
  };

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
            {mainCategories.map((category) => (
              <div key={category.name} className="relative group">
                {category.hasSubcategories ? (
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center text-sm font-medium transition-colors hover:text-primary">
                      {category.icon && category.icon}
                      <span>{category.name}</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="absolute z-50 bg-white border rounded-md shadow-md py-2 min-w-[180px] mt-1">
                      {subcategories[category.name as keyof typeof subcategories]?.map((subcat) => (
                        <Link
                          key={subcat.name}
                          to={subcat.path}
                          className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                        >
                          {subcat.icon && subcat.icon}
                          <span>{subcat.name}</span>
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    to={category.path}
                    className="flex items-center text-sm font-medium transition-colors hover:text-primary"
                  >
                    {category.icon && category.icon}
                    <span>{category.name}</span>
                  </Link>
                )}
              </div>
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
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
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
            {mainCategories.map((category) => (
              <div key={category.name} className="w-full">
                {category.hasSubcategories ? (
                  <Collapsible>
                    <div className="flex items-center justify-between">
                      <Link
                        to={category.path}
                        className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.icon && category.icon}
                        <span>{category.name}</span>
                      </Link>
                      <CollapsibleTrigger 
                        onClick={() => toggleCategory(category.name)}
                        className="p-2 hover:bg-accent rounded-md"
                      >
                        {openCategory === category.name ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="pl-4 mt-1 border-l border-accent">
                      {subcategories[category.name as keyof typeof subcategories]?.map((subcat) => (
                        <Link
                          key={subcat.name}
                          to={subcat.path}
                          className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subcat.icon && subcat.icon}
                          <span>{subcat.name}</span>
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={category.name}
                    to={category.path}
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.icon && category.icon}
                    <span>{category.name}</span>
                  </Link>
                )}
              </div>
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
