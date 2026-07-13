// Main entry point for the application
// import { initializeComponents } from "./components.js";
// import { fetchData } from "./api.js";
// import "../css/tailwind.css";
// import "../css/components.css";
// import "../css/utilities.css";

import { renderCars, renderTours } from "./components.js";

// Initialize the application
// document.addEventListener("DOMContentLoaded", async () => {
//   console.log("Application initialized");

//   // Initialize components (sliders, tabs, accordions)
//   initializeComponents();

//   // Optionally fetch data
//   // const data = await fetchData('/api/posts');
// });

(function () {
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
})();

// sliding indicator
const tabs = document.querySelectorAll(".tab");
const indicator = document.getElementById("indicator");

function moveIndicator(button) {
  indicator.style.width = button.offsetWidth + "px";

  indicator.style.height = button.offsetHeight + "px";

  indicator.style.left = button.offsetLeft + "px";

  indicator.style.top = button.offsetTop + "px";
}

moveIndicator(tabs[0]);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    moveIndicator(tab);
    tabs.forEach((tab) => {
      tab.classList.remove("text-amber-300");
      tab.classList.add("text-gray-500");
    });
    tab.classList.add("text-amber-300");
    tab.classList.remove("text-gray-500");
  });
});

let locationOptions = document.querySelectorAll(".location-option");
let locationText = document.getElementById("location-text");
let locationBtn = document.getElementById("location-btn");
let locationMenu = document.getElementById("location-menu");

locationBtn.addEventListener("click", () =>
  locationMenu.classList.toggle("hidden"),
);
locationOptions.forEach((location) => {
  location.addEventListener("click", () => {
    locationOptions.forEach((loc) => {
      loc.classList.remove("bg-black", "text-white");
    });
    location.classList.add("bg-black", "text-white");
    locationText.innerText = location.innerText;
    // console.log("yuhu");
  });
});

let guestBtn = document.getElementById("guestBtn");
let guestMenu = document.getElementById("guestMenu");

guestBtn.addEventListener("click", () => {
  guestMenu.classList.toggle("hidden");
});

let adultMinusBtn = document.getElementById("adultMinusBtn");
let adultPlusBtn = document.getElementById("adultPlusBtn");
let adultCountSpan = document.getElementById("adultCount");

let childMinusBtn = document.getElementById("childMinusBtn");
let childPlusBtn = document.getElementById("childPlusBtn");
let childCountSpan = document.getElementById("childCount");

let guestText = document.getElementById("guestText");

adultMinusBtn.addEventListener("click", () => {
  changeCount(adultCountSpan, -1);
  guestText.innerText = `${adultCountSpan.innerText} Adults, ${childCountSpan.innerText} Children`;
});
adultPlusBtn.addEventListener("click", () => {
  changeCount(adultCountSpan, 1);
  guestText.innerText = `${adultCountSpan.innerText} Adults, ${childCountSpan.innerText} Children`;
});
childMinusBtn.addEventListener("click", () => {
  changeCount(childCountSpan, -1);
  guestText.innerText = `${adultCountSpan.innerText} Adults, ${childCountSpan.innerText} Children`;
});
childPlusBtn.addEventListener("click", () => {
  changeCount(childCountSpan, 1);
  guestText.innerText = `${adultCountSpan.innerText} Adults, ${childCountSpan.innerText} Children`;
});

function changeCount(countSpan, delta) {
  // console.log("hey");
  let currentCount = parseInt(countSpan.innerText);
  let newCount = currentCount + delta;
  if (newCount < 0) {
    newCount = 0;
  }
  countSpan.innerText = newCount;
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
let searchFilter = document.getElementById("searchFilter");

//tour filter buttons
let categoryBtn = document.getElementById("category-btn");
let durationBtn = document.getElementById("duration-btn");
let ratingBtn = document.getElementById("rating-btn");
let priceRangeBtn = document.getElementById("price-range-btn");

let lowSortBtn = document.getElementById("lowSort");
let highSortBtn = document.getElementById("highSort");

let sortBtn = document.querySelectorAll(".sort");

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
  });
});

//searchFilter event listener
searchFilter.addEventListener("click", () => {
  getTours();
});

//price range event listener
priceFrom.addEventListener("change", () => {
  tourFilters.priceFrom = parseInt(priceFrom.value);
  // console.log(tourFilters);
});
priceTo.addEventListener("change", () => {
  tourFilters.priceTo = parseInt(priceTo.value);
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
    // console.log(tourFilters);
  });
});

