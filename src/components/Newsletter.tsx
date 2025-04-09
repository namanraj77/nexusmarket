
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="bg-accent py-12 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Subscribe to our Newsletter
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get the latest updates on new products and upcoming sales.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row sm:gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="sm:min-w-72"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" disabled={loading} className="mt-2 sm:mt-0">
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
