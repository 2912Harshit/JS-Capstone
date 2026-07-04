// Main entry point for the application
import { initializeComponents } from "./components.js";
import { fetchData } from "./api.js";
import "../css/tailwind.css";
import "../css/components.css";
import "../css/utilities.css";

// Initialize the application
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Application initialized");

  // Initialize components (sliders, tabs, accordions)
  initializeComponents();

  // Optionally fetch data
  // const data = await fetchData('/api/posts');
});
