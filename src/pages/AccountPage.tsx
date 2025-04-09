
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock profile data - would come from authentication system
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001"
  });
  
  const handleLogout = () => {
    setIsLoading(true);
    
    // Simulate logout process
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Logged out successfully");
      navigate("/");
    }, 1000);
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password updated successfully");
  };
  
  // Mock order history
  const orders = [
    {
      id: "ORD-1234",
      date: "2023-06-15",
      total: 159.99,
      status: "Delivered"
    },
    {
      id: "ORD-5678",
      date: "2023-05-22",
      total: 249.99,
      status: "Processing"
    }
  ];
  
  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <h1 className="text-2xl font-bold mb-6">My Account</h1>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground mb-4">
                Logged in as {profile.email}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? "Logging out..." : "Log Out"}
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <p className="text-sm text-muted-foreground">
                      Update your personal details here.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input 
                          id="name" 
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profile.email} 
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="address" className="text-sm font-medium">
                        Address
                      </label>
                      <Input 
                        id="address" 
                        value={profile.address}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                      />
                    </div>
                    
                    <Button type="submit">
                      Update Profile
                    </Button>
                  </form>
                </div>
              </TabsContent>
              
              {/* Orders Tab */}
              <TabsContent value="orders">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Order History</h2>
                    <p className="text-sm text-muted-foreground">
                      View and track your orders here.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div 
                          key={order.id} 
                          className="border rounded-lg p-4"
                        >
                          <div className="flex flex-col md:flex-row justify-between mb-2">
                            <div>
                              <h3 className="font-medium">Order {order.id}</h3>
                              <p className="text-sm text-muted-foreground">
                                Placed on {order.date}
                              </p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                order.status === "Delivered" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <Button variant="ghost" size="sm">View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        You haven't placed any orders yet.
                      </p>
                      <Button className="mt-4" asChild>
                        <a href="/">Start Shopping</a>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Password Tab */}
              <TabsContent value="password">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Change Password</h2>
                    <p className="text-sm text-muted-foreground">
                      Update your password to keep your account secure.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="current-password" className="text-sm font-medium">
                        Current Password
                      </label>
                      <Input id="current-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="new-password" className="text-sm font-medium">
                        New Password
                      </label>
                      <Input id="new-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirm-password" className="text-sm font-medium">
                        Confirm New Password
                      </label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    
                    <Button type="submit">
                      Update Password
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
