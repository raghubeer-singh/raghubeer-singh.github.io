// 1. Portfolio Data Tree (Add as many nested levels as you want)
const portfolioData = {
  id: "root",
  title: "Home",
  cards: [
    {
      badge: "Developer",
      title: "About Me",
      description:
        "Full-stack software engineer passionate about clean architecture and interactive web experiences.",
      hint: "Click to explore bio & background →",
      bg: "linear-gradient(135deg, #13223d, #2a5298)",
      border: "#4facfe",
      image: "assets/cards/about.png",
      children: {
        id: "about",
        title: "Home / About Me",
        cards: [
          {
            badge: "Background",
            title: "My Journey",
            description:
              "Started computer programming with Scratch and love Web Development",
          },
          {
            badge: "Education",
            title: "Data Science and Programming",
            description: "Foundation in Data Science and Programming",
          },
          {
            badge: "Philosophy",
            title: "Clean Code",
            description:
              "Writing maintainable, well-tested software that solves real-world problems efficiently.",
          },
        ],
      },
    },
    {
      badge: "Showcase",
      title: "Projects",
      description:
        "Explore full-stack apps, open-source tools, and system-level builds.",
      hint: "Click to view projects →",
      bg: "linear-gradient(135deg, #551b50, #2c2a98)",
      border: "#4facfe",
      image: "assets/cards/projects.png",
      children: {
        id: "projects",
        title: "Home / Projects",
        cards: [
          {
            badge: "Full-Stack",
            title: "DevFlow SaaS",
            description:
              "Real-time collaborative Kanban and sprint planner built with React, Node.js, and WebSockets.",
            hint: "Click for tech details →",
            children: {
              id: "devflow-details",
              title: "Home / Projects / DevFlow",
              cards: [
                {
                  badge: "Architecture",
                  title: "Tech Stack",
                  description:
                    "TypeScript, React, PostgreSQL, Redis Pub/Sub for instant multi-user board syncing.",
                },
                {
                  badge: "Live Demo",
                  title: "Try It Out",
                  description:
                    "Deployed on AWS ECS with automated CI/CD pipelines via GitHub Actions.",
                  url: "https://github.com",
                },
              ],
            },
          },
          {
            badge: "Systems",
            title: "MiniSQL Engine",
            description:
              "Lightweight relational database engine written from scratch supporting B-Tree indexing.",
            url: "https://github.com",
          },
          {
            badge: "AI / ML",
            title: "CodeReview Bot",
            description:
              "Automated PR analyzer that detects security flaws and suggests performance optimizations.",
            url: "https://github.com",
          },
        ],
      },
    },
    {
      badge: "Arsenal",
      title: "Tech Stack",
      description:
        "Languages, frameworks, and tools I use to bring ideas to production.",
      hint: "Click to inspect skills →",
      bg: "linear-gradient(135deg, #133d27, #078b5b)",
      border: "#4facfe",
      image: "assets/cards/techstack.png",
      children: {
        id: "skills",
        title: "Home / Tech Stack",
        cards: [
          {
            badge: "Languages",
            title: "Core Languages",
            description:
              "JavaScript (ES6+), TypeScript, Python, C++, SQL, and Go.",
          },
          {
            badge: "Frontend",
            title: "UI & Web",
            description:
              "HTML5, CSS3, React, Next.js, Tailwind CSS, and WebGL.",
          },
          {
            badge: "Backend & Cloud",
            title: "Infrastructure",
            description:
              "Node.js, Express, PostgreSQL, MongoDB, Docker, and Linux.",
          },
        ],
      },
    },
    {
      badge: "Connect",
      title: "Contact",
      description:
        "Interested in collaborating or hiring? Let’s start a conversation.",
      hint: "Click to reach out →",
      bg: "linear-gradient(135deg, #13223d, #982a5b)",
      border: "#4facfe",
      image: "assets/cards/contact.png",
      children: {
        id: "contact",
        title: "Home / Contact",
        cards: [
          {
            badge: "GitHub",
            title: "Open Source",
            description:
              "Check out my repositories, contributions, and daily commit streak.",
            url: "https://github.com/raghubeer-singh/",
          },
          {
            badge: "LinkedIn",
            title: "Professional Network",
            description:
              "Connect with me for computer programming roles and tech discussions.",
            url: "https://www.linkedin.com/in/sdewithraghubeer/",
          },
          {
            badge: "Email",
            title: "Direct Message",
            description: "Send an email directly to raghubeer.jsr@gmail.com.",
            url: "mailto:raghubeer.jsr@gmail.com",
          },
        ],
      },
    },
  ],
};

