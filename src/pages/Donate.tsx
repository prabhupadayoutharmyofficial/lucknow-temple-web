
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
  Copy
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Donate = () => {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${type} details have been copied to your clipboard.`,
    });
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
                  <Tabs defaultValue="upi">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="upi">UPI Payment</TabsTrigger>
                      <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upi">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* General Donations QR */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg font-devotional text-krishna-blue">General Donations</CardTitle>
                              <p className="text-sm text-muted-foreground">For temple maintenance and daily activities</p>
                            </CardHeader>
                            <CardContent className="text-center">
                              <img 
                                src="/qr-codes/general-donation.png" 
                                alt="General Donation QR Code"
                                className="mx-auto w-48 h-48 object-contain"
                              />
                              <div className="mt-4 border rounded-lg p-3">
                                <div className="flex justify-between items-center">
                                  <p className="text-sm font-medium">UPI ID</p>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-krishna-gold"
                                    onClick={() => copyToClipboard('general@temple', 'General Donation UPI ID')}
                                  >
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy
                                  </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">general@temple</p>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Prasadam Seva QR */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg font-devotional text-krishna-blue">Prasadam Seva</CardTitle>
                              <p className="text-sm text-muted-foreground">Support our food distribution program</p>
                            </CardHeader>
                            <CardContent className="text-center">
                              <img 
                                src="/qr-codes/prasadam-seva.png" 
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
                                    onClick={() => copyToClipboard('prasadam@temple', 'Prasadam Seva UPI ID')}
                                  >
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy
                                  </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">prasadam@temple</p>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Festival Donations QR */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg font-devotional text-krishna-blue">Festival Donations</CardTitle>
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
                                    onClick={() => copyToClipboard('festival@temple', 'Festival Donation UPI ID')}
                                  >
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy
                                  </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">festival@temple</p>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Goshala Donations QR */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg font-devotional text-krishna-blue">Goshala Seva</CardTitle>
                              <p className="text-sm text-muted-foreground">Support our cow protection program</p>
                            </CardHeader>
                            <CardContent className="text-center">
                              <img 
                                src="/qr-codes/goshala.png" 
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
                                    onClick={() => copyToClipboard('goshala@temple', 'Goshala Seva UPI ID')}
                                  >
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy
                                  </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">goshala@temple</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="bg-krishna-gold/5 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">
                            After making the donation, please take a screenshot of the payment confirmation 
                            and WhatsApp it to <span className="font-medium">+91 9876543210</span> along with your name, 
                            donation purpose, and PAN number (optional, for 80G certificate).
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="bank">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* General Donations Account */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg font-devotional text-krishna-blue">General Donations</CardTitle>
                              <p className="text-sm text-muted-foreground">For temple maintenance and daily activities</p>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">Account Name</p>
                                  <p className="text-sm font-medium">Sri Krishna Temple Trust</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">Account Number</p>
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">1234567890</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-krishna-gold"
                                      onClick={() => copyToClipboard('1234567890', 'General Account Number')}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">IFSC Code</p>
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">SBIN0123456</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-krishna-gold"
                                      onClick={() => copyToClipboard('SBIN0123456', 'General IFSC Code')}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">Bank & Branch</p>
                                  <p className="text-sm font-medium">SBI, Lucknow Main</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Prasadam Seva Account */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg font-devotional text-krishna-blue">Prasadam Seva</CardTitle>
                              <p className="text-sm text-muted-foreground">Support our food distribution program</p>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">Account Name</p>
                                  <p className="text-sm font-medium">Sri Krishna Temple Prasadam</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">Account Number</p>
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">2345678901</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-krishna-gold"
                                      onClick={() => copyToClipboard('2345678901', 'Prasadam Account Number')}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">IFSC Code</p>
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">SBIN0123457</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-krishna-gold"
                                      onClick={() => copyToClipboard('SBIN0123457', 'Prasadam IFSC Code')}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">Bank & Branch</p>
                                  <p className="text-sm font-medium">SBI, Lucknow Main</p>
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
                                  <p className="text-sm font-medium">Sri Krishna Temple Festivals</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">Account Number</p>
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">3456789012</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-krishna-gold"
                                      onClick={() => copyToClipboard('3456789012', 'Festival Account Number')}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">IFSC Code</p>
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">SBIN0123458</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-krishna-gold"
                                      onClick={() => copyToClipboard('SBIN0123458', 'Festival IFSC Code')}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">Bank & Branch</p>
                                  <p className="text-sm font-medium">SBI, Lucknow Main</p>
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
                                  <p className="text-sm font-medium">Sri Krishna Temple Goshala</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">Account Number</p>
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">4567890123</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-krishna-gold"
                                      onClick={() => copyToClipboard('4567890123', 'Goshala Account Number')}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">IFSC Code</p>
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">SBIN0123459</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-krishna-gold"
                                      onClick={() => copyToClipboard('SBIN0123459', 'Goshala IFSC Code')}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">Bank & Branch</p>
                                  <p className="text-sm font-medium">SBI, Lucknow Main</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="bg-krishna-gold/5 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">
                            After making the bank transfer, please email the transaction details along with your name, 
                            donation purpose, and PAN number (optional, for 80G certificate) to <span className="font-medium">donations@temple.org</span>
                          </p>
                        </div>
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
