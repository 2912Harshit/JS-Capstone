// Main entry point for the application
// import { initializeComponents } from "./components.js";
// import { fetchData } from "./api.js";
// import "../css/tailwind.css";
// import "../css/components.css";
// import "../css/utilities.css";

import {
  renderCars,
  renderTours,
  renderAll,
  renderTopCategoryTours,
  renderNews,
  renderHotels,
  renderTestimonials,
} from "./components/index.js";
import { initHeroSlider } from "./features/hero-slider/heroSlider.js";
import { variables } from "./shared/dataVariables.js";
import { createSlider, getVisibleCards } from "./features/slider/slider.js";
import { bookingModalOverlay } from "./features/booking-modal/bookingModalOverlay.js";
import { singUpModalOverlay } from "./features/signup-modal/signUpModalOverlay.js";
import { searchTab } from "./features/search/searchTab.js";
import {
  getAllData,
  getCarsData,
  getHotelsData,
  getNewsData,
  getTestimonialsData,
  getTopCategoryToursData,
  getToursData,
} from "./services/contentService.js";
// Initialize the application
// document.addEventListener("DOMContentLoaded", async () => {
//   console.log("Application initialized");

//   // Initialize components (sliders, tabs, accordions)
//   initializeComponents();

//   // Optionally fetch data
//   // const data = await fetchData('/api/posts');
// });

// help section
document.addEventListener("DOMContentLoaded", () => {
  const helpBtn = document.getElementById("help-btn");
  const modal = document.getElementById("support-modal");
  const closeBtn = document.getElementById("support-close");

  if (!helpBtn || !modal) return;

  function openModal(e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // prevent background scroll
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = ""; // restore scroll
  }

  helpBtn.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal); // ← added ?. for safety

  // Close when clicking the dark backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("menu-icon-open");
  const iconClose = document.getElementById("menu-icon-close");

  if (!menuBtn || !mobileMenu) return;

  function closeMenu() {
    mobileMenu.classList.add("hidden");
    iconOpen?.classList.remove("hidden");
    iconClose?.classList.add("hidden");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    mobileMenu.classList.remove("hidden");
    iconOpen?.classList.add("hidden");
    iconClose?.classList.remove("hidden");
    menuBtn.setAttribute("aria-expanded", "true");
  }

  menuBtn.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    isOpen ? closeMenu() : openMenu();
  });

  // Accordion dropdown toggle
  const dropdownBtns = mobileMenu.querySelectorAll(".mobile-dropdown-btn");

  dropdownBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const arrow = btn.querySelector(".dropdown-arrow");
      const isOpen = !content.classList.contains("hidden");

      // Optional: close other open dropdowns (accordion behavior)
      dropdownBtns.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.nextElementSibling.classList.add("hidden");
          otherBtn
            .querySelector(".dropdown-arrow")
            ?.classList.remove("rotate-180");
        }
      });

      // Toggle current dropdown
      content.classList.toggle("hidden", isOpen);
      arrow?.classList.toggle("rotate-180", !isOpen);
    });
  });

  // Close the menu after tapping a link inside it
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Auto-close if the viewport is resized up to the desktop breakpoint
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024 && !mobileMenu.classList.contains("hidden")) {
      closeMenu();
    }
  });
});

document.addEventListener("DOMContentLoaded", singUpModalOverlay);
document.addEventListener("DOMContentLoaded", bookingModalOverlay);
document.addEventListener("DOMContentLoaded", searchTab);

// ================================
// 🔥 EVENT DELEGATION (KEY FIX)
// ================================
// Attach listener to document (or a stable parent like #cardsContainer)
// This works even if cards are added/removed/re-rendered dynamically

async function getAll() {
  try {
    const section = document.getElementById("all-section");
    if (!section) return;
    await getAllData(section, {});
  } catch (error) {
    console.log(error.message);
  }
}

let daysMinusBtn = document.getElementById("daysMinusBtn");
let daysPlusBtn = document.getElementById("daysPlusBtn");
let nightMinusBtn = document.getElementById("nightMinusBtn");
let nightPlusBtn = document.getElementById("nightPlusBtn");

let daysCount = document.getElementById("daysCount");
let nightCount = document.getElementById("nightCount");

let categories = document.querySelectorAll("#cat_options");
// let duration_days=document.getElementById("duration_days");
// let duration_nights=document.getElementById("duration_nights");
let tourRatings = document.querySelectorAll(".tourRating");
let priceFrom = document.getElementById("ffrom");
let priceTo = document.getElementById("fto");

//searchFilter button
// let searchTours = document.getElementById("searchFilter");

