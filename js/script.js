// Theme toggle and mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.querySelector('.preloader');
  
  // Hide preloader when page is fully loaded
  window.addEventListener('load', function() {
    if (preloader) {
      preloader.style.display = 'none';
    }
    
    // Animate skill bars after a delay
    const skillBars = document.querySelectorAll(".skills-content .progress .bar span");
    if (skillBars) {
      skillBars.forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') || '100%';
      });
    }
  });

  // Initialize music player with wave animation and better state management
  function initMusicPlayer() {
    // Get both desktop and mobile elements
    const desktopMusic = document.getElementById('background-music');
    const desktopToggle = document.getElementById('music-toggle');
    const desktopPlayer = document.querySelector('.hero-music-player');
    
    const mobileMusic = document.getElementById('mobile-background-music');
    const mobileToggle = document.getElementById('mobile-music-toggle');
    const mobilePlayer = document.querySelector('.mobile-music-player');
    
    // Use whichever player is available
    const backgroundMusic = desktopMusic || mobileMusic;
    const musicToggle = desktopToggle || mobileToggle;
    
    if (!backgroundMusic || !musicToggle) {
      console.log('Music player elements not found');
      return;
    }
    
    // Get all play and pause icons
    const playIcons = document.querySelectorAll('.music-toggle .bx-play');
    const pauseIcons = document.querySelectorAll('.music-toggle .bx-pause');
    
    // Set initial state from localStorage or default to false
    let isPlaying = localStorage.getItem('musicPlaying') === 'true';
    
    // Function to update UI based on playback state
    const updateUI = (playing) => {
      // Update all toggle buttons
      const toggles = document.querySelectorAll('.music-toggle');
      toggles.forEach(toggle => {
        const playIcon = toggle.querySelector('.bx-play');
        const pauseIcon = toggle.querySelector('.bx-pause');
        
        if (playing) {
          toggle.classList.add('playing');
          toggle.setAttribute('aria-label', 'Pause background music');
          if (playIcon) playIcon.style.display = 'none';
          if (pauseIcon) pauseIcon.style.display = 'block';
        } else {
          toggle.classList.remove('playing');
          toggle.setAttribute('aria-label', 'Play background music');
          if (playIcon) playIcon.style.display = 'block';
          if (pauseIcon) pauseIcon.style.display = 'none';
        }
      });
    };
    
    // Function to handle play
    const playMusic = () => {
      // Play both audio elements if they exist
      const audioElements = [desktopMusic, mobileMusic].filter(Boolean);
      const playPromises = audioElements.map(audio => {
        if (audio.paused) {
          return audio.play().catch(e => {
            console.error('Playback failed for one player:', e);
            return Promise.reject(e);
          });
        }
        return Promise.resolve();
      });
      
      Promise.all(playPromises)
        .then(() => {
          isPlaying = true;
          localStorage.setItem('musicPlaying', 'true');
          updateUI(true);
        })
        .catch(error => {
          console.error('Playback failed:', error);
          isPlaying = false;
          updateUI(false);
        });
    };

    // Function to handle pause
    const pauseMusic = () => {
      // Pause both audio elements if they exist
      [desktopMusic, mobileMusic].forEach(audio => {
        if (audio && !audio.paused) audio.pause();
      });
      isPlaying = false;
      localStorage.setItem('musicPlaying', 'false');
      updateUI(false);
    };
    
    // Function to toggle play/pause
    const togglePlayPause = () => {
      if (backgroundMusic.paused) {
        playMusic();
      } else {
        pauseMusic();
      }
    };

    // Show the music players if they exist
    if (desktopPlayer) {
      desktopPlayer.style.opacity = '1';
      desktopPlayer.style.visibility = 'visible';
    }
    
    if (mobilePlayer) {
      mobilePlayer.style.opacity = '1';
      mobilePlayer.style.visibility = 'visible';
    }
    
    // Set initial volume and update UI
    backgroundMusic.volume = 0.5;
    
    // Initialize UI based on stored state
    if (isPlaying) {
      playMusic();
    } else {
      updateUI(false);
    }
    
    // Set up event listeners for all music toggle buttons
    document.querySelectorAll('.music-toggle').forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        togglePlayPause();
      });
    });
    
    // Update UI when music state changes for any audio element
    [desktopMusic, mobileMusic].forEach(audio => {
      if (audio) {
        audio.addEventListener('play', () => updateUI(true));
        audio.addEventListener('pause', () => updateUI(false));
        audio.addEventListener('ended', () => updateUI(false));
      }
    });
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (!backgroundMusic.paused) {
          backgroundMusic.pause();
        }
      } else if (isPlaying) {
        playMusic().catch(e => console.log('Playback failed:', e));
      }
    });
    
    // Add mobile-specific handling
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // Add mobile-specific classes or behaviors here
      document.body.classList.add('is-mobile');
    }
  }
  
  // Initialize music player
  initMusicPlayer();
  
  // Theme and UI elements initialization
  const themeToggle = document.querySelector("#theme-toggle");
  const themeToggleMobile = document.querySelector("#theme-toggle-mobile");
  const body = document.body;
  const menuIcon = document.querySelector(".menu-icon");
  const menuIconElement = menuIcon ? menuIcon.querySelector("i") : null;
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  
  // Toggle mobile menu
  function toggleMenu() {
    if (navbar) {
      navbar.classList.toggle('active');
      if (menuIconElement) {
        if (navbar.classList.contains('active')) {
          menuIconElement.classList.remove('bx-menu');
          menuIconElement.classList.add('bx-x');
        } else {
          menuIconElement.classList.remove('bx-x');
          menuIconElement.classList.add('bx-menu');
        }
      }
    }
  }
  
  // Close mobile menu when clicking a link
  function closeMenu() {
    if (navbar) navbar.classList.remove('active');
    if (menuIconElement) {
      menuIconElement.classList.remove('bx-x');
      menuIconElement.classList.add('bx-menu');
    }
  }
  
  // Add event listeners for mobile menu
  if (menuIcon) {
    menuIcon.addEventListener('click', toggleMenu);
  }
  
  if (navLinks && navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
  
  // Scroll event for header
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
      header.classList.toggle('sticky', window.scrollY > 0);
    }
  });
  
  // Set initial theme from localStorage or default to dark
  const currentTheme = localStorage.getItem("theme") || "dark";
  body.setAttribute("data-theme", currentTheme);

  // Update theme toggle icons based on current theme
  const updateThemeIcons = () => {
    const isDark = body.getAttribute("data-theme") === "dark";
    document.querySelectorAll('.theme-icon').forEach(icon => {
      // Always set both classes and let CSS handle visibility with opacity
      icon.classList.add('bx', 'theme-icon');
      if (isDark) {
        icon.classList.add('bx-moon');
        icon.classList.remove('bx-sun');
      } else {
        icon.classList.add('bx-sun');
        icon.classList.remove('bx-moon');
      }
    });
  };

  // Toggle theme function
  const toggleTheme = (e) => {
    if (e) e.preventDefault();
    
    // Toggle theme
    const newTheme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    
    updateThemeIcons();
  };

  // Initialize theme icons
  updateThemeIcons();

  // Event Listeners for theme toggles
  [themeToggle, themeToggleMobile].forEach(toggle => {
    if (toggle) {
      toggle.addEventListener('click', toggleTheme);
    }
  });
  
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
  }

  // Close menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar && navbar.classList.contains('active')) {
      closeMenu();
    }
  });

  // Prevent clicks inside navbar from closing it
  if (navbar) {
    navbar.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
});

