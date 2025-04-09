
import { Link } from "react-router-dom";
import { ProductCard, ProductProps } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

interface CategorySectionProps {
  category: {
    name: string;
    path: string;
  };
  products: ProductProps[];
  showAll?: boolean;
}

export function CategorySection({ category, products, showAll = false }: CategorySectionProps) {
  const displayProducts = showAll ? products : products.slice(0, 4);
  
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">{category.name}</h2>
          {!showAll && (
            <Button variant="outline" asChild>
              <Link to={category.path}>View All</Link>
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
