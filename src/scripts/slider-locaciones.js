import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const initLocacionesFixed = () => {
    requestAnimationFrame(() => {
        new Swiper(".swiperLocacionesFixed", {
            modules: [Navigation, Autoplay],
            slidesPerView: 1,
            spaceBetween: 50,
            loop: true,
            loopAdditionalSlides: 3,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: ".swiper-next-locaciones-fixed",
                prevEl: ".swiper-prev-locaciones-fixed",
            },
            breakpoints: {
                640: { slidesPerView: 1.5, spaceBetween: 30 },
                768: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 3, spaceBetween: 50 }
            },
            observer: false,
            observeParents: false,
        });
    });
};

// Initialize on first load
initLocacionesFixed();

// Initialize on view transitions
document.addEventListener('astro:page-load', initLocacionesFixed);
