
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  HeartHandshake,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Donate = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pan: '',
    paymentMethod: 'upi',
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [transactionId, setTransactionId] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const handleNextStep = () => {
    const newErrors = {
      fullName: '',
      email: '',
      phone: '',
    };
    let hasError = false;

    if (!formData.fullName) {
      newErrors.fullName = 'Full Name is required';
      hasError = true;
    }
    if (!formData.email) {
      newErrors.email = 'Email Address is required';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
      hasError = true;
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone Number is required';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setStep(2);
    }
  };

  const handleCompleteDonation = () => {
    if (!transactionId) {
      toast({
        title: 'Transaction ID Required',
        description: 'Please enter the transaction ID to complete the process.',
        variant: 'destructive',
      });
      return;
    }
    setShowThankYou(true);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      pan: '',
      paymentMethod: 'upi',
    });
    setTransactionId('');
    setShowThankYou(false);
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div
          className="relative h-[50vh] bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1532466901723-63cd96b3bcb2?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative text-center text-white z-10">
            <h1 className="font-devotional text-5xl font-bold mb-4">
              Support Our Mission
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Your donations help us spread spiritual knowledge and serve the
              community
            </p>
          </div>
        </div>

        {/* Donation Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="font-devotional text-3xl text-krishna-blue flex items-center gap-3">
                  <HeartHandshake className="text-krishna-gold" />
                  Make a Donation
                </CardTitle>
              </CardHeader>
              <CardContent>
                {step === 1 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Step 1: Your Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="pan">PAN Number (for 80G)</Label>
                        <Input
                          id="pan"
                          value={formData.pan}
                          onChange={(e) =>
                            setFormData({ ...formData, pan: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label>Payment Method</Label>
                        <RadioGroup
                          defaultValue="upi"
                          className="flex gap-4 mt-2"
                          onValueChange={(value) =>
                            setFormData({ ...formData, paymentMethod: value })
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="upi" id="upi" />
                            <Label htmlFor="upi">UPI</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bank" id="bank" />
                            <Label htmlFor="bank">Bank Transfer</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <Button onClick={handleNextStep} className="w-full">
                        Next Step <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-6">
                      Step 2: Payment Details
                    </h3>
                    {formData.paymentMethod === 'upi' ? (
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
                                src="/public/lovable-uploads/646139b0-b5ec-4cdc-bac5-b47d4efd1854.png" 
                                alt="General Donation QR Code"
                                className="mx-auto w-48 h-48 object-contain"
                              />
                              <div className="mt-4 border rounded-lg p-3">
                                <div className="flex justify-between items-center">
                                  <p className="text-sm font-medium">UPI ID</p>

                                </div>
                                <p className="text-sm text-muted-foreground">your-general-upi-id</p>
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
                                src="/public/prasadam.jpg" 
                                alt="Prasadam Seva QR Code"
                                className="mx-auto w-48 h-48 object-contain"
                              />
                              <div className="mt-4 border rounded-lg p-3">
                                <div className="flex justify-between items-center">
                                  <p className="text-sm font-medium">UPI ID</p>

                                </div>
                                <p className="text-sm text-muted-foreground">your-prasadam-upi-id</p>
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

                                </div>
                                <p className="text-sm text-muted-foreground">your-festival-upi-id</p>
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
                                src="/public/ISKCON GAUSHALA.png" 
                                alt="Goshala Seva QR Code"
                                className="mx-auto w-48 h-48 object-contain"
                              />
                              <div className="mt-4 border rounded-lg p-3">
                                <div className="flex justify-between items-center">
                                  <p className="text-sm font-medium">UPI ID</p>

                                </div>
                                <p className="text-sm text-muted-foreground">your-goshala-upi-id</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ) : (
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
                                    <p className="text-sm font-medium">YOUR_ACCOUNT_NUMBER</p>

                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">IFSC Code</p>
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">YOUR_IFSC_CODE</p>

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
                                    <p className="text-sm font-medium">YOUR_ACCOUNT_NUMBER</p>

                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">IFSC Code</p>
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">YOUR_IFSC_CODE</p>

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
                                    <p className="text-sm font-medium">YOUR_ACCOUNT_NUMBER</p>

                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">IFSC Code</p>
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">YOUR_IFSC_CODE</p>

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
                                    <p className="text-sm font-medium">YOUR_ACCOUNT_NUMBER</p>

                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-sm text-muted-foreground">IFSC Code</p>
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">YOUR_IFSC_CODE</p>

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
                    )}
                    <div className="mt-6">
                      <Label htmlFor="transactionId">Transaction ID</Label>
                      <Input
                        id="transactionId"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Form
                      </Button>
                      <Button onClick={handleCompleteDonation}>
                        Complete Donation Process
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </section>
      </main>
      <Footer />

      <AlertDialog open={showThankYou} onOpenChange={setShowThankYou}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              Donation Completed Successfully!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for your generous donation, {formData.fullName}. Your support is invaluable to us.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="text-sm">
            <p className="font-semibold">80G Certificate Information:</p>
            <p>
              If you have provided your PAN number, your 80G certificate will be sent to your email address ({formData.email}) within 30 days.
            </p>
            <p className="mt-4 font-semibold">For any queries, please contact us at:</p>
            <p>Email: your-email@example.com</p>
            <p>Phone: +91 1234567890</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => window.location.href = '/'}>Close</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>
              Make another donation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Donate;