// Scroll sections with smooth reveal animations
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-animate")

        // Update active nav link
        const id = entry.target.getAttribute("id")
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href").substring(1) === id) {
            link.classList.add("active")
          }
        })
      }
    })
  },
  { threshold: 0.3 },
)

// Observe all sections
sections.forEach((section) => {
  observer.observe(section)
})

// Initialize menu elements
const menuIcon = document.querySelector('.menu-icon');
const menuIconElement = document.querySelector('.menu-icon i');
const navbar = document.querySelector('.navbar');

// Improved scroll handler with null checks
window.onscroll = function() {
  // Sticky header
  const header = document.querySelector("header");
  if (header) {
    header.classList.toggle("sticky", window.scrollY > 300);
  }

  // Menu handling
  if (menuIcon && menuIconElement && navbar) {
    menuIconElement.classList.remove("bx-x");
    menuIconElement.classList.add("bx-menu");
    navbar.classList.remove("active");
  }

  // Animation footer
  const footer = document.querySelector("footer");
  if (footer) {
    footer.classList.toggle(
      "show-animate",
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
    );
  }
};

// Reveal animations on page load
window.addEventListener("load", () => {
  // Add show-animate class to home section on page load
  const homeSection = document.querySelector(".home");
  if (homeSection) {
    homeSection.classList.add("show-animate");
  }

  // Animate skill bars after a delay
  setTimeout(() => {
    const skillBars = document.querySelectorAll(".skills-content .progress .bar span")
    skillBars.forEach((bar) => {
      bar.style.width = bar.style.width
    })
  }, 1000)
})

// Add hover effect to navbar links
const navbarLinks = document.querySelectorAll(".navbar a")
navbarLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    if (!link.classList.contains("active")) {
      link.style.transform = "translateY(-3px)"
      setTimeout(() => {
        link.style.transform = "translateY(0)"
      }, 200)
    }
  })
})

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      })
    }
  })
})

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme
  initTheme()

  // Initialize navigation
  initNavigation()

  // Initialize scroll animations
  initScrollAnimations()

  // Initialize skill progress bars
  initSkillBars()

  // Initialize project filtering
  initProjectFilter()

  // Initialize form validation
  initFormValidation()

  // Initialize cursor effects
  initCursorEffects()

  // Initialize parallax effects
  initParallaxEffects()
})

