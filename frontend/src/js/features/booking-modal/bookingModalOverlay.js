import { variables } from "../../shared/dataVariables.js";

export function bookingModalOverlay() {
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
  let savedScrollY = 0;

  const badgeColors = {
    allSearch: "bg-blue-500/80",
    car: "bg-purple-500/80",
    tour: "bg-orange-500/80",
    hotel: "bg-emerald-500/80",
  };

  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".book-now-btn");
    if (btn) {
      e.preventDefault();
      currentCardData;
      const { id, type } = btn.dataset;
      if (type == "car") {
        currentCardData = variables.cars.find((item) => item.id == id);
      } else if (type == "tour") {
        currentCardData = variables.tours.find((item) => item.id == id);
      } else if (type == "allSearch") {
        currentCardData = variables.allData.find((item) => item.id == id);
      } else if (type == "hotel") {
        currentCardData = variables.hotels.find((item) => item.id == id);
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

    // 🔒 lock scroll WITHOUT losing position
    savedScrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`; // ← keeps visual position
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
      const children = parseInt(
        document.getElementById("children")?.value || 0,
      );
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
    // 🔓 unlock scroll and RESTORE position
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, savedScrollY);
  }

  closeModalBtn.addEventListener("click", closeBookingModal);
  closeSuccessBtn.addEventListener("click", closeBookingModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeBookingModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeBookingModal();
  });
}