// 2. State Management (Navigation Stack)
let navigationStack = [portfolioData];
let currentIndex = 0;

// DOM Elements
const stage = document.getElementById("carouselStage");
const container = document.getElementById("cardsContainer");
const backBtn = document.getElementById("backBtn");
const breadcrumb = document.getElementById("breadcrumb");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// 3. Render Current Level Cards
function renderLevel() {
  const currentLevel = navigationStack[navigationStack.length - 1];
  const items = currentLevel.cards;

  // Update Top Bar
  breadcrumb.textContent = currentLevel.title;
  if (navigationStack.length > 1) {
    backBtn.classList.remove("hidden");
  } else {
    backBtn.classList.add("hidden");
  }

  // Hide arrows if there is only 1 card in this level
  if (items.length <= 1) {
    prevBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
  }

  // Build Card DOM Elements
  container.innerHTML = "";
  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const cardBg = item.bg || currentLevel.bg;
    const cardBorder = item.border || currentLevel.border;
    if (cardBg) card.style.background = cardBg;
    if (cardBorder) card.style.borderColor = cardBorder;

    const hasAction = Boolean(item.children || item.url);
    if (hasAction) card.classList.add("clickable");

    card.innerHTML = `
      <div class="card-badge">${item.badge}</div>
      <h2>${item.title}</h2>
      ${item.image ? `<img src="${item.image}" alt="${item.title}" class="card-img">` : ""}
      <p>${item.description}</p>
      ${item.hint ? `<div class="action-hint">${item.hint}</div>` : ""}
      ${item.url && !item.hint ? `<div class="action-hint">Click to open link ↗</div>` : ""}
    `;

    // Handle Card Click
    card.addEventListener("click", () => {
      // Bring faint side card to center
      if (card.classList.contains("prev") || card.classList.contains("next")) {
        currentIndex = index;
        updateCarouselClasses();
        return;
      }

      // Open sub-cards or external URL when clicking active card
      if (card.classList.contains("active")) {
        if (item.children) {
          switchLevel(() => {
            navigationStack.push(item.children);
            currentIndex = 0;
          });
        } else if (item.url) {
          window.open(item.url, "_blank");
        }
      }
    });

    container.appendChild(card);
  });

  updateCarouselClasses();
}

// 4. Update Active / Prev / Next Positions
function updateCarouselClasses() {
  const cards = container.querySelectorAll(".card");
  const total = cards.length;
  if (total === 0) return;

  cards.forEach((card, index) => {
    card.classList.remove("active", "prev", "next");

    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    if (index === currentIndex) {
      card.classList.add("active");
    } else if (total > 1 && index === prevIndex) {
      card.classList.add("prev");
    } else if (total > 2 && index === nextIndex) {
      card.classList.add("next");
    } else if (total === 2 && index !== currentIndex) {
      card.classList.add("next");
    }
  });
}

// 5. Smooth Transition Between Levels
function switchLevel(stateChangeCallback) {
  stage.classList.add("switching");
  setTimeout(() => {
    stateChangeCallback();
    renderLevel();
    stage.classList.remove("switching");
  }, 280);
}

// Arrow Navigation
nextBtn.addEventListener("click", () => {
  const total = container.querySelectorAll(".card").length;
  currentIndex = (currentIndex + 1) % total;
  updateCarouselClasses();
});

prevBtn.addEventListener("click", () => {
  const total = container.querySelectorAll(".card").length;
  currentIndex = (currentIndex - 1 + total) % total;
  updateCarouselClasses();
});

// Top Back Button Navigation
backBtn.addEventListener("click", () => {
  if (navigationStack.length > 1) {
    switchLevel(() => {
      navigationStack.pop();
      currentIndex = 0;
    });
  }
});

// Keyboard Support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "Escape" && navigationStack.length > 1) backBtn.click();
});

// Initialize Portfolio
renderLevel();
