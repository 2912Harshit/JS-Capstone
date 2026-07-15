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
} from "./components.js";

import { createSlider, getVisibleCards } from "./slider.js";
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

let cars;
let tours;
let allData;
let hotels;

const overlay = document.getElementById("bookingOverlay");
const formView = document.getElementById("bookingFormView");
const successView = document.getElementById("successView");
const bookingForm = document.getElementById("bookingForm");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeSuccessBtn = document.getElementById("closeSuccessBtn");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalBadge = document.getElementById("modalBadge");
const infoBar = document.getElementById("infoBar");
const typeSpecificFields = document.getElementById("typeSpecificFields");
const guestsWrapper = document.getElementById("guestsWrapper");
const totalPriceEl = document.getElementById("totalPrice");

let currentCardData = {};

const badgeColors = {
  allSearch: "bg-blue-500/80",
  car: "bg-purple-500/80",
  tour: "bg-orange-500/80",
  hotel: "bg-emerald-500/80",
};

// ================================
// 🔥 EVENT DELEGATION (KEY FIX)
// ================================
// Attach listener to document (or a stable parent like #cardsContainer)
// This works even if cards are added/removed/re-rendered dynamically
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".book-now-btn");
  if (btn) {
    e.preventDefault();
    currentCardData;
    const { id, type } = btn.dataset;
    if (type == "car") {
      currentCardData = cars.find((item) => item.id == id);
    } else if (type == "tour") {
      currentCardData = tours.find((item) => item.id == id);
    } else if (type == "allSearch") {
      currentCardData = allData.find((item) => item.id == id);
    } else if (type == "hotel") {
      currentCardData = hotels.find((item) => item.id == id);
    }
    console.log(currentCardData);
    openModal(currentCardData, type);
  }
});

function openModal(data, type) {
  overlay.classList.remove("hidden");
  overlay.classList.add("flex");
  formView.classList.remove("hidden");
  successView.classList.add("hidden");
  bookingForm.reset();

  modalImage.src = data.image;
  modalTitle.textContent = data.title;
  modalBadge.textContent = type.toUpperCase();
  modalBadge.className = `text-xs font-semibold px-2 py-1 rounded-full ${badgeColors[type]}`;

  infoBar.innerHTML = "";
  typeSpecificFields.innerHTML = "";
  guestsWrapper.classList.add("hidden");

  document.body.style.overflow = "hidden"; // 🔒 lock background scroll
  document.body.style.position = "fixed"; // extra safety for iOS
  document.body.style.width = "100%";

  if (type === "allSearch") {
    renderTourFields(data, type);
  } else if (type === "car") {
    renderCarFields(data, type);
  } else if (type === "tour" || type === "hotel") {
    renderAdventureFields(data, type);
  }

  calculateTotal();
}

// ---------- TOUR FIELDS ----------
function renderTourFields(data, type) {
  infoBar.innerHTML = `
    <span><i class="fa-solid fa-location-dot text-blue-500"></i> ${data.location}</span>
    <span><i class="fa-solid fa-tag text-blue-500"></i> $${data.price}/person</span>
  `;
  guestsWrapper.classList.remove("hidden");

  typeSpecificFields.innerHTML = `
    <h3 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
      <i class="fa-solid fa-calendar text-blue-600"></i> Tour Dates
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
        <input type="date" id="checkIn" value="${data.checkIn}" required
          class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
        <input type="date" id="checkOut" value="${data.checkOut}" required
          class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
    </div>
  `;

  // These are fine to attach directly since they're inside the modal
  // (modal content isn't re-rendered by your data fetching, only cards are)
  document.getElementById("adults").addEventListener("input", () => {
    calculateTotal(type);
  });
  document.getElementById("children").addEventListener("input", () => {
    calculateTotal(type);
  });
}

