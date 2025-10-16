import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Item = {
  id: number;
  title: string;
  href: string;
  image?: string;
  alt?: string;
  date?: string;
  excerpt?: string;
};

interface PostsCarouselProps {
  items: Item[];
  className?: string;
  delayMs?: number; // opcional (autoplay delay)
}

export default function PostsCarousel({
  items,
  className = "",
  delayMs = 4000,
}: PostsCarouselProps) {
  if (!items?.length) return null;

  return (
<div className="relative w-full">
  {/* Título fijo */}
  <h1
    className="
      absolute top-10 left-1/2 -translate-x-1/2 z-20
      font-serif text-white drop-shadow-2xl
      text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight
      text-center
    "
  >
    Blogs
  </h1>

  {/* Carrusel */}
  <Carousel className="rounded-3xl overflow-hidden">
    <CarouselContent>
      {items.map((item) => (
        <CarouselItem key={item.id} className="basis-full">
          <a
            href={item.href}
            className="group block w-full overflow-hidden"
          >
            <div className="relative aspect-[16/9] w-full">
              {/* Imagen */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.alt || item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="eager"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <span className="text-sm text-gray-500">Sin imagen</span>
                </div>
              )}

              {/* Overlay para contraste */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Título del post */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <h2
                  className="
                    mx-auto max-w-4xl text-center text-white drop-shadow-md
                    font-poppins font-semibold leading-tight
                    text-2xl md:text-3xl lg:text-4xl
                  "
                >
                  {item.title}
                </h2>
              </div>
            </div>
          </a>
        </CarouselItem>
      ))}
    </CarouselContent>

    {/* Controles */}
    <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow hover:bg-white" />
    <CarouselNext className="right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow hover:bg-white" />
  </Carousel>
</div>

  );
}
