// server.js
// WEB322 Assignment 2 - Al Sad Ornob - 130207236
// Express app with EJS + static public folder
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, "public")));

// ---------- ROUTES ----------

// Home Page
app.get("/", (req, res) => {
  res.render("home", { title: "Home - Climate Solutions" });
});

// About Page
app.get("/about", (req, res) => {
  res.render("about", { title: "About - Climate Solutions" });
});

// Example route for projects by sector
app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;
  if (sector === "energy") {
    res.send("Energy sector projects coming soon!");
  } else if (sector === "transport") {
    res.send("Transport sector projects coming soon!");
  } else {
    res.send(`No projects found for sector: ${sector}`);
  }
});

// 404 Page (Must be last)
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Page Not Found" });
});

// ---------- SERVER START ----------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
