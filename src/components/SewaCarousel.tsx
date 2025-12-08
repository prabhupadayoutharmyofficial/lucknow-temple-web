import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SewaCarousel = () => {
  const sewaData = [
    {
      id: 1,
      title: "Life Membership",
      price: "₹55,555/-",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 2,
      title: "Gau Seva",
      price: "₹3,100 - ₹1,00,000/-",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Wholeday Arti Seva",
      price: "₹5,100/-",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 4,
      title: "Rajbhog Donation",
      price: "₹11,000/-",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 5,
      title: "Special Devotee Prasadam (Meal)",
      price: "₹21,000/-",
      color: "from-red-500 to-red-600"
    },
    {
      id: 6,
      title: "Whole Day Deity Bhoga",
      price: "₹21,000/-",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      id: 7,
      title: "56 Bhoga Seva",
      price: "₹25,000/-",
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 8,
      title: "Whole Day Temple Expenses",
      price: "₹51,000/-",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: 9,
      title: "Night Dress For the Lord",
      price: "₹51,000/-",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      id: 10,
      title: "Jewellary Donation",
      price: "₹51,000/-",
      color: "from-rose-500 to-rose-600"
    },
    {
      id: 11,
      title: "Pandav Membership",
      price: "₹11,00,000/-",
      color: "from-amber-500 to-amber-600"
    },
    {
      id: 12,
      title: "Day Dress For the Lord",
      price: "₹1,50,000/-",
      color: "from-lime-500 to-lime-600"
    },
    {
      id: 13,
      title: "Room Donation",
      price: "₹5,00,000 - ₹11,00,000/-",
      color: "from-teal-500 to-teal-600"
    },
    {
      id: 14,
      title: "Food For Life - Khichdi Halwa, Kheer",
      price: "₹11,000 - ₹21,000/-",
      color: "from-orange-500 to-orange-600"
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-12">
        <h2 className="font-devotional text-3xl font-semibold text-krishna-blue mb-3">
          Ways to Serve (Sewa)
        </h2>
        <p className="text-gray-600 text-lg">
          Discover how you can contribute to our spiritual mission and serve the community
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {sewaData.map((sewa) => (
            <CarouselItem key={sewa.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                <div className={`bg-gradient-to-br ${sewa.color} p-8 text-white text-center min-h-[220px] flex flex-col justify-center items-center`}>
                  <CardTitle className="text-2xl font-devotional mb-6 leading-relaxed">
                    {sewa.title}
                  </CardTitle>
                  <div className="text-4xl font-bold text-white drop-shadow-lg">
                    {sewa.price}
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
};

export default SewaCarousel;