//duration event listeners
daysMinusBtn.addEventListener("click", () => {
  changeCount(daysCount, -1);
  tourFilters.days = parseInt(daysCount.innerText);
  durationBtn.innerText = `${daysCount.innerText} D & ${nightCount.innerText} N`;
  // console.log(durationBtn.innerText);
  // console.log(tourFilters);
});
daysPlusBtn.addEventListener("click", () => {
  changeCount(daysCount, 1);
  tourFilters.days = parseInt(daysCount.innerText);
  durationBtn.innerText = `${daysCount.innerText} D & ${nightCount.innerText} N`;
  // console.log(tourFilters);
});
nightMinusBtn.addEventListener("click", () => {
  changeCount(nightCount, -1);
  tourFilters.nights = parseInt(nightCount.innerText);
  durationBtn.innerText = `${daysCount.innerText} D & ${nightCount.innerText} N`;
  // console.log(tourFilters);
});
nightPlusBtn.addEventListener("click", () => {
  changeCount(nightCount, 1);
  tourFilters.nights = parseInt(nightCount.innerText);
  durationBtn.innerText = `${daysCount.innerText} D & ${nightCount.innerText} N`;
  // console.log(tourFilters);
});

//category options
categories.forEach((cat) => {
  cat.addEventListener("click", () => {
    tourFilters.category = cat.value.toLowerCase();
    categoryBtn.innerText = cat.innerText;
    // console.log(tourFilters);
  });
});


let tourSection = document.getElementById("tourSection");

async function getTours() {
  try {
    // console.log("entered");
    const response = await fetch("./src/data/tour_cards.json");
    if (!response.ok) {
      throw new Error("Failed to load tours");
    }
    const tours = await response.json();
    // console.log(tours);
    renderTours(tourSection, tours, tourFilters);
  } catch (error) {
    console.log(error.message);
  }
}
getTours();

let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");
let slider = document.getElementById("slider");

let currentIndex = 0;

// Matches the card widths in carCard(): 1 card on mobile, 2 on tablet, 3 on laptop+
function getVisibleCards() {
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}
let maxIndex = slider.children.length - getVisibleCards();
const gap = 16;

const carFilters = {
  brand: new Set(),
};
async function getCars() {
  try {
    // console.log("entered");
    const response = await fetch("./src/data/cars_cards.json");
    if (!response.ok) {
      throw new Error("Failed to load cars");
    }
    const cars = await response.json();
    // console.log(cars);
    renderCars(slider, cars, carFilters);
    // updateSlider();
  } catch (error) {
    console.log(error.message);
  }
}
getCars();

// carousel slider

function updateSlider() {
  const card = slider.children[0];
  const move = card.offsetWidth + gap;
  maxIndex = slider.children.length - getVisibleCards();

  slider.style.transform = `translateX(-${currentIndex * move}px)`;
}

function handleNavBtn() {
  if (currentIndex == maxIndex) {
    nextBtn.classList.remove("bg-gray-300");
    // nextBtn.classList.remove("text-white");
  }
  if (currentIndex > 0) {
    prevBtn.classList.add("bg-gray-300");
    // prevBtn.classList.add("text-white");
  }
  if (currentIndex == 0) {
    prevBtn.classList.remove("bg-gray-300");
    // prevBtn.classList.remove("text-white");
  }
  if (currentIndex < maxIndex) {
    nextBtn.classList.add("bg-gray-300");
    // nextBtn.classList.add("text-white");
  }
}

nextBtn.addEventListener("click", () => {
  updateSlider();
  if (currentIndex >= maxIndex) return;
  currentIndex++;
  handleNavBtn();
  // console.log(slider.children.length);
  slider.style.transform = `translateX(-${currentIndex * (slider.children[0].offsetWidth + gap)}px)`;
});
prevBtn.addEventListener("click", () => {
  updateSlider();
  if (currentIndex == 0) return;
  currentIndex--;
  handleNavBtn();
  slider.style.transform = `translateX(-${currentIndex * (slider.children[0].offsetWidth + gap)}px)`;
});

// keep the slider in a valid position if the viewport crosses a breakpoint
// (mobile shows 1 card, tablet 2, laptop+ 3 - see getVisibleCards())
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    maxIndex = slider.children.length - getVisibleCards();
    if (currentIndex > maxIndex) {
      currentIndex = Math.max(0, maxIndex);
    }
    updateSlider();
    handleNavBtn();
    moveIndicator(tabs[0]);
  }, 150);
});

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
    currentIndex = 0;
    updateSlider();
    handleNavBtn();
    getCars();
  });
});
