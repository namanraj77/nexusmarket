
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials: TestimonialProps[] = [
  {
    name: "Sarah Johnson",
    role: "Regular Customer",
    content: "NexusMarket has revolutionized how I shop. The product quality is exceptional, and their customer service team went above and beyond to help me with a return. I'm a customer for life!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    name: "Michael Chen",
    role: "Tech Enthusiast",
    content: "As someone who's picky about electronics, I'm impressed by NexusMarket's curation. Their detailed product descriptions helped me make informed decisions, and shipping was faster than expected.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    name: "Emily Rodriguez",
    role: "Fashion Blogger",
    content: "Finding unique clothing pieces used to be a challenge until I discovered NexusMarket. The variety is impressive, and I've received countless compliments on items I've purchased here!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    name: "David Thompson",
    role: "Busy Parent",
    content: "The grocery section on NexusMarket has been a lifesaver for our family. The quality of fresh produce is consistently excellent, and the subscription option saves me so much time each week.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialProps }) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="mb-6 text-muted-foreground">{testimonial.content}</p>
        <div className="flex items-center mt-auto">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <p className="font-medium">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function Testimonials() {
  return (
    <section className="py-16 bg-accent/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their shopping experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
