
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-black text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=3270&auto=format&fit=crop"
          alt="Hero"
          className="h-full w-full object-cover opacity-60"
        />
      </div>
      <div className="relative z-10 container py-16 md:py-24 lg:py-32">
        <div className="max-w-lg">
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Premium Shopping Experience
          </h1>
          <p className="mb-8 text-lg opacity-90">
            Discover a curated collection of premium products across electronics, clothing, and groceries.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link to="/category/electronics">Shop Electronics</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10" asChild>
              <Link to="/category/clothing">Shop Clothing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