// ---------- CAR FIELDS ----------
function renderCarFields(data, type) {
  infoBar.innerHTML = `
    <span><i class="fa-solid fa-location-dot text-purple-500"></i> ${data.location}</span>
    <span><i class="fa-solid fa-gas-pump text-purple-500"></i> ${data.fuel}</span>
    <span><i class="fa-solid fa-gear text-purple-500"></i> ${data.transmission}</span>
    <span><i class="fa-solid fa-user text-purple-500"></i> ${data.seats} seats</span>
  `;

  typeSpecificFields.innerHTML = `
    <h3 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
      <i class="fa-solid fa-calendar text-purple-600"></i> Rental Period
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
        <input type="date" id="pickupDate" required
          class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
        <input type="date" id="returnDate" required
          class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500">
      </div>
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
        <input type="text" id="pickupLocation" value="${data.location}" required
          class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500">
      </div>
    </div>
  `;

  document.getElementById("pickupDate").addEventListener("change", () => {
    calculateTotal(type);
  });
  document.getElementById("returnDate").addEventListener("change", () => {
    calculateTotal(type);
  });
}

// ---------- ADVENTURE FIELDS ----------
function renderAdventureFields(data, type) {
  infoBar.innerHTML = `
    <span><i class="fa-solid fa-clock text-orange-500"></i> ${data.days} Days / ${data.nights} Nights</span>
    <span><i class="fa-solid fa-tag text-orange-500"></i> $${data.price}/person</span>
  `;
  guestsWrapper.classList.remove("hidden");

  typeSpecificFields.innerHTML = `
    <h3 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
      <i class="fa-solid fa-calendar text-orange-600"></i> Travel Date
    </h3>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Start Date</label>
      <input type="date" id="travelDate" required
        class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500">
    </div>
  `;

  document.getElementById("adults").addEventListener("input", () => {
    calculateTotal(type);
  });
  document.getElementById("children").addEventListener("input", () => {
    calculateTotal(type);
  });
}

// ---------- PRICE CALCULATION ----------
function calculateTotal(type) {
  // const type = currentCardData.type;
  const price = parseFloat(currentCardData.price);
  let total = price;

  if (type === "tour" || type === "allSearch") {
    const adults = parseInt(document.getElementById("adults")?.value || 1);
    const children = parseInt(document.getElementById("children")?.value || 0);
    total = price * (adults + children * 0.5);
  } else if (type === "car") {
    const pickup = document.getElementById("pickupDate")?.value;
    const returnD = document.getElementById("returnDate")?.value;
    if (pickup && returnD) {
      const days = Math.max(
        1,
        (new Date(returnD) - new Date(pickup)) / (1000 * 60 * 60 * 24),
      );
      total = price * days;
    } else {
      total = price;
    }
  }

  totalPriceEl.textContent = `$${total.toFixed(2)}`;
}

// ---------- FORM SUBMIT ----------
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const bookingId = "BK" + Math.floor(100000 + Math.random() * 900000);

  document.getElementById("successName").textContent = name;
  document.getElementById("successItem").textContent = currentCardData.title;
  document.getElementById("successEmail").textContent = email;
  document.getElementById("bookingId").textContent = bookingId;

  formView.classList.add("hidden");
  successView.classList.remove("hidden");

  console.log("Booking submitted:", {
    bookingId,
    name,
    email,
    phone: document.getElementById("phone").value,
    type: currentCardData.type,
    item: currentCardData.title,
    total: totalPriceEl.textContent,
  });
});

// ---------- CLOSE HANDLERS ----------
function closeBookingModal() {
  overlay.classList.add("hidden");
  overlay.classList.remove("flex");
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.width = "";
}

closeModalBtn.addEventListener("click", closeBookingModal);
closeSuccessBtn.addEventListener("click", closeBookingModal);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeBookingModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeBookingModal();
});

// Modal Overlay
const signupBtns = document.querySelectorAll("#signupBtn");
const modalOverlay = document.getElementById("modalOverlay");
const closeBtn = document.getElementById("closeBtn");
const signupForm = document.getElementById("signupForm");
const successMessage = document.getElementById("successMessage");
const signupFormElement = document.getElementById("signupFormElement");

// Open modal
signupBtns.forEach((signupBtn) => {
  signupBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("hidden");
    modalOverlay.classList.add("flex");
    signupForm.classList.remove("hidden");
    successMessage.classList.add("hidden");
  });
});

// Close modal (X button)
closeBtn.addEventListener("click", closeModal);

