// Main JavaScript file for Eleventy site
// Replaces React functionality with vanilla JS

// ============================================
// Module 1: Smooth Scroll Navigation
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// ============================================
// Module 2: Scroll Spy (Active Nav State)
// ============================================
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove active class from all links
          navLinks.forEach((link) => link.classList.remove("active"));

          // Add active class to current section link
          document
            .querySelector(`nav a[href="#${entry.target.id}"]`)
            ?.classList.add("active");
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "-20% 0px -20% 0px",
    },
  );

  sections.forEach((section) => observer.observe(section));
}

// ============================================
// Module 3: Intersection Observer Animations
// ============================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll("[data-animate]");

  if (animatedElements.length === 0) return;

  // Map of class names to their corresponding animation classes
  const animationClassMap = {
    footer: "footerVisible",
    "skill-set": "skill-set--visible",
    priority: "priorityVisible",
    card: "card--visible",
    links: "linksVisible",
    waveEmoji: "isWaving",
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;

          // Find matching class from map
          const matchedClass = Object.keys(animationClassMap).find((cls) =>
            target.classList.contains(cls),
          );

          // Use matched animation class or fallback to generic
          const className = matchedClass
            ? animationClassMap[matchedClass]
            : "is-visible";

          target.classList.add(className);

          // Unobserve after animation (triggerOnce: true)
          observer.unobserve(target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  animatedElements.forEach((el) => observer.observe(el));
}

// ============================================
// Module 4: ProjectCard Flip State
// ============================================
function initProjectCards() {
  const cards = document.querySelectorAll("[data-flip-card]");

  cards.forEach((card) => {
    // Click handler to toggle flip
    card.addEventListener("click", (e) => {
      // Don't flip if clicking on a link inside the card
      if (e.target.tagName === "A" || e.target.closest("a")) {
        return;
      }

      const currentState = card.dataset.flipped === "true";
      card.dataset.flipped = !currentState;
    });

    // Focus handler for keyboard navigation
    const links = card.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("focus", () => {
        card.dataset.flipped = "true";
      });
    });
  });
}

// ============================================
// Module 5: Device Detection (Mobile vs Desktop)
// ============================================
function isMobile() {
  return window.innerWidth < 768;
}

function updateDeviceText() {
  const elements = document.querySelectorAll("[data-device-text]");
  const text = isMobile() ? "Tap for Details" : "Click for Details";

  elements.forEach((el) => {
    el.textContent = text;
  });
}

// Update on resize
function handleResize() {
  updateDeviceText();
}

// ============================================
// Module 6: CSS Toggle (Debug Utility)
// ============================================
function initCSSToggle() {
  // Only initialize in development mode
  // Check if we're on localhost or a development domain
  const isDev =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.port === "8080";

  if (!isDev) return;

  // Listen for Ctrl+Shift+C to toggle CSS
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "C") {
      const stylesheets = document.querySelectorAll(
        'style, link[rel="stylesheet"]',
      );
      stylesheets.forEach((sheet) => {
        sheet.disabled = !sheet.disabled;
      });
      console.log("CSS toggled");
    }
  });
}

// ============================================
// Initialize All Modules on DOM Ready
// ============================================
function init() {
  initSmoothScroll();
  initScrollSpy();
  initScrollAnimations();
  initProjectCards();
  updateDeviceText();
  initCSSToggle();

  // Add resize listener
  window.addEventListener("resize", handleResize);
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
