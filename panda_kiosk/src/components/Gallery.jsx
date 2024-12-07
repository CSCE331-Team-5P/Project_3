import React from 'react';
import MenuItemCard from './MenuItemCard';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export default function Gallery({ items,sideQuantities, incrementQuantity, decrementQuantity }) {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <MenuItemCard
                  title={item.title}
                  imageUrl={item.imageUrl}
                  calories={item.calories}
                  quantity={sideQuantities[item.id]}
                  incrementQuantity={() => incrementQuantity(item.id)}
                  decrementQuantity={() => decrementQuantity(item.id)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-6rem] top-1/2 -translate-y-1/2 bg-red-700 border-2 border-border hover:bg-yellow-400 hover:text-accent-foreground h-16 w-16 rounded-full">
          <ChevronLeft className="h-10 w-10" />
        </CarouselPrevious>
        <CarouselNext className="absolute right-[-6rem] top-1/2 -translate-y-1/2 bg-red-700 border-2 border-border hover:bg-yellow-400 hover:text-accent-foreground h-16 w-16 rounded-full">
          <ChevronRight className="h-10 w-10" />
        </CarouselNext>
      </Carousel>
    </div>
  );
}