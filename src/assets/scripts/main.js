// Carousel Functionality with Intersection Observer
document.addEventListener('DOMContentLoaded', function () {
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselContainer = document.querySelector('.carousel-container');

  if (!carouselTrack || !carouselContainer) return;

  // Intersection Observer to detect when carousel is in view
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1, // Carousel starts when 10% is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Carousel is visible, start animation
        carouselTrack.classList.add('in-view');
        console.log('Carousel started - in view');
      } else {
        // Carousel is not visible, pause animation
        carouselTrack.classList.remove('in-view');
        console.log('Carousel paused - out of view');
      }
    });
  }, observerOptions);

  // Start observing the carousel container
  observer.observe(carouselContainer);

  // Pause on hover functionality
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      carouselTrack.style.animationPlayState = 'paused';
    });

    carouselContainer.addEventListener('mouseleave', () => {
      // Only resume if the carousel is in view
      if (carouselTrack.classList.contains('in-view')) {
        carouselTrack.style.animationPlayState = 'running';
      }
    });
  }

  // Handle page visibility change (when user switches tabs)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      carouselTrack.classList.remove('in-view');
    } else {
      // Check if carousel is still in viewport when page becomes visible
      const rect = carouselContainer.getBoundingClientRect();
      const isInView =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      if (isInView) {
        carouselTrack.classList.add('in-view');
      }
    }
  });
});

// Awards Slider Functionality
document.addEventListener('DOMContentLoaded', function () {
  const awardsTrack = document.querySelector('.awards-track');
  const awardsItems = document.querySelectorAll('.award-item');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicators = document.querySelectorAll('.slide-indicator');

  if (!awardsTrack || !prevBtn || !nextBtn) return;

  let currentSlide = 0;
  let autoSlideInterval;
  const totalSlides = awardsItems.length;

  function updateSlider() {
    // Move track
    const translateX = currentSlide * -50;
    awardsTrack.style.transform = `translateX(${translateX}%)`;

    // Update active states
    awardsItems.forEach((item, index) => {
      item.classList.toggle('active', index === currentSlide);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Event listeners
  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });

  // Indicator event listeners
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      stopAutoSlide();
      goToSlide(index);
      startAutoSlide();
    });
  });

  // Pause on hover
  const sliderContainer = document.querySelector('.awards-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
  }

  // Initialize slider
  updateSlider();
  startAutoSlide();
});

// Legacy carousel code for eventos (if needed)
document.addEventListener('DOMContentLoaded', function () {
  const eventosGrid = document.querySelector('.eventos-grid');
  if (!eventosGrid) return;

  const prevBtn = document.querySelector('.nav-arrow.prev');
  const nextBtn = document.querySelector('.nav-arrow.next');
  const cards = document.querySelectorAll('.evento-card');

  let currentIndex = 0;
  const cardWidth = 330;
  const visibleCards = 3;
  const maxIndex = Math.max(0, cards.length - visibleCards);

  function updateCarousel() {
    const translateX = currentIndex * cardWidth;
    eventosGrid.style.transform = `translateX(-${translateX}px)`;

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
  }

  function nextSlide() {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  updateCarousel();

  if (window.innerWidth <= 768) {
    eventosGrid.style.transform = 'none';
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth <= 768) {
      eventosGrid.style.transform = 'none';
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    } else {
      if (prevBtn) prevBtn.style.display = 'flex';
      if (nextBtn) nextBtn.style.display = 'flex';
      updateCarousel();
    }
  });
});

// Video Player Functionality
function playVideo() {
  const thumbnail = document.querySelector('.relative.cursor-pointer.overflow-hidden');
  const videoPlayer = document.getElementById('video-player');

  if (thumbnail && videoPlayer) {
    thumbnail.style.display = 'none';
    videoPlayer.classList.remove('hidden');
  }
}

// Mobile Menu Functionality
function toggleMobileMenu() {
  const sidebar = document.getElementById('navSidebar');
  const overlay = document.querySelector('.fixed.inset-0.bg-black');

  if (sidebar && overlay) {
    sidebar.style.right = sidebar.style.right === '0px' ? '-300px' : '0px';
    overlay.classList.toggle('hidden');
  }
}

function closeMobileMenu() {
  const sidebar = document.getElementById('navSidebar');
  const overlay = document.querySelector('.fixed.inset-0.bg-black');

  if (sidebar && overlay) {
    sidebar.style.right = '-300px';
    overlay.classList.add('hidden');
  }
}

// Contact Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('contactModal');
  const closeBtn = document.querySelector('.close');
  const contactForm = document.getElementById('contactForm');

  // Function to open modal
  function openModal() {
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  // Function to close modal
  function closeModal() {
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  }

  // Close modal when clicking the X button  
  const closeBtn = modal?.querySelector('span');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside of it
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Create WhatsApp message
      const message = createWhatsAppMessage(data);

      // Open WhatsApp with the message
      const whatsappUrl = `https://api.whatsapp.com/send/?phone=573168753305&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      // Close modal and reset form
      closeModal();
      contactForm.reset();

      // Show success message
      alert('¡Gracias por tu interés! Te hemos redirigido a WhatsApp para continuar la conversación.');
    });
  }

  // Function to create WhatsApp message from form data
  function createWhatsAppMessage(data) {
    let message = '¡Hola! Me interesa conocer más sobre sus servicios para eventos.\n\n';
    message += `📋 *INFORMACIÓN DEL EVENTO*\n`;
    message += `• Nombre: ${data.name || 'No especificado'}\n`;
    message += `• Email: ${data.email || 'No especificado'}\n`;
    message += `• Teléfono: ${data.phone || 'No especificado'}\n`;

    if (data.eventType) {
      message += `• Tipo de evento: ${getEventTypeText(data.eventType)}\n`;
    }

    if (data.guests) {
      message += `• Número de invitados: ${data.guests}\n`;
    }

    if (data.date) {
      message += `• Fecha tentativa: ${formatDate(data.date)}\n`;
    }

    if (data.budget) {
      message += `• Presupuesto: ${data.budget}\n`;
    }

    if (data.message) {
      message += `\n💬 *COMENTARIOS ADICIONALES*\n${data.message}\n`;
    }

    message += '\n¡Espero su respuesta para coordinar una cita!';

    return message;
  }

  // Helper function to get event type text
  function getEventTypeText(eventType) {
    const eventTypes = {
      'boda': 'Boda de destino',
      'matrimonio': 'Matrimonio',
      'cumpleanos': 'Cumpleaños',
      'corporativo': 'Evento corporativo',
      'quinceanos': 'Quinceaños',
      'otro': 'Otro'
    };
    return eventTypes[eventType] || eventType;
  }

  // Helper function to format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Make openModal function globally available
  window.openContactModal = openModal;
});
