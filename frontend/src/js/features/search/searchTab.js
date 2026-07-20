import {
  getCarsData,
  getHotelsData,
  getToursData,
} from "../../services/contentService.js";

export function searchTab() {
  const searchFilter = {
    type: "tours",
    location: "new york",
    checkIn: "",
    checkOut: "",
    guests: {
      adults: 2,
      children: 2,
    },
    days: 2,
    nights: 0,
    rating: 1,
    priceFrom: 0,
    priceTo: Number.MAX_SAFE_INTEGER,
    category: "all",
    brand: new Set(),
    seats: 0,
    transmission: "automatic",
    fuel: "petrol",
  };
  searchFilter.brand.add("toyota");
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
      showFieldsFor(tab.value);
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

  let daysInput = document.getElementById("days-input");

  daysInput.addEventListener("change", () => {
    console.log(daysInput.value);
    searchFilter.days = parseInt(daysInput.value);
  });

  let brandInput = document.getElementById("brand-input");
  console.log(brandInput);

  brandInput.addEventListener("click", () => {
    searchFilter.brand.clear();
    searchFilter.brand.add(brandInput.value.toLowerCase());
  });

  const searchFor = {
    hotels: () => getHotelsData(allSection, searchFilter),
    tours: () => getToursData(allSection, searchFilter),
    rental: () => getCarsData(allSection, searchFilter),
  };

  searchAll.addEventListener("click", async () => {
    // console.log(Object.keys(searchFor).includes(searchFilter.type));
    // getAll();

    await searchFor[searchFilter.type]();
    console.log(allSection.children);

    for (const child of allSection.children) {
      child.classList.remove(
        "lg:w-[calc((100%-3rem)/3)]",
        "sm:w-[calc((100%-1rem)/2)]",
      );
      // child.classList.add("h-[380px]", "sm:h-[200px]", "lg:h-130");
      // child.classList.add("sm:w-[100%]");
    }
  });

  const fields = document.querySelectorAll(".field");

  function showFieldsFor(type) {
    fields.forEach((field) => {
      if (field.classList.contains(type)) {
        field.classList.remove("hidden");
      } else {
        field.classList.add("hidden");
      }
    });
  }
  showFieldsFor(tabs[0].value);
}
