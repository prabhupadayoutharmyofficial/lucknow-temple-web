import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const receiptFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  pan: z.string().optional(),
});

const updatedReceiptFormSchema = receiptFormSchema.extend({
  transactionId: z.string().min(1, "Transaction ID is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
});

const Donate = () => {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${type} details have been copied to your clipboard.`,
    });
  };

  const receiptForm = useForm<z.infer<typeof receiptFormSchema>>({
    resolver: zodResolver(receiptFormSchema),
    defaultValues: {},
    mode: "onBlur",
  });

  const updatedReceiptForm = useForm<z.infer<typeof updatedReceiptFormSchema>>({
    resolver: zodResolver(updatedReceiptFormSchema),
    defaultValues: {},
    mode: "onBlur",
  });

  const onSubmitReceiptForm = (values: z.infer<typeof receiptFormSchema>) => {
    console.log("80G Receipt Request Submitted:", values);
    toast({
      title: "Request Submitted",
      description: "Your request for an 80G receipt has been submitted successfully.",
    });
    receiptForm.reset();
  };

  const onSubmitUpdatedReceiptForm = (values: z.infer<typeof updatedReceiptFormSchema>) => {
    console.log("Updated 80G Receipt Request Submitted:", values);
    toast({
      title: "Request Submitted",
      description: "Your request for an 80G receipt has been submitted successfully.",
    });
    updatedReceiptForm.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="container mx-auto px-4 py-16">
          <h2 className="font-devotional text-3xl font-semibold text-krishna-blue mb-8">
            Donation Options
          </h2>

          <Tabs defaultValue="upi">
            <TabsList>
              <TabsTrigger value="upi">UPI</TabsTrigger>
              <TabsTrigger value="bank">Bank Details</TabsTrigger>
            </TabsList>

            <TabsContent value="upi">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-devotional text-krishna-blue">ISKCON PROJECTS QR CODE</CardTitle>
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
            </TabsContent>

            <TabsContent value="bank">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-devotional text-krishna-blue">Iskcon Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">Account Name</p>
                        <p className="text-sm font-medium">ISKCON PROJECT</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">Account Number</p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">50278005410</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-krishna-gold"
                            onClick={() => copyToClipboard('50278005410', 'General Account Number')}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">IFSC Code</p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">IDIB000A532</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-krishna-gold"
                            onClick={() => copyToClipboard('IDIB000A532', 'General IFSC Code')}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">Bank & Branch</p>
                        <p className="text-sm font-medium">Indian Bank, Ahimamau</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* ISKCON FOOD FOR LIFE Account */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-devotional text-krishna-blue">Food For Life</CardTitle>
                    <p className="text-sm text-muted-foreground">Support our food distribution program</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">Account Name</p>
                        <p className="text-sm font-medium">INTERNATIONAL SOCIETY FOR KRISHNA CONSCIOUSNESS (ISKCON)</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">Account Number</p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">740701000482</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-krishna-gold"
                            onClick={() => copyToClipboard('740701000482', 'Prasadam Account Number')}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">IFSC Code</p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">ICIC0007407</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-krishna-gold"
                            onClick={() => copyToClipboard('ICIC0007407', 'Prasadam IFSC Code')}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">Bank & Branch</p>
                        <p className="text-sm font-medium">ICICI BANK, SUSHANT GOLF CITY</p>
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
                        <p className="text-sm font-medium">ISKCON FESTIVAL</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">Account Number</p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">50278006139</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-krishna-gold"
                            onClick={() => copyToClipboard('50278006139', 'Festival Account Number')}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">IFSC Code</p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">IDIB000A532</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-krishna-gold"
                            onClick={() => copyToClipboard('IDIB000A532', 'Festival IFSC Code')}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">Bank & Branch</p>
                        <p className="text-sm font-medium">Indian Bank, Ahimamau</p>
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
                        <p className="text-sm font-medium">ISKCON GAUSHALA</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">Account Number</p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">50278006571</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-krishna-gold"
                            onClick={() => copyToClipboard('50278006571', 'Goshala Account Number')}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">IFSC Code</p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">IDIB000A532</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-krishna-gold"
                            onClick={() => copyToClipboard('IDIB000A532', 'Goshala IFSC Code')}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">Bank & Branch</p>
                        <p className="text-sm font-medium">Indian Bank ,Ahimamau</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h3 className="font-devotional text-3xl font-semibold text-red-600 mb-6">
            Request 80G Receipt
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            The receipt can only be requested if the payment has been made. Please ensure you fill in the transaction ID and the amount paid.
          </p>
          <Form {...updatedReceiptForm}>
            <form onSubmit={updatedReceiptForm.handleSubmit(onSubmitUpdatedReceiptForm)} className="space-y-6">
              <FormField
                control={updatedReceiptForm.control}
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
                control={updatedReceiptForm.control}
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
                control={updatedReceiptForm.control}
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
                control={updatedReceiptForm.control}
                name="pan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your PAN number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={updatedReceiptForm.control}
                name="transactionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your transaction ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={updatedReceiptForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount Paid</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter the amount paid"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-krishna-gold hover:bg-krishna-saffron">
                Submit Request
              </Button>
            </form>
          </Form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;
