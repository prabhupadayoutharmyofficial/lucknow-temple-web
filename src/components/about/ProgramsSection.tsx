
import React from 'react';
import { 
  User, 
  UserPlus, 
  Baby, 
  BookOpen, 
  Music, 
  Users, 
  Utensils, 
  ShoppingBag 
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProgramsSection = () => {
  return (
    <div className="space-y-6">
      <h3 className="font-devotional text-2xl font-semibold text-krishna-blue mt-12 mb-4">Programs for All</h3>
      <p>
        ISKCON Lucknow offers a variety of spiritual, educational, and social programs catering to people of all ages 
        and backgrounds. These programs aim to nurture spiritual growth and foster a sense of community among devotees.
      </p>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="male-programs">
          <AccordionTrigger className="bg-krishna-blue/10 px-4 rounded-t">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-krishna-blue" />
              <span className="font-devotional text-lg">Programs for Men</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-krishna-blue/5 px-4 pb-4 rounded-b">
            <div className="pt-3">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-krishna-blue shrink-0 mt-1" />
                  <div>
                    <h5 className="font-medium">Bhagavad Gita Study Circle</h5>
                    <p className="text-sm text-gray-600">Weekly classes exploring the profound teachings of Bhagavad Gita, specifically addressing the responsibilities of men in spiritual life.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Music className="h-5 w-5 text-krishna-blue shrink-0 mt-1" />
                  <div>
                    <h5 className="font-medium">Kirtan Group</h5>
                    <p className="text-sm text-gray-600">Weekly kirtan sessions where men gather to chant the holy names of the Lord and learn traditional musical instruments.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-krishna-blue shrink-0 mt-1" />
                  <div>
                    <h5 className="font-medium">Men's Fellowship</h5>
                    <p className="text-sm text-gray-600">Monthly gatherings for spiritual discussions, prasadam, and building brotherhood among devotees.</p>
                  </div>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="female-programs" className="mt-4">
          <AccordionTrigger className="bg-krishna-lotus/10 px-4 rounded-t">
            <div className="flex items-center gap-3">
              <UserPlus className="h-5 w-5 text-krishna-lotus" />
              <span className="font-devotional text-lg">Programs for Women</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-krishna-lotus/5 px-4 pb-4 rounded-b">
            <div className="pt-3">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-krishna-lotus shrink-0 mt-1" />
                  <div>
                    <h5 className="font-medium">Srimad Bhagavatam Classes</h5>
                    <p className="text-sm text-gray-600">Special classes focusing on the exemplary women in Vedic scriptures and their contributions.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Utensils className="h-5 w-5 text-krishna-lotus shrink-0 mt-1" />
                  <div>
                    <h5 className="font-medium">Prasadam Cooking Classes</h5>
                    <p className="text-sm text-gray-600">Learn to prepare traditional Vaishnava cuisine offered to Lord Krishna.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Music className="h-5 w-5 text-krishna-lotus shrink-0 mt-1" />
                  <div>
                    <h5 className="font-medium">Tulasi Care & Deity Worship</h5>
                    <p className="text-sm text-gray-600">Hands-on training in caring for sacred Tulasi plants and learning deity dress-making.</p>
                  </div>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="kid-programs" className="mt-4">
          <AccordionTrigger className="bg-krishna-gold/10 px-4 rounded-t">
            <div className="flex items-center gap-3">
              <Baby className="h-5 w-5 text-krishna-gold" />
              <span className="font-devotional text-lg">Programs for Children</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-krishna-gold/5 px-4 pb-4 rounded-b">
            <div className="pt-3">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ShoppingBag className="h-5 w-5 text-krishna-gold shrink-0 mt-1" />
                  <div>
                    <h5 className="font-medium">Bal Gopal Classes</h5>
                    <p className="text-sm text-gray-600">Age-appropriate spiritual education for children through stories, games, and activities.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Music className="h-5 w-5 text-krishna-gold shrink-0 mt-1" />
                  <div>
                    <h5 className="font-medium">Children's Kirtan</h5>
                    <p className="text-sm text-gray-600">Special kirtan sessions designed for children to learn bhajans, playing instruments, and dancing.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ShoppingBag className="h-5 w-5 text-krishna-gold shrink-0 mt-1" />
                  <div>
                    <h5 className="font-medium">Summer Camps</h5>
                    <p className="text-sm text-gray-600">Annual residential camps featuring spiritual activities, outdoor adventures, arts & crafts, and more.</p>
                  </div>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProgramsSection;
