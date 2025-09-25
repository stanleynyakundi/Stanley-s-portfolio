 
 
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenuButton.innerHTML = mobileMenu.classList.contains('hidden') 
        ? '<i class="fas fa-bars"></i>' 
        : '<i class="fas fa-times"></i>';
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('glass-dark');
        navbar.classList.remove('glass');
      } else {
        navbar.classList.add('glass');
        navbar.classList.remove('glass-dark');
      }
    });

    // Particles.js Configuration
    particlesJS('particles-js', {
      particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: "#06b6d4" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#06b6d4",
          opacity: 0.1,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true
        }
      }
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Filter projects
        projects.forEach(project => {
          if (filter === 'all' || project.getAttribute('data-category') === filter) {
            project.style.display = 'block';
            // Add animation for appearing projects
            project.style.animation = 'fadeIn 0.5s ease forwards';
          } else {
            project.style.display = 'none';
          }
        });
      });
    });

    // Animate progress bars on scroll
    function animateProgressBars() {
      const progressBars = document.querySelectorAll('.progress-fill');
      
      progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight) && (rect.bottom >= 0);
        
        if (isVisible && !bar.classList.contains('animated')) {
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
          bar.classList.add('animated');
        }
      });
    }

    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          scrollTimeout = null;
          animateProgressBars();
        }, 10);
      }
    });

    // Initial check on page load
    window.addEventListener('load', animateProgressBars);

    // Simple 3D Building Model with Three.js
    function initBuildingModel() {
      const container = document.getElementById('building-model-3d');
      if (!container) return;
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
      
      // Add building geometry
      const geometry = new THREE.BoxGeometry(2, 3, 2);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.8
      });
      const building = new THREE.Mesh(geometry, material);
      scene.add(building);
      
      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 10, 7);
      scene.add(directionalLight);
      
      camera.position.z = 5;
      
      // Animation
      function animate() {
        requestAnimationFrame(animate);
        
        building.rotation.y += 0.005;
        
        renderer.render(scene, camera);
      }
      
      animate();
      
      // Handle window resize
      window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      });
    }
    
    // Initialize 3D model when page loads
    window.addEventListener('load', initBuildingModel);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Interactive code card effects
    const codeCards = document.querySelectorAll('.code-card');
    codeCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Terminal typing animation reset
    function resetTypingAnimation() {
      const typewriter = document.querySelector('.typewriter');
      if (typewriter) {
        typewriter.style.animation = 'none';
        setTimeout(() => {
          typewriter.style.animation = 'typing 3.5s steps(40, end), blink 0.75s step-end infinite';
        }, 10);
      }
    }

    // Reset animation when section comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          resetTypingAnimation();
        }
      });
    }, { threshold: 0.5 });

    const webdevSection = document.getElementById('webdev');
    if (webdevSection) {
      observer.observe(webdevSection);
    }
  

  

    // Create Neural Network Background
    function createNeuralNetwork() {
      const container = document.getElementById('neural-network-bg');
      if (!container) return;
      
      container.innerHTML = '';
      
      // Create layers
      const layers = 5;
      const neuronsPerLayer = 8;
      const layerWidth = 100 / (layers + 1);
      
      for (let i = 1; i <= layers; i++) {
        const layer = document.createElement('div');
        layer.className = 'neural-layer';
        layer.style.left = `${i * layerWidth}%`;
        
        for (let j = 0; j < neuronsPerLayer; j++) {
          const neuron = document.createElement('div');
          neuron.className = 'neuron floating-ai';
          neuron.style.animationDelay = `${(i + j) * 0.5}s`;
          layer.appendChild(neuron);
        }
        
        container.appendChild(layer);
      }
      
      // Create connections (simplified for performance)
      if (layers > 1) {
        for (let i = 0; i < layers - 1; i++) {
          const startLayer = document.querySelectorAll('.neural-layer')[i];
          const endLayer = document.querySelectorAll('.neural-layer')[i + 1];
          
          if (startLayer && endLayer) {
            const startNeurons = startLayer.querySelectorAll('.neuron');
            const endNeurons = endLayer.querySelectorAll('.neuron');
            
            // Create a few sample connections for visual effect
            for (let j = 0; j < Math.min(3, startNeurons.length); j++) {
              for (let k = 0; k < Math.min(3, endNeurons.length); k++) {
                const connection = document.createElement('div');
                connection.className = 'connection';
                
                // Position connection between neurons
                const startRect = startNeurons[j].getBoundingClientRect();
                const endRect = endNeurons[k].getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                
                const startX = startRect.left + startRect.width/2 - containerRect.left;
                const startY = startRect.top + startRect.height/2 - containerRect.top;
                const endX = endRect.left + endRect.width/2 - containerRect.left;
                const endY = endRect.top + endRect.height/2 - containerRect.top;
                
                const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
                
                connection.style.width = `${length}px`;
                connection.style.height = '1px';
                connection.style.left = `${startX}px`;
                connection.style.top = `${startY}px`;
                connection.style.transform = `rotate(${angle}deg)`;
                connection.style.opacity = '0.3';
                
                container.appendChild(connection);
              }
            }
          }
        }
      }
    }

    // Create Data Stream Animation
    function createDataStream() {
      const container = document.getElementById('data-stream');
      if (!container) return;
      
      // Clear existing data points
      container.innerHTML = '';
      
      // Create multiple data streams
      for (let i = 0; i < 5; i++) {
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        stream.style.left = `${i * 20}%`;
        stream.style.width = '2px';
        
        // Add data points to stream
        for (let j = 0; j < 20; j++) {
          const dataPoint = document.createElement('div');
          dataPoint.className = 'data-point';
          dataPoint.style.left = '0';
          dataPoint.style.top = `${j * 20}px`;
          dataPoint.style.animationDelay = `${(i + j) * 0.2}s`;
          stream.appendChild(dataPoint);
        }
        
        container.appendChild(stream);
      }
    }

    // Scroll-triggered animations
    function checkScroll() {
      const elements = document.querySelectorAll('.fade-in');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          const delay = element.getAttribute('data-delay') || 0;
          setTimeout(() => {
            element.classList.add('visible');
          }, delay);
        }
      });
    }



    // Initialize on page load
    window.addEventListener('load', () => {
      createNeuralNetwork();
      createDataStream();
      checkScroll();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // AI Chat Simulation
    function simulateAIChat() {
      const chatContainer = document.querySelector('.ai-chat .flex.flex-col');
      if (!chatContainer) return;
      
      // Add more messages to simulate conversation
      setTimeout(() => {
        const newMessage = document.createElement('div');
        newMessage.className = 'chat-message ai';
        newMessage.innerHTML = '<p class="text-sm">I can help with machine learning models, natural language processing, computer vision, and AI integration projects.</p>';
        chatContainer.appendChild(newMessage);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 3000);
    }

    // Initialize AI chat simulation
    setTimeout(simulateAIChat, 1000);
// Simple, Reliable Testimonials Carousel
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing testimonials carousel...');
  
  // Get elements
  const track = document.querySelector('.testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  // Check if elements exist
  if (!track || slides.length === 0) {
    console.error('Carousel elements not found!');
    return;
  }
  
  console.log('Found', slides.length, 'testimonial slides');
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  // Initialize carousel
  updateCarousel();
  
  // Add event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', goToPrevSlide);
    console.log('Previous button event listener added');
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', goToNextSlide);
    console.log('Next button event listener added');
  }
  
  // Add indicator click events
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') goToPrevSlide();
    if (e.key === 'ArrowRight') goToNextSlide();
  });
  
  // Auto-advance carousel
  let autoPlay = setInterval(goToNextSlide, 5000);
  
  // Pause auto-play on hover
  if (track) {
    track.addEventListener('mouseenter', () => {
      clearInterval(autoPlay);
    });
    
    track.addEventListener('mouseleave', () => {
      autoPlay = setInterval(goToNextSlide, 5000);
    });
  }
  
  // Carousel functions
  function goToSlide(slideIndex) {
    console.log('Going to slide:', slideIndex);
    currentSlide = slideIndex;
    updateCarousel();
  }
  
  function goToNextSlide() {
    console.log('Next slide requested');
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }
  
  function goToPrevSlide() {
    console.log('Previous slide requested');
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }
  
  function updateCarousel() {
    console.log('Updating carousel to slide:', currentSlide);
    
    // Update track position
    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      console.log('Track transform applied:', `translateX(-${currentSlide * 100}%)`);
    }
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add('active');
        indicator.style.backgroundColor = '#06b6d4';
      } else {
        indicator.classList.remove('active');
        indicator.style.backgroundColor = '#4b5563';
      }
    });
    
    // Update button states
    if (prevBtn) {
      prevBtn.disabled = currentSlide === 0;
      prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '1';
    }
    
    if (nextBtn) {
      nextBtn.disabled = currentSlide === totalSlides - 1;
      nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.3' : '1';
    }
    
    console.log('Carousel update complete');
  }
  
  // Add some basic animations
  function addSlideAnimations() {
    slides.forEach((slide, index) => {
      slide.style.transition = 'opacity 0.5s ease';
      if (index === currentSlide) {
        slide.style.opacity = '1';
      } else {
        slide.style.opacity = '0';
      }
    });
  }
  
  // Initialize animations
  addSlideAnimations();
  
  // Debug function
  window.debugCarousel = function() {
    console.log('=== CAROUSEL DEBUG INFO ===');
    console.log('Current slide:', currentSlide);
    console.log('Total slides:', totalSlides);
    console.log('Track element:', track);
    console.log('Track transform:', track.style.transform);
    console.log('Slides found:', slides.length);
    console.log('Indicators found:', indicators.length);
    console.log('Prev button:', prevBtn);
    console.log('Next button:', nextBtn);
  };
  
  console.log('Testimonials carousel initialized successfully!');
  
  // Initial debug info
  setTimeout(() => {
    console.log('Carousel ready. Use debugCarousel() for more info.');
  }, 1000);
});

// Fallback: If still not working, try this ultra-simple version
function initUltraSimpleCarousel() {
  const track = document.querySelector('.testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const nextBtn = document.querySelector('.carousel-next');
  const prevBtn = document.querySelector('.carousel-prev');
  
  if (!track || slides.length === 0) return;
  
  let current = 0;
  
  function update() {
    track.style.transform = `translateX(-${current * 100}%)`;
  }
  
  if (nextBtn) nextBtn.onclick = () => { current = (current + 1) % slides.length; update(); };
  if (prevBtn) prevBtn.onclick = () => { current = (current - 1 + slides.length) % slides.length; update(); };
  
  update();
}

// If the main carousel fails, try the ultra-simple version as fallback
setTimeout(() => {
  if (!document.querySelector('.testimonials-track')?.style.transform) {
    console.log('Main carousel failed, initializing fallback...');
    initUltraSimpleCarousel();
  }
}, 2000);