// Close modal when clicking outside the form
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

function closeModal() {
  modalOverlay.classList.add("hidden");
  modalOverlay.classList.remove("flex");
}

// Handle form submission
signupFormElement.addEventListener("submit", (e) => {
  e.preventDefault();

  // Hide form, show success message
  signupForm.classList.add("hidden");
  successMessage.classList.remove("hidden");

  // Auto close after 2 seconds
  setTimeout(() => {
    closeModal();
    signupFormElement.reset();
  }, 2000);
});

const searchFilter = {
  type: "tours",
  location: "new york",
  checkIn: "",
  checkOut: "",
  guests: {
    adults: 2,
    children: 2,
  },
};
// sliding indicator
const tabs = document.querySelectorAll(".tab");
const indicator = document.getElementById("indicator");
let currentBtn = tabs[0];

function moveIndicator() {
  indicator.style.width = currentBtn.offsetWidth + "px";

  indicator.style.height = currentBtn.offsetHeight + "px";

  indicator.style.left = currentBtn.offsetLeft + "px";

  indicator.style.top = currentBtn.offsetTop + "px";
}

moveIndicator();

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    currentBtn = tab;
    moveIndicator();
    tabs.forEach((tab) => {
      tab.classList.remove("text-amber-300");
      tab.classList.add("text-gray-500");
    });
    tab.classList.add("text-amber-300");
    tab.classList.remove("text-gray-500");
    searchFilter.type = tab.value;
    // console.log(searchFilter);
  });
});
window.addEventListener("resize", moveIndicator);

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
    searchFilter.location = location.value;
    locationMenu.classList.add("hidden");
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

let checkInInput = document.getElementById("check-in-input");
let checkOutInput = document.getElementById("check-out-input");
let searchAll = document.getElementById("search-all");
let allSection = document.getElementById("all-section");

checkInInput.addEventListener("change", () => {
  searchFilter.checkIn = checkInInput.value;
  console.log(checkInInput.value);
});
checkOutInput.addEventListener("change", () => {
  searchFilter.checkOut = checkOutInput.value;
});

adultMinusBtn.addEventListener("click", () => {
  changeCount(adultCountSpan, -1);
  guestText.innerText = `${adultCountSpan.innerText} Adults, ${childCountSpan.innerText} Children`;
  searchFilter.guests.adults = parseInt(adultCountSpan.innerHTML);
  searchFilter.guests.children = parseInt(childCountSpan.innerHTML);
});
adultPlusBtn.addEventListener("click", () => {
  changeCount(adultCountSpan, 1);
  guestText.innerText = `${adultCountSpan.innerText} Adults, ${childCountSpan.innerText} Children`;
  searchFilter.guests.adults = parseInt(adultCountSpan.innerHTML);
  searchFilter.guests.children = parseInt(childCountSpan.innerHTML);
});
childMinusBtn.addEventListener("click", () => {
  changeCount(childCountSpan, -1);
  guestText.innerText = `${adultCountSpan.innerText} Adults, ${childCountSpan.innerText} Children`;
  searchFilter.guests.adults = parseInt(adultCountSpan.innerHTML);
  searchFilter.guests.children = parseInt(childCountSpan.innerHTML);
});
childPlusBtn.addEventListener("click", () => {
  changeCount(childCountSpan, 1);
  guestText.innerText = `${adultCountSpan.innerText} Adults, ${childCountSpan.innerText} Children`;
  searchFilter.guests.adults = parseInt(adultCountSpan.innerHTML);
  searchFilter.guests.children = parseInt(childCountSpan.innerHTML);
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

searchAll.addEventListener("click", () => {
  console.log("insise");
  getAll();
});

async function getAll() {
  try {
    const response = await fetch("./src/data/search.json");
    allData = await response.json();
    // console.log(data);
    renderAll(allSection, allData, searchFilter);
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
    getTours();
  });
});

//searchFilter event listener
// searchTours.addEventListener("click", () => {
//   getTours();
// });

//price range event listener
priceFrom.addEventListener("change", () => {
  tourFilters.priceFrom = parseInt(priceFrom.value);
  getTours();
  // console.log(tourFilters);
});
priceTo.addEventListener("change", () => {
  tourFilters.priceTo = parseInt(priceTo.value);
  getTours();
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
    getTours();
    // console.log(tourFilters);
  });
});

