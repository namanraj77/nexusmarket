
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About NexusMarket</h1>
          
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070" 
              alt="Modern office with team members" 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          </div>

          <div className="space-y-6 text-lg">
            <p>
              Founded in 2020, NexusMarket was born out of a simple vision: to create a seamless online
              shopping experience that connects people with quality products from around the world.
            </p>

            <h2 className="text-2xl font-semibold mt-8">Our Mission</h2>
            <p>
              At NexusMarket, we're on a mission to revolutionize online shopping by providing a curated
              selection of premium products across electronics, clothing, and groceries, all in one
              convenient platform. We believe that shopping should be enjoyable, transparent, and accessible to everyone.
            </p>

            <h2 className="text-2xl font-semibold mt-8">Our Team</h2>
            <p>
              Our diverse team of experts brings together years of experience in retail, technology, and
              customer service. United by our passion for innovation and customer satisfaction, we work
              tirelessly to make NexusMarket your preferred shopping destination.
            </p>

            <h2 className="text-2xl font-semibold mt-8">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">Quality First:</span> We carefully vet all products to ensure they meet our high standards.</li>
              <li><span className="font-medium">Customer Obsession:</span> Your satisfaction drives every decision we make.</li>
              <li><span className="font-medium">Transparency:</span> We believe in honest pricing and clear communication.</li>
              <li><span className="font-medium">Innovation:</span> We continuously improve our platform to enhance your shopping experience.</li>
              <li><span className="font-medium">Sustainability:</span> We're committed to reducing our environmental footprint.</li>
            </ul>

            <div className="mt-10 flex justify-center">
              <Button asChild className="mr-4">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
