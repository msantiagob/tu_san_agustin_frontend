import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const initServiciosSwiper = () => {
    requestAnimationFrame(() => {
        new Swiper(".mySwiperServicios", {
            modules: [Navigation, Autoplay],
            slidesPerView: 1,
            spaceBetween: 50,
            loop: true,
            speed: 800,
            navigation: {
                nextEl: ".swiper-next-servicios",
                prevEl: ".swiper-prev-servicios",
            },
            autoplay: {
                delay: 10000,
                disableOnInteraction: false,
            },
            observer: true,
            observeParents: true,
        });
    });
};

// Initialize on first load
initServiciosSwiper();

// Initialize on view transitions
document.addEventListener('astro:page-load', initServiciosSwiper);