//duration event listeners
daysMinusBtn.addEventListener("click", () => {
  changeCount(daysCount, -1);
  tourFilters.days = parseInt(daysCount.innerText);
  durationBtn.innerText = `${daysCount.innerText} D & ${nightCount.innerText} N`;
  getTours();
  // console.log(durationBtn.innerText);
  // console.log(tourFilters);
});
daysPlusBtn.addEventListener("click", () => {
  changeCount(daysCount, 1);
  tourFilters.days = parseInt(daysCount.innerText);
  durationBtn.innerText = `${daysCount.innerText} D & ${nightCount.innerText} N`;
  getTours();
  // console.log(tourFilters);
});
nightMinusBtn.addEventListener("click", () => {
  changeCount(nightCount, -1);
  tourFilters.nights = parseInt(nightCount.innerText);
  durationBtn.innerText = `${daysCount.innerText} D & ${nightCount.innerText} N`;
  getTours();
  // console.log(tourFilters);
});
nightPlusBtn.addEventListener("click", () => {
  changeCount(nightCount, 1);
  tourFilters.nights = parseInt(nightCount.innerText);
  durationBtn.innerText = `${daysCount.innerText} D & ${nightCount.innerText} N`;
  getTours();
  // console.log(tourFilters);
});

//category options
categories.forEach((cat) => {
  cat.addEventListener("click", () => {
    tourFilters.category = cat.value.toLowerCase();
    categoryBtn.innerText = cat.innerText;
    getTours();
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
    tours = await response.json();
    // console.log(tours);
    renderTours(tourSection, tours, tourFilters);
  } catch (error) {
    console.log(error.message);
  }
}
getTours();

// import { createSlider, getVisibleCards } from "./slider.js";

const slider = document.getElementById("slider");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

const carFilters = {
  brand: new Set(),
};

async function getCars() {
  const res = await fetch("./src/data/cars_cards.json");

  cars = await res.json();

  renderCars(slider, cars, carFilters);

  carSlider.refresh();
}

const carSlider = createSlider({
  slider,

  nextBtn,

  prevBtn,

  getVisibleCards,

  gap: 16,
});

getCars();

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
    getCars();
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
    const response = await fetch("./src/data/topCategoryTours.json");
    if (!response.ok) {
      throw new Error("getTopCategoryTours response failed");
    }
    const data = await response.json();
    renderTopCategoryTours(topCategoryTourSection, data, topCategoryTourFilter);
  } catch (error) {
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
    const response = await fetch("./src/data/news.json");
    if (!response.ok) {
      throw new Error("getNews response failed");
    }
    const data = await response.json();
    renderNews(newsSection, data, newsFilter);
  } catch (error) {
    console.log(error.message);
  }
}
getNews();

const hSlider = document.getElementById("hotelSlider");
const hotelPrevBtn = document.getElementById("hotelPrev");
const hotelNextBtn = document.getElementById("hotelNext");

async function getHotels() {
  try {
    const response = await fetch("./src/data/hotel.json");
    if (!response.ok) {
      throw new Error("getHotels response error");
    }
    hotels = await response.json();
    renderHotels(hSlider, hotels);
    hotelSlider.refresh();
  } catch (error) {
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

getHotels();

let tSlider = document.getElementById("testimonialSlider");
let testimonialPrev = document.getElementById("testimonialPrev");
let testimonialNext = document.getElementById("testimonialNext");

async function getTestimonials() {
  try {
    const response = await fetch("./src/data/testimonial.json");
    if (!response.ok) {
      throw new Error("getTestimonials response error");
    }
    const data = await response.json();
    renderTestimonials(tSlider, data);
    testimonialSlider.refresh();
  } catch (error) {
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

function hide(e) {
  e.parentElement.children[0].classList.toggle("hidden");
  e.parentElement.children[1].classList.toggle("hidden");
}
window.hide = hide;

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("./sw.js")
//       .then(() => console.log("Service Worker Registered"))
//       .catch(console.error);
//   });
// }