// Theme Toggle Functionality
function initTheme() {
  const themeToggle = document.querySelector(".theme-toggle")
  const body = document.body

  // Check for saved theme preference
  const currentTheme = localStorage.getItem("theme") || "dark"
  if (currentTheme === "light") {
    body.setAttribute("data-theme", "light")
    themeToggle.classList.add("active")
  }

  // Toggle theme on click
  themeToggle.addEventListener("click", () => {
    themeToggle.classList.toggle("active")

    // Add transition class for smooth color changes
    body.classList.add("theme-transition")

    // Toggle theme
    if (themeToggle.classList.contains("active")) {
      body.setAttribute("data-theme", "light")
      localStorage.setItem("theme", "light")
    } else {
      body.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
    }

    // Remove transition class after transition completes
    setTimeout(() => {
      body.classList.remove("theme-transition")
    }, 500)
  })
}

// Navigation Functionality
function initNavigation() {
  const navToggle = document.querySelector(".menu-icon") || document.querySelector(".nav-toggle");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.querySelector("header");
  
  // If no navigation elements found, exit gracefully
  if (!navToggle || !navbar) {
    return;
  }

  // Toggle mobile navigation
  if (navToggle) {
    navToggle.addEventListener("click", (e) => {
      e.preventDefault();
      if (navbar) {
        navbar.classList.toggle("active");
        const icon = navToggle.querySelector('i');
        if (icon) {
          if (navbar.classList.contains("active")) {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
          } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
          }
        }
      }
    });
  }

  // Close mobile navigation when clicking a link
  if (navLinks && navLinks.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbar) navbar.classList.remove("active");
        const icon = navToggle?.querySelector('i');
        if (icon) {
          icon.classList.remove('bx-x');
          icon.classList.add('bx-menu');
        }
      });
    });
  }

  // Add scrolled class to header on scroll
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = header.offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Update active nav link on scroll
  window.addEventListener("scroll", () => {
    let current = ""

    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// Initialize Skill Progress Bars
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress-bar")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const value = progressBar.getAttribute("data-value")
          progressBar.style.width = value
          observer.unobserve(progressBar)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => {
    observer.observe(bar)
  })
}

// Project Filtering
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Form Validation
function initFormValidation() {
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form inputs
      const nameInput = document.getElementById("name")
      const emailInput = document.getElementById("email")
      const subjectInput = document.getElementById("subject")
      const messageInput = document.getElementById("message")

      // Validate inputs
      let isValid = true

      if (nameInput.value.trim() === "") {
        showError(nameInput, "Name is required")
        isValid = false
      } else {
        removeError(nameInput)
      }

      if (emailInput.value.trim() === "") {
        showError(emailInput, "Email is required")
        isValid = false
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email")
        isValid = false
      } else {
        removeError(emailInput)
      }

      if (subjectInput.value.trim() === "") {
        showError(subjectInput, "Subject is required")
        isValid = false
      } else {
        removeError(subjectInput)
      }

      if (messageInput.value.trim() === "") {
        showError(messageInput, "Message is required")
        isValid = false
      } else {
        removeError(messageInput)
      }

      // If form is valid, submit it
      if (isValid) {
        // Here you would normally send the form data to a server
        // For now, we'll just show a success message
        const formButton = contactForm.querySelector(".form-button")
        const originalText = formButton.textContent

        formButton.textContent = "Sending..."
        formButton.disabled = true

        setTimeout(() => {
          contactForm.reset()
          formButton.textContent = "Message Sent!"

          setTimeout(() => {
            formButton.textContent = originalText
            formButton.disabled = false
          }, 2000)
        }, 1500)
      }
    })
  }

  // Helper functions for form validation
  function showError(input, message) {
    const formGroup = input.parentElement
    const errorElement = formGroup.querySelector(".error-message") || document.createElement("div")

    errorElement.className = "error-message"
    errorElement.textContent = message

    if (!formGroup.querySelector(".error-message")) {
      formGroup.appendChild(errorElement)
    }

    input.classList.add("error")
  }

  function removeError(input) {
    const formGroup = input.parentElement
    const errorElement = formGroup.querySelector(".error-message")

    if (errorElement) {
      formGroup.removeChild(errorElement)
    }

    input.classList.remove("error")
  }

  function isValidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
}


// Parallax Effects
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll(".parallax")

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY

    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.1
      element.style.transform = `translateY(${scrollY * speed}px)`
    })
  })
}

// Typing Animation for Hero Section
function initTypingAnimation() {
  const typingElement = document.querySelector(".typing-text")

  if (typingElement) {
    const words = JSON.parse(typingElement.getAttribute("data-words"))
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typeSpeed = 100

    function type() {
      const currentWord = words[wordIndex]

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1)
        charIndex--
        typeSpeed = 50
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1)
        charIndex++
        typeSpeed = 100
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true
        typeSpeed = 1000 // Pause at the end of the word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
      }

      setTimeout(type, typeSpeed)
    }

    // Start typing animation
    setTimeout(type, 1000)
  }
}

// Initialize typing animation
initTypingAnimation()