//tour filter buttons
let categoryBtn = document.getElementById("category-btn");
let durationBtn = document.getElementById("duration-btn");
let ratingBtn = document.getElementById("rating-btn");
let priceRangeBtn = document.getElementById("price-range-btn");

let lowSortBtn = document.getElementById("lowSort");
let highSortBtn = document.getElementById("highSort");

let sortBtn = document.querySelectorAll(".sort");
let tourSection = document.getElementById("tourSection");

let tourFilters = {
  category: "all",
  days: 0,
  nights: 0,
  rating: 1,
  priceFrom: 0,
  priceTo: Number.MAX_SAFE_INTEGER,
  sort: 0,
};

//sort event listener
sortBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    sortBtn.forEach((btn) => {
      btn.classList.remove("text-white");
      btn.classList.remove("bg-black");
    });
    btn.classList.add("bg-black");
    btn.classList.add("text-white");
    tourFilters.sort = parseInt(btn.value);
    getTours(tourSection, tourFilters);
  });
});

//searchFilter event listener
// searchTours.addEventListener("click", () => {
//   getTours(tourSection,tourFilters);
// });

//price range event listener
priceFrom.addEventListener("change", () => {
  tourFilters.priceFrom = parseInt(priceFrom.value);
  getTours(tourSection, tourFilters);
  // console.log(tourFilters);
});
priceTo.addEventListener("change", () => {
  tourFilters.priceTo = parseInt(priceTo.value);
  getTours(tourSection, tourFilters);
  // console.log(tourFilters);
});

//rating event listener for each button
tourRatings.forEach((tourRating) => {
  tourRating.addEventListener("click", () => {
    // console.log(tourRating.innerHTML);
    // console.log(ratingBtn.innerText);
    // console.log("rati");
    tourFilters.rating = parseInt(tourRating.value);
    ratingBtn.innerHTML = tourRating.innerHTML;
    getTours(tourSection, tourFilters);
    // console.log(tourFilters);
  });
});

//duration event listeners
daysMinusBtn.addEventListener("click", () => {
  changeCount(daysCount, -1);
  tourFilters.days = parseInt(daysCount.innerText);
  durationBtn.innerText = `${daysCount.innerText} D & ${nightCount.innerText} N`;
  getTours(tourSection, tourFilters);
  // console.log(durationBtn.innerText);
  // console.log(tourFilters);
});
daysPlusBtn.addEventListener("click", () => {
  changeCount(daysCount, 1);
  tourFilters.days = parseInt(daysCount.innerText);
  durationBtn.innerText = `${daysCount.innerText} D & ${nightCount.innerText} N`;
  getTours(tourSection, tourFilters);
  // console.log(tourFilters);
});
nightMinusBtn.addEventListener("click", () => {
  changeCount(nightCount, -1);
  tourFilters.nights = parseInt(nightCount.innerText);
  durationBtn.innerText = `${daysCount.innerText} D & ${nightCount.innerText} N`;
  getTours(tourSection, tourFilters);
  // console.log(tourFilters);
});
nightPlusBtn.addEventListener("click", () => {
  changeCount(nightCount, 1);
  tourFilters.nights = parseInt(nightCount.innerText);
  durationBtn.innerText = `${daysCount.innerText} D & ${nightCount.innerText} N`;
  getTours(tourSection, tourFilters);
  // console.log(tourFilters);
});

//category options
categories.forEach((cat) => {
  cat.addEventListener("click", () => {
    tourFilters.category = cat.value.toLowerCase();
    categoryBtn.innerText = cat.innerText;
    getTours(tourSection, tourFilters);
    // console.log(tourFilters);
  });
});

async function getTours(section, filters = {}) {
  console.log("inside getTours");
  try {
    await getToursData(section, filters);
  } catch (error) {
    toast.error("Cannot get Tours",2000);
    console.log(error.message);
  }
}
getTours(tourSection, tourFilters);

// import { createSlider, getVisibleCards } from "./slider.js";

const slider = document.getElementById("slider");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

const carFilters = {
  brand: new Set(),
};

async function getCars(section, filters = {}) {
  try {
    await getCarsData(section, filters);
    if (section == slider) carSlider.refresh();
  } catch (error) {
    toast.error("Cannot get Cars", 2000);

    console.log(error.message);
  }
}

const carSlider = createSlider({
  slider,

  nextBtn,

  prevBtn,

  getVisibleCards,

  gap: 16,
});

getCars(slider, carFilters);

// carLogos btn
let carLogos = document.querySelectorAll(".car-logo");
// let brandCount=0;

