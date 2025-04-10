
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, XIcon, SlidersHorizontal } from "lucide-react";
import { 
  electronicProducts, 
  mobilePhoneProducts, 
  clothingProducts, 
  groceryProducts, 
  fashionProducts 
} from "@/data/mockData";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  
  let products;
  let categoryTitle;
  let categoryDescription;

  switch (category) {
    case "electronics":
      products = electronicProducts;
      categoryTitle = "Electronics";
      categoryDescription = "Discover the latest in tech and electronics";
      break;
    case "mobile-phones":
      products = mobilePhoneProducts;
      categoryTitle = "Mobile Phones";
      categoryDescription = "Explore our range of smartphones and accessories";
      break;
    case "clothing":
      products = clothingProducts;
      categoryTitle = "Clothing";
      categoryDescription = "Find your perfect style with our clothing collection";
      break;
    case "fashion":
      products = fashionProducts;
      categoryTitle = "Fashion";
      categoryDescription = "Trendy accessories and fashion items for every occasion";
      break;
    case "groceries":
      products = groceryProducts;
      categoryTitle = "Groceries";
      categoryDescription = "Fresh and premium groceries delivered to your door";
      break;
    default:
      products = [
        ...electronicProducts, 
        ...mobilePhoneProducts, 
        ...clothingProducts, 
        ...fashionProducts, 
        ...groceryProducts
      ];
      categoryTitle = "All Products";
      categoryDescription = "Browse our complete collection of premium products";
  }

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low-high":
            return a.price - b.price;
          case "price-high-low":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          default:
            return 0; // featured
        }
      });
  }, [products, priceRange, sortBy]);

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {categoryTitle}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {categoryDescription}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filters toggle */}
          <div className="block md:hidden mb-4">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filters sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-1/4 lg:w-1/5`}>
            <div className="sticky top-20 space-y-6">
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="space-y-4">
                  <Slider 
                    defaultValue={priceRange} 
                    max={1500} 
                    step={10} 
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">In Stock</span>
                  </div>
                  <div className="flex items-center">
                    <XIcon className="h-4 w-4 mr-2 text-red-500" />
                    <span className="text-sm">Out of Stock</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Product Type</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-accent">All</Badge>
                  <Badge variant="secondary" className="cursor-pointer">New</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-accent">Sale</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-accent">Featured</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {/* Sort and filter row */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
                <Button onClick={() => setPriceRange([0, 1500])} className="mt-4">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
