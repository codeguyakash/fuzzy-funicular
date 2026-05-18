const year = document.querySelector("#year");
const revealItems = document.querySelectorAll(".reveal");
const projectGrid = document.querySelector("#project-grid");
const projectApiUrl = "https://raw.githubusercontent.com/codeguyakash/server/main/data.json";
const featuredProjectIds = [1, 3, 5, 6, 7, 8];
const fallbackProjects = [
  {
    projectId: 1,
    title: "Prowtech (Advertisement Management Platform)",
    description:
      "A complete CMS-based solution to manage and run digital advertisement campaigns on mall display screens.",
    sourceCodeLink: "https://github.com/codeguyakash",
    demoLink: "http://prowtech.zenoheal.com",
    color: "#f9f4da",
    skills: ["Angular.js", "Tailwind CSS", "API's", "Figma"],
  },
  {
    projectId: 3,
    title: "Solar By Luminous (Vendor Feedback Dashboard)",
    description:
      "An internal feedback system for Luminous to manage and track behavioral feedback between vendors and employees.",
    sourceCodeLink: "https://github.com/codeguyakash",
    demoLink: "https://vendors.luminousindia.com",
    color: "#f9f4da",
    skills: ["Angular.js", "Tailwind CSS", "API's", "Figma"],
  },
  {
    projectId: 5,
    title: "Image Detect Tool",
    description:
      "A Google Vision API tool for detecting objects and labels in vehicle-related images, improving security and accuracy in weighing workflows.",
    sourceCodeLink: "https://github.com/codeguyakash/image-annotation",
    demoLink: "https://img.codeguyakash.in",
    color: "#77b8bf",
    skills: ["Node.js", "Express.js", "Tailwind CSS", "Google API's", "EJS"],
  },
  {
    projectId: 6,
    title: "Google Docs Adv",
    description:
      "A document editor with text formatting, saving, and sharing features designed around a user-friendly interface.",
    sourceCodeLink: "https://github.com/codeguyakash/google-docs-node",
    demoLink: "https://gdocs.codeguyakash.in",
    color: "#93aa92",
    skills: ["Node.js", "Express.js", "Tailwind CSS", "Google API's", "EJS"],
  },
  {
    projectId: 7,
    title: "Broadmail (Bulk Emails)",
    description:
      "A bulk email platform with Google authentication, responsive UI, CSV uploads, and a full-stack delivery flow.",
    sourceCodeLink: "https://github.com/codeguyakash/broadmail",
    demoLink: "https://broadmail.vercel.app",
    color: "#d98b54",
    skills: ["Node.js", "Express.js", "MongoDB", "JWT", "Next.js", "Nodemailer"],
  },
  {
    projectId: 8,
    title: "URL Shortener",
    description:
      "A responsive URL shortener built with Node.js, Express.js, MongoDB, and Tailwind CSS for easy sharing.",
    sourceCodeLink: "https://github.com/codeguyakash/url-shorten",
    demoLink: "https://u.codeguyakash.in",
    color: "#ed203d",
    skills: ["Node.js", "Express.js", "MongoDB", "HTML", "Tailwind CSS"],
  },
];

year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizeProject(project) {
  return {
    ...project,
    title: project.title.trim(),
    description: project.description.trim(),
    skills: project.skills.map((skill) => skill.trim()),
  };
}

function renderProjects(projects) {
  projectGrid.innerHTML = projects
    .map((project) => {
      const normalized = normalizeProject(project);
      const skills = normalized.skills
        .map((skill) => `<span>${escapeHtml(skill)}</span>`)
        .join("");
      const demoLink =
        normalized.demoLink && normalized.demoLink !== "#"
          ? `<a href="${escapeHtml(normalized.demoLink)}" target="_blank" rel="noreferrer">Live demo</a>`
          : "";

      return `
        <article class="project-card reveal is-visible" style="--project-accent: ${escapeHtml(normalized.color)}">
          <div class="project-copy">
            <div>
              <p>Featured Project</p>
              <h3>${escapeHtml(normalized.title)}</h3>
            </div>
            <p class="project-description">${escapeHtml(normalized.description)}</p>
            <div class="project-skills">${skills}</div>
            <div class="project-links">
              <a href="${escapeHtml(normalized.sourceCodeLink)}" target="_blank" rel="noreferrer">Source</a>
              ${demoLink}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

async function loadProjects() {
  try {
    const response = await fetch(projectApiUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Project API request failed with ${response.status}`);
    }

    const projects = await response.json();
    const featuredProjects = projects.filter((project) => featuredProjectIds.includes(project.projectId));

    renderProjects(featuredProjects);
  } catch (error) {
    renderProjects(fallbackProjects);
  }
}

loadProjects();
