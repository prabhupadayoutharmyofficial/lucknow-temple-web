
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutSidebar = () => {
  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h3 className="font-devotional text-xl text-krishna-blue mb-4 text-center">Founder Acharya</h3>
        <div className="flex flex-col items-center mb-6">
          <img 
            src="https://images.unsplash.com/photo-1562157937-6935df0ddedc?q=80&w=1035&auto=format&fit=crop" 
            alt="Srila Prabhupada" 
            className="w-48 h-48 rounded-full object-cover mb-4 border-4 border-krishna-gold"
          />
          <h4 className="font-devotional text-lg font-semibold text-center">His Divine Grace A.C. Bhaktivedanta Swami Prabhupada</h4>
          <p className="text-sm text-muted-foreground text-center">Founder-Acharya of the International Society for Krishna Consciousness</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/srila-prabhupada">Know More</Link>
          </Button>
        </div>
        
        <Separator className="my-6" />
        
        <h3 className="font-devotional text-xl text-krishna-blue mb-4">Four Principles</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-krishna-gold text-white flex items-center justify-center shrink-0 mt-0.5">1</div>
            <span>Mercy - No meat eating</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-krishna-gold text-white flex items-center justify-center shrink-0 mt-0.5">2</div>
            <span>Cleanliness - No illicit sex</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-krishna-gold text-white flex items-center justify-center shrink-0 mt-0.5">3</div>
            <span>Austerity - No gambling</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-krishna-gold text-white flex items-center justify-center shrink-0 mt-0.5">4</div>
            <span>Truthfulness - No intoxication</span>
          </li>
        </ul>
        
        <Separator className="my-6" />
        
        <h3 className="font-devotional text-xl text-krishna-blue mb-4">Temple Activities</h3>
        <ul className="space-y-3">
          <li>Daily Worship & Aartis</li>
          <li>Bhagavad Gita Classes</li>
          <li>Sunday Feast Programs</li>
          <li>Youth Programs & Camps</li>
          <li>Food Distribution (Prasadam)</li>
          <li>Festival Celebrations</li>
          <li>Cultural Performances</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default AboutSidebar;
