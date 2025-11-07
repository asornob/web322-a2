/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Al Sad Ornob   Student ID: 130207236   Date: 06-11-2025
*
*  Published URL: ___________________________________________________________
*
********************************************************************************/

// ====== EXPRESS SERVER SETUP ======

const express = require("express");
const path = require("path");
const app = express();

// 1. Set EJS as view engine
app.set("view engine", "ejs");

// 2. Serve static files
app.use(express.static("public"));

// ====== ROUTES ======

// Home Page
app.get("/", (req, res) => {
  res.render("home");
});

// About Page
app.get("/about", (req, res) => {
  res.render("about");
});

// ====== DYNAMIC PROJECT DATA ======
const fakeProjects = [
  {
    id: 1,
    title: "Abandoned Farmland Restoration",
    sector: "Agriculture",
    summary_short: "Rehabilitating unused land.",
    intro_short: "Restoring degraded land to productive farms.",
    impact: "Improves soil health and food security.",
    feature_img_url: "https://placehold.co/600x400",
    original_source_url: "https://example.com"
  },
  {
    id: 2,
    title: "Alternative Cement",
    sector: "Industry",
    summary_short: "Reducing CO₂ in cement.",
    intro_short: "Using eco-friendly materials in cement production.",
    impact: "Lowers carbon footprint of construction.",
    feature_img_url: "https://placehold.co/600x400",
    original_source_url: "https://example.com"
  },
  {
    id: 3,
    title: "Solar Transport Initiative",
    sector: "Transportation",
    summary_short: "Introducing solar-powered buses.",
    intro_short: "Harnessing renewable energy for public transport.",
    impact: "Cuts fuel consumption and emissions.",
    feature_img_url: "https://placehold.co/600x400",
    original_source_url: "https://example.com"
  }
];

// ====== /solutions/projects (with optional sector filter) ======
app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;
  let filtered = fakeProjects;

  if (sector) {
    filtered = fakeProjects.filter(
      (p) => p.sector.toLowerCase() === sector.toLowerCase()
    );
    if (filtered.length === 0) {
      return res
        .status(404)
        .render("404", { message: `No projects found for sector: ${sector}` });
    }
  }

  res.render("projects", { projects: filtered });
});

// ====== /solutions/projects/:id (dynamic single project) ======
app.get("/solutions/projects/:id", (req, res) => {
  const project = fakeProjects.find((p) => p.id == req.params.id);
  if (!project)
    return res.status(404).render("404", { message: "Project not found" });
  res.render("project", { project });
});

// ====== 404 PAGE (Default handler) ======
app.use((req, res) => {
  res
    .status(404)
    .render("404", { message: "Sorry, we couldn’t find what you’re looking for." });
});

// ====== START SERVER ======
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
