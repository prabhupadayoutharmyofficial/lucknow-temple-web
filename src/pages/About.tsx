import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QuestionMarkIcon } from '@/components/QuestionMarkIcon';
import { 
  Users, 
  Building, 
  Home, 
  BookOpen, 
  Utensils, 
  Coffee, 
  Wifi, 
  ShoppingBag, 
  BookMarked,
  Music,
  User,
  UserPlus,
  Baby
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh] bg-cover bg-center flex items-center justify-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1621507624347-9303588463d3?q=80&w=2070&auto=format&fit=crop')"
          }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative text-center text-white z-10">
            <h1 className="font-devotional text-5xl font-bold mb-4">About ISKCON Lucknow</h1>
            <p className="text-xl max-w-3xl mx-auto">Discover our temple's history, mission, and principles</p>
          </div>
        </div>
        
        {/* About Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="font-devotional text-3xl font-semibold text-krishna-blue mb-8">Our History</h2>
              <div className="space-y-6 text-lg">
                <p>
                  The International Society for Krishna Consciousness (ISKCON) was established in 1966 by His Divine Grace 
                  A.C. Bhaktivedanta Swami Prabhupada. The ISKCON Lucknow temple was established in the early 1990s and 
                  has since grown to become one of the prominent spiritual centers in the city.
                </p>
                <p>
                  The temple is dedicated to Lord Krishna and Srimati Radharani, known as Sri Sri Radha Krishna. The temple 
                  follows the Vaishnava tradition, one of the major Hindu denominations, which worships Vishnu or Krishna 
                  as the Supreme Lord.
                </p>
                <p>
                  Over the years, ISKCON Lucknow has expanded its services and outreach programs, serving the community through 
                  various spiritual and charitable activities. The temple has become not just a place of worship, but also 
                  a cultural center that promotes Vedic knowledge, arts, and traditions.
                </p>
                
                <h3 className="font-devotional text-2xl font-semibold text-krishna-blue mt-12 mb-4">Our Mission</h3>
                <p>
                  ISKCON Lucknow's mission is to promote the well-being of society by teaching the science of Krishna 
                  consciousness according to Bhagavad-gita and other ancient scriptures. Our core principles include:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>To systematically propagate spiritual knowledge to society at large</li>
                  <li>To bring the members closer together for the purpose of teaching a simpler and more natural way of life</li>
                  <li>To educate all people in the techniques of spiritual life in order to check the imbalance of values in life</li>
                  <li>To propagate a consciousness of Krishna as it is revealed in the Bhagavad-gita and Srimad Bhagavatam</li>
                </ul>
                
                {/* New Section: Temple Construction */}
                <h3 className="font-devotional text-2xl font-semibold text-krishna-blue mt-12 mb-4">Temple Construction</h3>
                <div className="bg-gradient-to-r from-krishna-gold/10 to-transparent p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <Building className="text-krishna-gold h-8 w-8" />
                    <h4 className="font-devotional text-xl text-krishna-blue">Sacred Architecture</h4>
                  </div>
                  <p>
                    The ISKCON Lucknow temple construction began in 1995 and was completed in 2002 after seven years of 
                    dedicated effort. The temple was designed by renowned architect Sri Ramchandra Das, who incorporated 
                    traditional Nagara-style Vedic architecture with modern construction techniques.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white/80 p-4 rounded shadow-sm">
                      <h5 className="font-devotional text-krishna-blue mb-2">Design Elements</h5>
                      <ul className="list-disc ml-6 space-y-1">
                        <li>Traditional shikhara (spire) reaching 75 feet high</li>
                        <li>Hand-carved stone mandapam (hall)</li>
                        <li>Ornate marble work from Rajasthan</li>
                        <li>Intricately designed pillars narrating Krishna's pastimes</li>
                      </ul>
                    </div>
                    <div className="bg-white/80 p-4 rounded shadow-sm">
                      <h5 className="font-devotional text-krishna-blue mb-2">Construction Phases</h5>
                      <ul className="list-disc ml-6 space-y-1">
                        <li>Foundation ceremony: 1995</li>
                        <li>Main structure completion: 1998</li>
                        <li>Interior work: 1998-2000</li>
                        <li>Deity installation: 2001</li>
                        <li>Grand opening: 2002</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="mt-6">
                    The temple stands as a testament to devotional service, built with contributions from thousands of 
                    devotees worldwide. The main prayer hall can accommodate over 500 devotees at once, while the temple 
                    compound spans across 3 acres of land, providing ample space for various community activities.
                  </p>
                </div>

                {/* New Section: Programs for Males, Females and Kids */}
                <h3 className="font-devotional text-2xl font-semibold text-krishna-blue mt-12 mb-4">Programs for All</h3>
                <div className="space-y-6">
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
                              <BookMarked className="h-5 w-5 text-krishna-gold shrink-0 mt-1" />
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

                {/* New Section: Facilities Available */}
                <h3 className="font-devotional text-2xl font-semibold text-krishna-blue mt-12 mb-4">Facilities Available</h3>
                <div className="bg-gradient-to-r from-krishna-blue/10 to-transparent p-6 rounded-lg">
                  <p className="mb-6">
                    Our temple offers various facilities to ensure a pleasant and spiritually enriching experience 
                    for all visitors and devotees. Here are some of the amenities available at ISKCON Lucknow:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded shadow-md flex items-start gap-3">
                      <Home className="text-krishna-blue h-6 w-6 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium text-krishna-blue">Guest House</h4>
                        <p className="text-sm text-gray-600">
                          Comfortable accommodation facilities for devotees and visitors, available at nominal charges. 
                          Advanced booking is recommended during festivals.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow-md flex items-start gap-3">
                      <Utensils className="text-krishna-blue h-6 w-6 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium text-krishna-blue">Govinda's Restaurant</h4>
                        <p className="text-sm text-gray-600">
                          Serves delicious pure vegetarian prasadam prepared with love and devotion. 
                          The restaurant is open daily from 11 AM to 9 PM.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow-md flex items-start gap-3">
                      <BookOpen className="text-krishna-blue h-6 w-6 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium text-krishna-blue">Library</h4>
                        <p className="text-sm text-gray-600">
                          Extensive collection of spiritual books, manuscripts, and multimedia resources 
                          for study and research.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow-md flex items-start gap-3">
                      <ShoppingBag className="text-krishna-blue h-6 w-6 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium text-krishna-blue">Gift Shop</h4>
                        <p className="text-sm text-gray-600">
                          Offers a wide range of spiritual items, books, devotional accessories, clothing, 
                          and prasadam products.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow-md flex items-start gap-3">
                      <Coffee className="text-krishna-blue h-6 w-6 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium text-krishna-blue">Prasadam Hall</h4>
                        <p className="text-sm text-gray-600">
                          Spacious hall where free prasadam is distributed to devotees, especially 
                          during festivals and weekly Sunday feasts.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow-md flex items-start gap-3">
                      <Wifi className="text-krishna-blue h-6 w-6 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium text-krishna-blue">Free Wi-Fi</h4>
                        <p className="text-sm text-gray-600">
                          Complimentary Wi-Fi available throughout the temple premises for devotees 
                          and visitors.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-yellow-50 p-4 rounded border border-krishna-gold/30">
                    <p className="text-sm">
                      <span className="font-medium">Note:</span> All facilities are available during temple opening hours. 
                      For special assistance or requirements, please contact the temple administration office.
                    </p>
                  </div>
                </div>
                
                <h3 className="font-devotional text-2xl font-semibold text-krishna-blue mt-12 mb-4">Temple Architecture</h3>
                <p>
                  The ISKCON Lucknow temple is a beautiful example of traditional Vedic architecture blended with modern 
                  construction techniques. The temple's design represents the spiritual cosmos, with its spires reaching 
                  toward the heavens and its sanctum representing the center of the universe.
                </p>
                <p>
                  The temple features intricate carvings, vibrant paintings depicting scenes from Krishna's pastimes, and 
                  ornate altars that house the deities. The main prayer hall can accommodate hundreds of devotees, making it 
                  suitable for large gatherings during festivals and special events.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-devotional text-xl text-krishna-blue mb-4">Founder Acharya</h3>
                  <div className="flex flex-col items-center mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1562157937-6935df0ddedc?q=80&w=1035&auto=format&fit=crop" 
                      alt="Srila Prabhupada" 
                      className="w-48 h-48 rounded-full object-cover mb-4 border-4 border-krishna-gold"
                    />
                    <h4 className="font-devotional text-lg font-semibold">His Divine Grace A.C. Bhaktivedanta Swami Prabhupada</h4>
                    <p className="text-sm text-muted-foreground text-center">Founder-Acharya of the International Society for Krishna Consciousness</p>
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
