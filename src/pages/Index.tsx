
import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { CategorySection } from "@/components/CategorySection";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { 
  electronicProducts, 
  mobilePhoneProducts,
  clothingProducts, 
  groceryProducts, 
  fashionProducts
} from "@/data/mockData";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedCategories />
      <CategorySection 
        category={{ name: "Electronics", path: "/category/electronics" }}
        products={electronicProducts}
        showAll={false}
      />
      <div className="bg-accent/50 py-12">
        <CategorySection 
          category={{ name: "Mobile Phones", path: "/category/mobile-phones" }}
          products={mobilePhoneProducts}
          showAll={false}
        />
      </div>
      <CategorySection 
        category={{ name: "Clothing", path: "/category/clothing" }}
        products={clothingProducts}
        showAll={false}
      />
      <div className="bg-accent/50 py-12">
        <CategorySection 
          category={{ name: "Fashion", path: "/category/fashion" }}
          products={fashionProducts}
          showAll={false}
        />
      </div>
      <CategorySection 
        category={{ name: "Groceries", path: "/category/groceries" }}
        products={groceryProducts}
        showAll={false}
      />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default Index;
