
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Landmark, 
  HeartHandshake, 
  Calendar, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/components/ui/use-toast';

const donationSchema = z.object({
  amount: z.string().min(1, "Please select or enter an amount"),
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  pan: z.string().optional(),
  paymentMethod: z.enum(["card", "bank", "upi"])
});

const Donate = () => {
  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: "1100",
      paymentMethod: "card"
    }
  });

  const onSubmit = (values: z.infer<typeof donationSchema>) => {
    // This would be connected to a payment gateway in production
    console.log(values);
    toast({
      title: "Donation Initiated",
      description: `Thank you for your donation of ₹${values.amount}. You will be redirected to the payment gateway.`,
    });
    // Here you would redirect to payment gateway
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh] bg-cover bg-center flex items-center justify-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1532466901723-63cd96b3bcb2?q=80&w=2070&auto=format&fit=crop')",
          }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative text-center text-white z-10">
            <h1 className="font-devotional text-5xl font-bold mb-4">Support Our Mission</h1>
            <p className="text-xl max-w-3xl mx-auto">Your donations help us spread spiritual knowledge and serve the community</p>
          </div>
        </div>
        
        {/* Donation Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="font-devotional text-3xl font-semibold text-krishna-blue mb-8 flex items-center gap-3">
                <HeartHandshake className="text-krishna-gold" />
                Make a Donation
              </h2>
              
              <Card>
                <CardContent className="pt-6">
                  <Tabs defaultValue="one-time">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="one-time">One-time Donation</TabsTrigger>
                      <TabsTrigger value="recurring">Monthly Support</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="one-time">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Select Donation Amount</FormLabel>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                  {["501", "1100", "2100", "5100"].map((amount) => (
                                    <Button
                                      key={amount}
                                      type="button"
                                      variant={field.value === amount ? "default" : "outline"}
                                      className={field.value === amount ? "bg-krishna-gold hover:bg-krishna-gold/90" : ""}
                                      onClick={() => field.onChange(amount)}
                                    >
                                      ₹{amount}
                                    </Button>
                                  ))}
                                </div>
                                <FormControl>
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                      <span className="text-muted-foreground">₹</span>
                                    </div>
                                    <Input 
                                      placeholder="Custom Amount" 
                                      className="pl-8" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  All donations are eligible for tax exemption under Section 80G
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your name" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your email" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number (Optional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your phone number" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="pan"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>PAN Number (Optional, for 80G)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter PAN for tax benefit" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Payment Method</FormLabel>
                                <FormControl>
                                  <RadioGroup 
                                    className="grid grid-cols-3 gap-4"
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <FormItem className="flex flex-col items-center space-y-2">
                                      <FormControl>
                                        <RadioGroupItem value="card" className="sr-only" />
                                      </FormControl>
                                      <div className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 w-full ${field.value === 'card' ? 'border-krishna-gold bg-krishna-gold/5' : ''}`}>
                                        <CreditCard className={`mb-2 ${field.value === 'card' ? 'text-krishna-gold' : ''}`} />
                                        <span className="text-sm font-medium">Credit/Debit Card</span>
                                      </div>
                                    </FormItem>
                                    
                                    <FormItem className="flex flex-col items-center space-y-2">
                                      <FormControl>
                                        <RadioGroupItem value="bank" className="sr-only" />
                                      </FormControl>
                                      <div className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 w-full ${field.value === 'bank' ? 'border-krishna-gold bg-krishna-gold/5' : ''}`}>
                                        <Landmark className={`mb-2 ${field.value === 'bank' ? 'text-krishna-gold' : ''}`} />
                                        <span className="text-sm font-medium">Bank Transfer</span>
                                      </div>
                                    </FormItem>
                                    
                                    <FormItem className="flex flex-col items-center space-y-2">
                                      <FormControl>
                                        <RadioGroupItem value="upi" className="sr-only" />
                                      </FormControl>
                                      <div className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 w-full ${field.value === 'upi' ? 'border-krishna-gold bg-krishna-gold/5' : ''}`}>
                                        <svg 
                                          className={`w-6 h-6 mb-2 ${field.value === 'upi' ? 'text-krishna-gold' : ''}`} 
                                          viewBox="0 0 24 24" 
                                          fill="currentColor"
                                        >
                                          <path d="M21 9V3H15V9H21M21 21V15H15V21H21M3 21H9V15H3V21M3 9H9V3H3V9Z" />
                                        </svg>
                                        <span className="text-sm font-medium">UPI</span>
                                      </div>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" className="w-full bg-krishna-gold hover:bg-krishna-saffron text-white">
                            Proceed to Donation
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                    
                    <TabsContent value="recurring">
                      <div className="text-center py-8">
                        <Calendar className="mx-auto h-12 w-12 text-krishna-gold opacity-75" />
                        <h3 className="mt-4 text-lg font-semibold">Monthly Donation Programs</h3>
                        <p className="mt-2 text-muted-foreground">
                          Become a monthly supporter of our various temple programs. 
                          Please visit the temple office or contact us for setting up recurring donations.
                        </p>
                        <Button className="mt-6 bg-krishna-gold hover:bg-krishna-saffron" asChild>
                          <a href="/contact">Contact Us</a>
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-8">
              <Card className="decorative-border overflow-hidden">
                <CardHeader className="bg-krishna-gold/10">
                  <CardTitle className="font-devotional text-krishna-blue">Why Donate?</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="mb-4">Your generous donations support:</p>
                  <ul className="space-y-2">
                    {[
                      "Daily worship of the deities",
                      "Temple maintenance and operations",
                      "Food for Life program to feed the needy",
                      "Spiritual education and outreach",
                      "Festival celebrations throughout the year"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-krishna-gold shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Donation FAQs</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-4">
                  <div>
                    <p className="font-semibold">Is my donation tax-deductible?</p>
                    <p className="text-muted-foreground">Yes, donations are eligible for tax exemption under Section 80G.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Can I donate items instead of money?</p>
                    <p className="text-muted-foreground">Yes, the temple accepts various items. Please contact us for details.</p>
                  </div>
                  <div>
                    <p className="font-semibold">How will my donation be used?</p>
                    <p className="text-muted-foreground">Your donation supports temple maintenance, deity worship, prasadam distribution, and community services.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/faq">
                      More FAQs
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;
