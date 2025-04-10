
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We'll get back to you as soon as possible!",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
          <p className="text-lg text-center text-muted-foreground mb-12">
            Have a question or feedback? We'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center p-6 bg-accent/20 rounded-lg">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Email Us</h3>
              <p className="text-center text-muted-foreground">
                support@nexusmarket.com
              </p>
              <p className="text-center text-muted-foreground">
                sales@nexusmarket.com
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-accent/20 rounded-lg">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Call Us</h3>
              <p className="text-center text-muted-foreground">
                +1 (555) 123-4567
              </p>
              <p className="text-center text-muted-foreground">
                Mon-Fri, 9AM-6PM EST
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-accent/20 rounded-lg">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Visit Us</h3>
              <p className="text-center text-muted-foreground">
                123 Market Street, Suite 100
              </p>
              <p className="text-center text-muted-foreground">
                New York, NY 10001
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-card rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            <div>
              <div className="bg-card rounded-lg shadow-sm overflow-hidden h-96">
                <iframe
                  title="NexusMarket Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343035!2d-74.0059413!3d40.7127837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sManhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1679076994420!5m2!1sen!2sus"
                  className="w-full h-full border-0"
                  loading="lazy"
                ></iframe>
              </div>
              <div className="mt-6 p-6 bg-accent/20 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
