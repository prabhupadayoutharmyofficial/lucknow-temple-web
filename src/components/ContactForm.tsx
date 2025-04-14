
import React from 'react';
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
import { MailCheck } from 'lucide-react';

const ContactForm = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real application, handle form submission to backend
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We will get back to you soon.",
      action: (
        <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
          <MailCheck className="h-4 w-4 text-green-500" />
        </div>
      ),
    });
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
          <div className="space-y-2">
            <Input placeholder="Your Name" required />
          </div>
          <div className="space-y-2">
            <Input type="email" placeholder="Email Address" required />
          </div>
          <div className="space-y-2">
            <Input placeholder="Subject" required />
          </div>
          <div className="space-y-2">
            <Textarea 
              placeholder="Your Message" 
              className="min-h-[120px]" 
              required 
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-krishna-gold hover:bg-krishna-saffron text-white"
          >
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
