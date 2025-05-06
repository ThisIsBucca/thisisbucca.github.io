// Theme toggle functionality
const themeToggle = document.querySelector("#theme-toggle")
const body = document.body

// Check for saved theme preference or use default
const currentTheme = localStorage.getItem("theme") || "dark"
if (currentTheme === "light") {
  body.setAttribute("data-theme", "light")
  themeToggle.classList.add("active")
}

// Toggle theme with smooth transition
themeToggle.onclick = () => {
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
}

// Toggle icon navbar
const menuIcon = document.querySelector("#menu-icon")
const navbar = document.querySelector(".navbar")

menuIcon.onclick = () => {
  if (Array.from(menuIcon.classList).includes("bx-menu")) {
    menuIcon.classList.remove("bx-menu")
    menuIcon.classList.add("bx-x")
  } else {
    menuIcon.classList.remove("bx-x")
    menuIcon.classList.add("bx-menu")
  }

  navbar.classList.toggle("active")
}

// Scroll sections with smooth reveal animations
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll("header nav a")

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

window.onscroll = () => {
  // Sticky header
  const header = document.querySelector("header")
  header.classList.toggle("sticky", window.scrollY > 300)

  // Reset menu icon when scrolling
  menuIcon.classList.remove("bx-x")
  menuIcon.classList.add("bx-menu")
  navbar.classList.remove("active")

  // Animation footer
  const footer = document.querySelector("footer")
  footer.classList.toggle(
    "show-animate",
    this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight - 100,
  )
}

// Reveal animations on page load
window.addEventListener("load", () => {
  // Add show-animate class to home section on page load
  document.querySelector(".home").classList.add("show-animate")

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

  // Initialize testimonial slider
  initTestimonialSlider()

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
  const navToggle = document.querySelector(".nav-toggle")
  const navbar = document.querySelector(".navbar")
  const navLinks = document.querySelectorAll(".nav-link")
  const header = document.querySelector(".header")

  // Toggle mobile navigation
  navToggle.addEventListener("click", () => {
    navbar.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  // Close mobile navigation when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })

  // Add scrolled class to header on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

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
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Get filter value
      const filterValue = button.getAttribute("data-filter")

      // Filter projects
      projectCards.forEach((card) => {
        if (filterValue === "all") {
          card.style.display = "block"
        } else if (card.getAttribute("data-category") === filterValue) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }

        // Add animation
        setTimeout(() => {
          card.classList.add("animated")
        }, 100)
      })
    })
  })
}

// Testimonial Slider
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll(".testimonial-card")
  const prevBtn = document.querySelector(".testimonial-prev")
  const nextBtn = document.querySelector(".testimonial-next")
  let currentIndex = 0

  // Hide all testimonials except the first one
  testimonials.forEach((testimonial, index) => {
    if (index !== 0) {
      testimonial.style.display = "none"
    }
  })

  // Show next testimonial
  nextBtn.addEventListener("click", () => {
    testimonials[currentIndex].style.display = "none"
    currentIndex = (currentIndex + 1) % testimonials.length
    testimonials[currentIndex].style.display = "block"
  })

  // Show previous testimonial
  prevBtn.addEventListener("click", () => {
    testimonials[currentIndex].style.display = "none"
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
    testimonials[currentIndex].style.display = "block"
  })
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

// Custom Cursor Effects
function initCursorEffects() {
  // Create cursor elements
  const cursor = document.createElement("div")
  cursor.className = "cursor"
  document.body.appendChild(cursor)

  const cursorFollower = document.createElement("div")
  cursorFollower.className = "cursor-follower"
  document.body.appendChild(cursorFollower)

  // Update cursor position on mouse move
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`
    cursor.style.top = `${e.clientY}px`

    // Add a slight delay to the follower for a nice effect
    setTimeout(() => {
      cursorFollower.style.left = `${e.clientX}px`
      cursorFollower.style.top = `${e.clientY}px`
    }, 50)
  })

  // Add hover effect on interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .project-card, .skill-card, .social-link, .filter-btn",
  )

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.border = `2px solid var(--accent-secondary)`
    })

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.border = `2px solid var(--accent-primary)`
    })
  })

  // Hide cursor when leaving the window
  document.addEventListener("mouseout", (e) => {
    if (e.relatedTarget === null) {
      cursor.style.opacity = "0"
      cursorFollower.style.opacity = "0"
    }
  })

  document.addEventListener("mouseover", () => {
    cursor.style.opacity = "0.5"
    cursorFollower.style.opacity = "0.3"
  })
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
