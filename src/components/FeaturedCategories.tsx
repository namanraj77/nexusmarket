
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryProps {
  name: string;
  description: string;
  image: string;
  path: string;
}

const categories: CategoryProps[] = [
  {
    name: "Electronics",
    description: "Latest gadgets and tech",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2670&auto=format&fit=crop",
    path: "/category/electronics",
  },
  {
    name: "Clothing",
    description: "Fashion for all seasons",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=2622&auto=format&fit=crop",
    path: "/category/clothing",
  },
  {
    name: "Groceries",
    description: "Fresh and organic products",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop",
    path: "/category/groceries",
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight md:text-3xl">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.name} to={category.path} className="block h-full">
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium">{category.name}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
