
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HeartHandshake, 
  Calendar, 
  ChevronRight,
  CheckCircle2,
  Copy,
  ArrowRight
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import axios from 'axios';

const step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  pan: z.string().optional(),
  paymentMethod: z.enum(["upi", "bank"])
});

const formSchema = step1Schema.extend({
  transactionId: z.string().min(1, "Transaction ID is required").regex(/^[a-zA-Z0-9-_]+$/, "Transaction ID can only contain letters, numbers, hyphens and underscores")
});

const Donate = () => {
  const [step, setStep] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'bank'>('upi');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      paymentMethod: "upi",
    },
    mode: "onBlur"
  });

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${type} details have been copied to your clipboard.`,
    });
  };

  const onSubmitStep1 = (values: z.infer<typeof step1Schema>) => {
    console.log("Step 1 values:", values);
    setSelectedPaymentMethod(values.paymentMethod);
    setStep(2);
    // Update form resolver for step 2
    form.clearErrors();
    form.setResolver(zodResolver(formSchema));
  };

  const onSubmitTransaction = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      const formData = {
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        name: values.name,
        email: values.email,
        phone: values.phone,
        pan: values.pan || "Not Provided",
        payment_method: values.paymentMethod,
        transaction_id: values.transactionId,
        subject: `New Temple Donation from ${values.name}`,
        message: `
          Donation Details:
          Name: ${values.name}
          Email: ${values.email}
          Phone: ${values.phone}
          PAN: ${values.pan || "Not Provided"}
          Payment Method: ${values.paymentMethod.toUpperCase()}
          Transaction ID: ${values.transactionId}
        `
      };

      const response = await axios.post(
        'https://api.web3forms.com/submit',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setShowThankYou(true);
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your donation. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  {step === 1 ? (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmitStep1)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
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
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
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
                                <Input placeholder="Enter your PAN number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="paymentMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payment Method</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-2 gap-4"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="upi" />
                                    </FormControl>
                                    <FormLabel className="font-normal">UPI Payment</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="bank" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Bank Transfer</FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full bg-krishna-gold hover:bg-krishna-saffron">
                          Next Step
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    <>
                      <div className="mb-6 flex justify-between items-center">
                        <Button 
                          variant="outline" 
                          onClick={() => setStep(1)}
                          className="mb-4"
                        >
                          Back to Form
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Step 2 of 2: Make Payment
                        </p>
                      </div>
                      {selectedPaymentMethod === "upi" ? (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* ISKCON PROJECTS QR Code */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg font-devotional text-krishna-blue">ISKCON PROJECTS QR CODE</CardTitle>
                                <p className="text-sm text-muted-foreground">For temple maintenance and daily activities</p>
                              </CardHeader>
                              <CardContent className="text-center">
                                <img 
                                  src="/ISKCON PROJECTS.png" 
                                  alt="ISKCON PROJECTS QR Code"
                                  className="mx-auto w-48 h-48 object-contain"
                                />
                                <div className="mt-4 border rounded-lg p-3">
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">UPI ID</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-krishna-gold"
                                      onClick={() => copyToClipboard('iskconprojects@indianbk', 'Iskcon Projects')}
                                    >
                                      <Copy className="h-4 w-4 mr-2" />
                                      Copy
                                    </Button>
                                  </div>
                                  <p className="text-sm text-muted-foreground">iskconprojects@indianbk</p>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Prasadam Seva QR */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg font-devotional text-krishna-blue">ISKCON FOOD FOR LIFE QR CODE</CardTitle>
                                <p className="text-sm text-muted-foreground">Support our food distribution program</p>
                              </CardHeader>
                              <CardContent className="text-center">
                                <img 
                                  src="/public/ISKCON FOOD FOR LIFE.jpg"
                                  alt="Prasadam Seva QR Code"
                                  className="mx-auto w-48 h-48 object-contain"
                                />
                                <div className="mt-4 border rounded-lg p-3">
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">UPI ID</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-krishna-gold"
                                      onClick={() => copyToClipboard('internationalsocietyforkrishnaconsciousness@icici', 'ISKCON FOOD FOR LIFE QR CODE')}
                                    >
                                      <Copy className="h-4 w-4 mr-2" />
                                      Copy
                                    </Button>
                                  </div>
                                  <p className="text-sm text-muted-foreground">internationalsocietyforkrishnaconsciousness@icici</p>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Festival Donations QR */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg font-devotional text-krishna-blue">FESTIVAL DONATIONS QR CODE</CardTitle>
                                <p className="text-sm text-muted-foreground">Support temple festivals and celebrations</p>
                              </CardHeader>
                              <CardContent className="text-center">
                                <img 
                                  src="/public/ISKCON FESTIVAL.png" 
                                  alt="Festival Donations QR Code"
                                  className="mx-auto w-48 h-48 object-contain"
                                />
                                <div className="mt-4 border rounded-lg p-3">
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">UPI ID</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-krishna-gold"
                                      onClick={() => copyToClipboard('iskconfestival@indianbk', 'Festival Donation UPI ID')}
                                    >
                                      <Copy className="h-4 w-4 mr-2" />
                                      Copy
                                    </Button>
                                  </div>
                                  <p className="text-sm text-muted-foreground">iskconfestival@indianbk</p>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Goshala Donations QR */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg font-devotional text-krishna-blue">GOSHALA SEWA QR CODE</CardTitle>
                                <p className="text-sm text-muted-foreground">Support our cow protection program</p>
                              </CardHeader>
                              <CardContent className="text-center">
                                <img 
                                  src="/ISKCON GAUSHALA.png" 
                                  alt="Goshala Seva QR Code"
                                  className="mx-auto w-48 h-48 object-contain"
                                />
                                <div className="mt-4 border rounded-lg p-3">
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">UPI ID</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-krishna-gold"
                                      onClick={() => copyToClipboard('iskcongaushala@indianbk', 'Goshala Seva UPI ID')}
                                    >
                                      <Copy className="h-4 w-4 mr-2" />
                                      Copy
                                    </Button>
                                  </div>
                                  <p className="text-sm text-muted-foreground">iskcongaushala@indianbk</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          
                          <div className="bg-krishna-gold/5 rounded-lg p-4">
                            <p className="text-sm text-muted-foreground">
                              After making the donation, please take a screenshot of the payment confirmation 
                              and WhatsApp it to <span className="font-medium">+91 0000000000</span> along with your name, 
                              donation purpose, and PAN number (optional, for 80G certificate).
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* ISKCON PROJECTS QR Code Account */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg font-devotional text-krishna-blue">ISKCON PROJECTS QR CODE</CardTitle>
                                <p className="text-sm text-muted-foreground">For temple maintenance and daily activities</p>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">Account Name</p>
                                    <p className="text-sm font-medium">Your Account Name</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">Account Number</p>
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm font-medium">000000000000</p>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-krishna-gold"
                                        onClick={() => copyToClipboard('000000000000', 'General Account Number')}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">IFSC Code</p>
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm font-medium">ABCD0123456</p>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-krishna-gold"
                                        onClick={() => copyToClipboard('ABCD0123456', 'General IFSC Code')}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">Bank & Branch</p>
                                    <p className="text-sm font-medium">Your Bank, Your Branch</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* ISKCON FOOD FOR LIFE Account */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg font-devotional text-krishna-blue">Prasadam Seva</CardTitle>
                                <p className="text-sm text-muted-foreground">Support our food distribution program</p>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">Account Name</p>
                                    <p className="text-sm font-medium">Your Account Name</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">Account Number</p>
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm font-medium">000000000000</p>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-krishna-gold"
                                        onClick={() => copyToClipboard('000000000000', 'Prasadam Account Number')}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">IFSC Code</p>
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm font-medium">ABCD0123456</p>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-krishna-gold"
                                        onClick={() => copyToClipboard('ABCD0123456', 'Prasadam IFSC Code')}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">Bank & Branch</p>
                                    <p className="text-sm font-medium">Your Bank, Your Branch</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Festival Account */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg font-devotional text-krishna-blue">Festival Donations</CardTitle>
                                <p className="text-sm text-muted-foreground">Support temple festivals and celebrations</p>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">Account Name</p>
                                    <p className="text-sm font-medium">Your Account Name</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">Account Number</p>
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm font-medium">000000000000</p>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-krishna-gold"
                                        onClick={() => copyToClipboard('000000000000', 'Festival Account Number')}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">IFSC Code</p>
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm font-medium">ABCD0123456</p>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-krishna-gold"
                                        onClick={() => copyToClipboard('ABCD0123456', 'Festival IFSC Code')}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">Bank & Branch</p>
                                    <p className="text-sm font-medium">Your Bank, Your Branch</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Goshala Account */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg font-devotional text-krishna-blue">Goshala Seva</CardTitle>
                                <p className="text-sm text-muted-foreground">Support our cow protection program</p>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">Account Name</p>
                                    <p className="text-sm font-medium">Your Account Name</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">Account Number</p>
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm font-medium">000000000000</p>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-krishna-gold"
                                        onClick={() => copyToClipboard('000000000000', 'Goshala Account Number')}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">IFSC Code</p>
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm font-medium">ABCD0123456</p>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-krishna-gold"
                                        onClick={() => copyToClipboard('ABCD0123456', 'Goshala IFSC Code')}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm text-muted-foreground">Bank & Branch</p>
                                    <p className="text-sm font-medium">Your Bank, Your Branch</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          
                          <div className="bg-krishna-gold/5 rounded-lg p-4">
                            <p className="text-sm text-muted-foreground">
                              After making the bank transfer, please email the transaction details along with your name, 
                              donation purpose, and PAN number (optional, for 80G certificate) to <span className="font-medium">your-email@example.com</span>
                            </p>
                          </div>
                        </div>
                      )}

                  <div className="mt-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmitTransaction)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="transactionId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Transaction ID *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your payment transaction ID" 
                                  {...field} 
                                  required
                                />
                              </FormControl>
                              <FormDescription>
                                Please enter the transaction ID from your payment confirmation. This is required to verify your donation.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full bg-krishna-gold hover:bg-krishna-saffron"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                              Processing...
                            </div>
                          ) : (
                            "Complete Donation Process"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </div>
                </>
                )}
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

      {/* Thank You Dialog */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center font-devotional text-2xl text-krishna-blue">
              Thank You for Your Donation
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
            <p>
              Your donation has been recorded successfully. We will process your 80G certificate
              (if applicable) and send it to your email address.
            </p>
            <p className="text-sm text-muted-foreground">
              For any queries, please contact us at your-email@example.com
            </p>
            <Button 
              className="bg-krishna-gold hover:bg-krishna-saffron"
              onClick={() => {
                setShowThankYou(false);
                form.reset();
                setStep(1);
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Donate;
