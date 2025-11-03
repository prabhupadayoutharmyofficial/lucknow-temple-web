
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { MailCheck, Loader2 } from 'lucide-react';

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      // Combine all form data into a message string
      const messageDetails = `
Purpose: ${formData.get('purpose')}
Phone: ${formData.get('phone')}
Preferred Contact: ${formData.get('preferredContact')}
Best Time: ${formData.get('bestTime')}
Address: ${formData.get('address')}
Message: ${formData.get('message')}
      `;
      
      // Prepare the data for Web3Forms
      const apiData = {
        access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Replace with your Web3Forms access key
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: messageDetails,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(apiData)
      });

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Message Sent Successfully",
          description: "Thank you for contacting us. We will get back to you soon.",
          action: (
            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <MailCheck className="h-4 w-4 text-green-500" />
            </div>
          ),
        });
        e.currentTarget.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md decorative-border">
      <CardHeader className="space-y-1">
        <CardTitle className="font-devotional text-2xl text-krishna-blue">
          Contact Us
        </CardTitle>
        <CardDescription>
          Send us a message and we'll get back to you soon
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input name="name" placeholder="Your Name" required />
            </div>
            <div className="space-y-2">
              <Input name="email" type="email" placeholder="Email Address" required />
            </div>
          </div>
          <div className="space-y-2">
            <Input name="phone" type="tel" placeholder="Phone Number" pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" required />
          </div>
          <div className="space-y-2">
            <select name="purpose" className="w-full p-2 border rounded-md" required>
              <option value="">Select Purpose of Contact</option>
              <option value="general">General Inquiry</option>
              <option value="priest">Priest Services</option>
              <option value="event">Event Booking</option>
              <option value="donation">Donation Related</option>
              <option value="volunteer">Volunteer Opportunities</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <Input name="subject" placeholder="Subject" required />
          </div>
          <div className="space-y-2">
            <Textarea 
              name="message"
              placeholder="Your Message" 
              className="min-h-[120px]" 
              required 
            />
          </div>
          <div className="space-y-2">
            <select name="preferredContact" className="w-full p-2 border rounded-md" required>
              <option value="">Preferred Contact Method</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
          <div className="space-y-2">
            <select name="bestTime" className="w-full p-2 border rounded-md" required>
              <option value="">Best Time to Contact</option>
              <option value="morning">Morning (9 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
              <option value="evening">Evening (4 PM - 8 PM)</option>
            </select>
          </div>
          <div className="space-y-2">
            <Textarea 
              name="address"
              placeholder="Address (Optional)" 
              className="min-h-[80px]" 
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-krishna-gold hover:bg-krishna-saffron text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
