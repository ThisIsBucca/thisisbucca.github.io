// Snow Animation
document.addEventListener("DOMContentLoaded", () => {
    // Snow animation configuration
    const snowConfig = {
      container: document.querySelector(".snow-container"),
      count: 50,
      minSpeed: 10,
      maxSpeed: 25,
      minSize: "small",
      maxSize: "large",
      wind: 50,
      turbulence: 40,
    }
  
    // Only initialize if container exists
    if (!snowConfig.container) return
  
    // Snowflake size classes
    const sizes = ["small", "medium", "large"]
  
    // Create snowflakes
    function createSnowflakes() {
      // Clear existing snowflakes
      snowConfig.container.innerHTML = ""
  
      for (let i = 0; i < snowConfig.count; i++) {
        createSnowflake(i)
      }
    }
  
    // Create a single snowflake
    function createSnowflake(i) {
      const snowflake = document.createElement("div")
  
      // Random size
      const sizeIndex = Math.floor(Math.random() * sizes.length)
      const size = sizes[sizeIndex]
  
      // Random position
      const startPositionX = Math.random() * 100 // percentage across the screen
  
      // Random animation duration (speed)
      const speed = Math.random() * (snowConfig.maxSpeed - snowConfig.minSpeed) + snowConfig.minSpeed
  
      // Random horizontal drift
      const wind = (Math.random() - 0.5) * snowConfig.wind
  
      // Random delay
      const delay = Math.random() * 5
  
      // Random turbulence
      const turbulence = Math.random() * snowConfig.turbulence
  
      // Set snowflake properties
      snowflake.className = `snowflake ${size}`
  
      // Add glow effect to some snowflakes
      if (Math.random() > 0.7) {
        snowflake.classList.add("glow")
      }
  
      // Set initial position
      snowflake.style.left = `${startPositionX}%`
      snowflake.style.top = "-10px"
  
      // Set animation properties
      snowflake.style.animationDuration = `${speed}s`
      snowflake.style.animationDelay = `${delay}s`
  
      // Add custom animation with wind and turbulence
      const keyframes = `
        @keyframes snowfall-${i} {
          0% {
            transform: translateY(-10px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(calc(100vh + 10px)) translateX(${wind}px) rotate(360deg);
            opacity: 0;
          }
        }
      `
  
      // Add keyframes to document
      const styleElement = document.createElement("style")
      styleElement.textContent = keyframes
      document.head.appendChild(styleElement)
  
      // Apply custom animation
      snowflake.style.animationName = `snowfall-${i}`
  
      // Add to container
      snowConfig.container.appendChild(snowflake)
    }
  
    // Initialize snow animation
    let snowflakesCreated = false
  
    // Create snowflakes when hero section is visible
    function initSnow() {
      if (!snowflakesCreated) {
        createSnowflakes()
        snowflakesCreated = true
      }
    }
  
    // Initialize snow animation
    initSnow()
  
    // Recreate snowflakes on window resize (with debounce)
    let resizeTimer
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        createSnowflakes()
      }, 250)
    })
  
    // Handle theme changes
    const themeToggle = document.getElementById("theme-toggle")
    const themeToggleMobile = document.getElementById("theme-toggle-mobile")
    ;[themeToggle, themeToggleMobile].forEach((toggle) => {
      if (toggle) {
        toggle.addEventListener("click", () => {
          // Recreate snowflakes with a slight delay to allow theme transition
          setTimeout(createSnowflakes, 300)
        })
      }
    })
  })
  