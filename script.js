// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Sample projects data
const projects = [
  {
    title: "AI Code Assistant",
    description:
      "Developed a smart code completion tool using machine learning. Helps developers write better code faster with AI-powered suggestions.",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60",
    tags: ["AI", "Machine Learning", "Programming"],
  },
  {
    title: "Problem Solver Bot",
    description:
      "Created an AI-powered chatbot for solving technical problems. Uses NLP to understand and resolve user queries effectively.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    tags: ["AI", "NLP", "Chatbot"],
  },
  {
    title: "AI Project Generator",
    description:
      "Built an AI system that generates project ideas and solutions. Helps teams kickstart their development process with intelligent suggestions.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    tags: ["AI", "Creative Computing", "Innovation"],
  },
];

// Load projects dynamically
function loadProjects() {
  const projectsContainer = document.getElementById("projectsContainer");

  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";

    projectCard.innerHTML = `
            <img src="${project.image}" alt="${
      project.title
    }" class="project-image">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags
                      .map((tag) => `<span class="tag">${tag}</span>`)
                      .join("")}
                </div>
            </div>
        `;

    projectsContainer.appendChild(projectCard);
  });
}

// Handle contact form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // Add your form submission logic here
  alert("Thank you for your message! I will get back to you soon.");
  this.reset();
});

// Initialize
window.addEventListener("load", () => {
  loadProjects();
});

// Add scroll animation for elements
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Typing effect for hero section
const typedStrings = [
  "AI Generalist",
  "Prompt Engineer",
  "Automation Enthusiast",
  "Creative Prototyper",
  "AI Communicator",
];
let typedIndex = 0,
  charIndex = 0,
  isDeleting = false;
const typedElem = document.getElementById("typed");

function typeLoop() {
  if (!typedElem) return;
  const current = typedStrings[typedIndex];
  if (isDeleting) {
    typedElem.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      typedIndex = (typedIndex + 1) % typedStrings.length;
      setTimeout(typeLoop, 400);
    } else {
      setTimeout(typeLoop, 40);
    }
  } else {
    typedElem.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 900);
    } else {
      setTimeout(typeLoop, 80);
    }
  }
}
typeLoop();

// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// Contact form alert
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for reaching out! I'll get back to you soon.");
  this.reset();
});
