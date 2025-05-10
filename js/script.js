// Import Lenis for smooth scrolling
import Lenis from '@studio-freight/lenis';

// Initialize Lenis smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Theme toggle and mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  let hasInteracted = false;
  let musicInitialized = false;

  // Initialize music player with better state management
  function initMusicPlayer() {
    const desktopMusic = document.getElementById('background-music');
    const desktopToggle = document.getElementById('music-toggle');
    const mobileMusic = document.getElementById('mobile-background-music');
    const mobileToggle = document.getElementById('mobile-music-toggle');
    
    const backgroundMusic = desktopMusic || mobileMusic;
    const musicToggle = desktopToggle || mobileToggle;
    
    if (!backgroundMusic || !musicToggle || musicInitialized) return;
    
    musicInitialized = true;
    
    // Set initial volume
    backgroundMusic.volume = 0.3;
    
    // Play music on first interaction
    function startMusic() {
      if (!hasInteracted) {
        hasInteracted = true;
        backgroundMusic.play().catch(() => {
          console.log('Autoplay prevented');
        });
        updateMusicUI(true);
      }
    }

    // Listen for first scroll or interaction
    window.addEventListener('scroll', startMusic, { once: true });
    document.addEventListener('click', startMusic, { once: true });
    
    function updateMusicUI(playing) {
      document.querySelectorAll('.music-toggle').forEach(toggle => {
        toggle.classList.toggle('playing', playing);
        const playIcon = toggle.querySelector('.bx-play');
        const pauseIcon = toggle.querySelector('.bx-pause');
        if (playIcon && pauseIcon) {
          playIcon.style.display = playing ? 'none' : 'block';
          pauseIcon.style.display = playing ? 'block' : 'none';
        }
      });
    }

    // Music toggle functionality
    document.querySelectorAll('.music-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        if (backgroundMusic.paused) {
          backgroundMusic.play();
          updateMusicUI(true);
        } else {
          backgroundMusic.pause();
          updateMusicUI(false);
        }
      });
    });
  }

  // Initialize preloader
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('hidden');
      setTimeout(() => {
        preloader.style.display = 'none';
        initMusicPlayer();
        initAnimations();
      }, 500);
    });
  }

  // Initialize animations
  function initAnimations() {
    // Hero section animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '0';
      setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }, 200);
    }

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const value = bar.getAttribute('data-value');
          bar.style.width = value;
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));

    // Animate sections on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => scrollObserver.observe(element));
  }

  // Theme toggle functionality
  const themeToggle = document.querySelector("#theme-toggle");
  const themeToggleMobile = document.querySelector("#theme-toggle-mobile");
  const body = document.body;

  function toggleTheme() {
    const newTheme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcons();
  }

  function updateThemeIcons() {
    const isDark = body.getAttribute("data-theme") === "dark";
    document.querySelectorAll('.theme-icon').forEach(icon => {
      icon.classList.toggle('bx-moon', isDark);
      icon.classList.toggle('bx-sun', !isDark);
    });
  }

  // Set initial theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  body.setAttribute("data-theme", savedTheme);
  updateThemeIcons();

  // Theme toggle event listeners
  [themeToggle, themeToggleMobile].forEach(toggle => {
    if (toggle) toggle.addEventListener('click', toggleTheme);
  });

  // Navigation functionality
  const navToggle = document.querySelector('.nav-toggle');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
      navbar.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // Update active nav link on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});