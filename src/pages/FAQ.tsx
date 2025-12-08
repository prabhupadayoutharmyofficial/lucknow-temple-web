
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { QuestionMarkIcon } from '@/components/QuestionMarkIcon';

const FAQ_HERO_IMAGE = 'https://jjiyqxfotpfwdiwdexzp.supabase.co/storage/v1/object/public/Media/FAQ2.jpg';

const FAQ = () => {
  useEffect(() => {
    const existingLink = document.querySelector(`link[href="${FAQ_HERO_IMAGE}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = FAQ_HERO_IMAGE;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[80vh] bg-cover bg-center flex items-center justify-center" 
          style={{ 
            backgroundImage: `url('${FAQ_HERO_IMAGE}')`,
          }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative text-center text-white z-10">
            <h1 className="font-devotional text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl max-w-3xl mx-auto">Find answers to common questions</p>
          </div>
        </div>
        
        {/* FAQ Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <QuestionMarkIcon className="mx-auto mb-4" />
              <h2 className="font-devotional text-3xl font-semibold text-krishna-blue">We're Here to Help</h2>
              <p className="text-muted-foreground mt-2">
                Browse through these frequently asked questions. If you don't find what you're looking for, 
                please feel free to <a href="/contact" className="text-krishna-gold hover:underline">contact us</a>.
              </p>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-devotional text-xl text-krishna-blue mb-4">About the Temple</h3>
                <Accordion type="single" collapsible className="border rounded-lg">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="px-4">What is ISKCON?</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      ISKCON (International Society for Krishna Consciousness) is a spiritual organization founded by His Divine Grace A.C. Bhaktivedanta Swami Prabhupada in 1966. It is commonly known as the Hare Krishna movement and is based on ancient Vedic scriptures, particularly the Bhagavad-gita and Srimad-Bhagavatam.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="px-4">When was the Lucknow temple established?</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      The ISKCON Lucknow temple was established in 1982 and has since been serving the spiritual needs of devotees and visitors in Lucknow and surrounding areas.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="px-4">Who are the deities in the temple?</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      The main deities in the temple are Sri Sri Radha Krishna. The temple also has deities of Lord Jagannath, Baladeva, and Subhadra, as well as Gaura-Nitai (Lord Chaitanya and Lord Nityananda).
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div>
                <h3 className="font-devotional text-xl text-krishna-blue mb-4">Visiting the Temple</h3>
                <Accordion type="single" collapsible className="border rounded-lg">
                  <AccordionItem value="visit-1">
                    <AccordionTrigger className="px-4">What are the temple visiting hours?</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      The temple is open daily from 4:30 AM to 12:30 PM and 4:00 PM to 9:00 PM. The temple is closed in the afternoon from 12:30 PM to 4:00 PM.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="visit-2">
                    <AccordionTrigger className="px-4">Is there a dress code for visiting the temple?</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      Yes, modest dress is required. Men should wear pants (no shorts) and shirts that cover the shoulders. Women should wear sarees, salwar kameez, long skirts, or modest western attire that covers shoulders and legs.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="visit-3">
                    <AccordionTrigger className="px-4">Can I take photographs inside the temple?</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      Photography is generally allowed in most areas of the temple, but flash photography is prohibited in front of the deities. In some special ceremonies, photography may be restricted. Please check with the temple authorities when you visit.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="visit-4">
                    <AccordionTrigger className="px-4">Can I bring outside food to the temple?</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      Outside food is generally not allowed inside the temple hall. The temple offers prasadam (sanctified food) to all visitors, especially during special programs and on Sundays.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div>
                <h3 className="font-devotional text-xl text-krishna-blue mb-4">Programs & Services</h3>
                <Accordion type="single" collapsible className="border rounded-lg">
                  <AccordionItem value="prog-1">
                    <AccordionTrigger className="px-4">What is the Sunday Feast program?</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      The Sunday Feast is a special program held every Sunday from 5:30 PM to 8:30 PM. It includes kirtan (devotional singing), a spiritual discourse, and a free vegetarian feast (prasadam). Everyone is welcome to attend.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="prog-2">
                    <AccordionTrigger className="px-4">Does the temple offer accommodations for visitors?</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      The temple has limited guest accommodations for devotees and spiritual seekers. Please contact the temple administration in advance to check availability and make a reservation.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="prog-3">
                    <AccordionTrigger className="px-4">Are there any yoga classes at the temple?</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      Yes, the temple offers Bhakti Yoga classes regularly. These classes focus on spiritual practices, mantra meditation, and the philosophy of Bhagavad-gita. Check the temple schedule for timings.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div>
                <h3 className="font-devotional text-xl text-krishna-blue mb-4">Donations & Volunteering</h3>
                <Accordion type="single" collapsible className="border rounded-lg">
                  <AccordionItem value="don-1">
                    <AccordionTrigger className="px-4">How can I donate to the temple?</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      You can donate to the temple through our website's donation page, by direct bank transfer, or in person at the temple. All donations are used for temple maintenance, deity worship, prasadam distribution, and community services.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="don-2">
                    <AccordionTrigger className="px-4">Are donations tax-deductible?</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      Yes, donations to ISKCON Lucknow are eligible for tax benefits under Section 80G of the Income Tax Act. We provide receipts for all donations.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="don-3">
                    <AccordionTrigger className="px-4">How can I volunteer at the temple?</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      We welcome volunteers for various services. You can help with cooking, cleaning, gardening, book distribution, festival organization, and more. Please visit our temple office or contact us through the website to sign up as a volunteer.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