carLogos.forEach((logo) => {
  logo.addEventListener("click", () => {
    logo.classList.toggle("active");
    if (logo.classList.contains("active")) {
      carFilters.brand.add(logo.value);
      // carFilters.brand=logo.value;
      logo.classList.remove("bg-white");
      logo.classList.add("bg-cyan-300", "shadow-2xl", "-translate-y-2");
    } else {
      carFilters.brand.delete(logo.value);
      logo.classList.add("bg-white");
      logo.classList.remove("bg-cyan-300", "shadow-2xl", "-translate-y-2");
    }
    carSlider.setCurrentIndex(0);
    carSlider.refresh();
    getCars(slider, carFilters);
  });
});

let topCategoryToursVM = document.getElementById("top-category-tours-vm");
let topCategoryTourSection = document.getElementById(
  "top-category-tour-section",
);
const topCategoryTourFilter = {
  view: 1,
};
topCategoryToursVM.addEventListener("click", () => {
  if (topCategoryToursVM.dataset.type == 0) {
    topCategoryToursVM.children[0].innerText = "View Less";
    topCategoryTourFilter.view = 0;
    topCategoryToursVM.dataset.type = 1;
  } else {
    topCategoryToursVM.children[0].innerText = "View More";
    topCategoryTourFilter.view = 1;
    topCategoryToursVM.dataset.type = 0;
  }
  getTopCategoryTours();
});

async function getTopCategoryTours() {
  try {
    await getTopCategoryToursData(
      topCategoryTourSection,
      topCategoryTourFilter,
    );
  } catch (error) {
    toast.error("Cannot get Top Category Tours", 2000);

    console.log(error.message);
  }
}
getTopCategoryTours();

let newsVM = document.getElementById("news-vm");
let newsSection = document.getElementById("news-section");
const newsFilter = {
  view: 1,
};
newsVM.addEventListener("click", () => {
  console.log(newsFilter);
  if (newsVM.dataset.type == 0) {
    newsVM.children[0].innerText = "View Less";
    newsFilter.view = 0;
    newsVM.dataset.type = 1;
  } else {
    newsVM.children[0].innerText = "View More";
    newsFilter.view = 1;
    newsVM.dataset.type = 0;
  }
  getNews();
});

async function getNews() {
  try {
    await getNewsData(newsSection, newsFilter);
  } catch (error) {
    toast.error("Cannot get News and Guides", 2000);

    console.log(error.message);
  }
}
getNews();

const hSlider = document.getElementById("hotelSlider");
const hotelPrevBtn = document.getElementById("hotelPrev");
const hotelNextBtn = document.getElementById("hotelNext");

async function getHotels(section, filters = {}) {
  console.log("inside getHotels");
  try {
    await getHotelsData(section, filters);
    if (section == hSlider) hotelSlider.refresh();
  } catch (error) {
    toast.error("Cannot get Hotels", 2000);

    console.log(error.message);
  }
}
console.log(hSlider);
const hotelSlider = createSlider({
  slider: hSlider,
  nextBtn: hotelNextBtn,
  prevBtn: hotelPrevBtn,
  getVisibleCards,
  gap: 16,
});
console.log(hotelSlider);

getHotels(hSlider);

let tSlider = document.getElementById("testimonialSlider");
let testimonialPrev = document.getElementById("testimonialPrev");
let testimonialNext = document.getElementById("testimonialNext");

async function getTestimonials() {
  try {
    await getTestimonialsData(tSlider);
    testimonialSlider.refresh();
  } catch (error) {
    toast.error("Cannot get Testimonials", 2000);

    console.log(error.message);
  }
}
const testimonialSlider = createSlider({
  slider: tSlider,
  nextBtn: testimonialNext,
  prevBtn: testimonialPrev,
  getVisibleCards,
  gap: 16,
});
getTestimonials();

// subscribe form
const form = document.getElementById("subscribeForm");
const toast = document.getElementById("toast");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  toast.classList.remove("opacity-0", "translate-x-30");
  toast.classList.add("opacity-100", "translate-x-0");

  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-x-0");
    toast.classList.add("opacity-0", "translate-x-30");
  }, 3000);

  form.reset();
});

// function hide(e) {
//   e.parentElement.children[0].classList.toggle("hidden");
//   e.parentElement.children[1].classList.toggle("hidden");
// }
// window.hide = hide;

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("./sw.js")
//       .then(() => console.log("Service Worker Registered"))
//       .catch(console.error);
//   });
// }

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".heart-btn");
  if (!btn) return;

  btn.querySelector(".heart").classList.toggle("hidden"); // white heart
  btn.querySelector(".red-heart").classList.toggle("hidden"); // red heart
});

document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
});


