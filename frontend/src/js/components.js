// Handles sliders, tabs, accordions, and other interactive components

// export function initializeComponents() {
//   initializeSliders();
//   initializeTabs();
//   initializeAccordions();
// }

// function initializeSliders() {
//   // Add slider functionality here
//   console.log("Sliders initialized");
// }

// function initializeTabs() {
//   // Add tab functionality here
//   console.log("Tabs initialized");
// }

// function initializeAccordions() {
//   // Add accordion functionality here
//   console.log("Accordions initialized");
// }

// // Example component functions
// export function toggleAccordion(element) {
//   element.classList.toggle("active");
// }

// export function switchTab(tabName) {
//   console.log("Switched to tab:", tabName);
// }
function newsCard(card) {
  return `
          <div
        class="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300">

        <div class="relative">

          <img
            src=${card.image}
            
            class="h-64 w-full object-cover"
            alt="Travel">

          <!-- Category -->
          <span
            class="absolute top-4 left-4 bg-white px-4 py-1 rounded-full text-xs font-semibold">
            ${card.category}
          </span>

          <!-- Heart -->
          <button 
          aria-label="favourite"
            class="heart-btn absolute top-4 right-4 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow">
            <img class="heart"  src="./src/assets/images/heart.avif" alt="heart">
            <img class="red-heart hidden"  src="./src/assets/images/fav2.png" alt="heart">

          </button>
        </div>

        <div class="p-5">

          <!-- Meta -->
          <div
            class="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">

            <span>📅 ${card.date}</span>
            <span>🕒 ${card.readTime} mins</span>
            <span>💬 ${card.comments} comments</span>

          </div>

          <h3
            class="text-xl font-semibold leading-8 mb-6">

            ${card.title}

          </h3>

          <div class="flex justify-between items-center">

            <div class="flex items-center gap-3">

              <img
                src=${card.author.avatar}
                alt="user"
                class="w-10 h-10 rounded-full">

              <span class="font-medium text-sm">
                ${card.author.name}
              </span>

            </div>

            <button
              class="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200">

              Keep Reading

            </button>

          </div>

        </div>

      </div>
  `;
}

export function renderNews(section, data, filters = {}) {
  section.innerHTML = "";
  if (filters.view == 1) data = data.slice(0, 3);
  data.forEach((card) => {
    section.insertAdjacentHTML("beforeend", newsCard(card));
  });
}

function topCategoryToursCard(card) {
  return `
    <div
              class="border border-gray-300 rounded-3xl p-3 hover:shadow-xl transition duration-300 cursor-pointer"
            >
              <img
                src="${card.image}"
                alt="${card.title}"
                class="w-full h-40 object-cover rounded-2xl"
              />

              <div class="flex justify-between items-center mt-4">
                <div>
                  <h3 class="font-semibold text-lg">${card.title}</h3>

                  <p class="text-gray-500 text-sm">${card.tours} Tours, ${card.activities} Activities</p>
                </div>

                <div
                  class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  →
                </div>
              </div>
            </div>
  `;
}

export function renderTopCategoryTours(section, data, filters = {}) {
  section.innerHTML = "";
  if (filters.view == 1) data = data.slice(0, 4);
  data.forEach((card) => {
    section.insertAdjacentHTML("beforeend", topCategoryToursCard(card));
  });
  // toggleFavourite();
}

function allCard(item) {
  return `
<div
  class="group overflow-hidden h-[380px] sm:h-[440px] lg:h-150 flex flex-col rounded-3xl sm:rounded-4xl bg-white
  shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
>
  <!-- Image Section -->
  <div class="relative h-[55%]">
    <img
      src=${item.image}
      alt="${item.location}"
      class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
    />

    <div class="absolute top-2 sm:top-3 left-2 sm:left-3 rounded-4xl px-3 py-1 sm:w-1/3 flex items-center justify-center bg-white text-red-500 text-xs sm:text-sm whitespace-nowrap capitalize">
      ${item.type}
    </div>

    <button
          aria-label="favourite"
            class="heart-btn absolute top-4 right-4 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow">
            <img class="heart"  src="./src/assets/images/heart.avif" alt="heart">
            <img class="red-heart hidden"   src="./src/assets/images/fav2.png" alt="heart">

          </button>
  </div>

  <!-- Bottom Card -->
  <div
    class="flex flex-col justify-between gap-2 p-3 sm:p-4 flex-1 bg-white relative border-l border-r border-gray-300 rounded-b-4xl"
  >
    <!-- Location -->
    <div class="text-xl sm:text-2xl lg:text-4xl font-semibold capitalize">
      ${item.location}
    </div>

    <!-- Details -->
    <div class="grid grid-cols-2 gap-3 py-3 text-sm">

  <!-- Check In -->
  <div class="flex items-center gap-2">
    <img
      src="./src/assets/images/calendar-svgrepo-com.svg"
      alt="Check In"
      class="h-5 w-5"
    />
    <div>
      <p class="text-xs text-gray-400">Check In</p>
      <p class="font-medium">${item.checkIn}</p>
    </div>
  </div>
  <!-- Check Out -->
  <div class="flex items-center gap-2">
    <img
      src="./src/assets/images/calendar-svgrepo-com.svg"
      alt="Check Out"
      class="h-5 w-5"
    />
    <div>
      <p class="text-xs text-gray-400">Check Out</p>
      <p class="font-medium">${item.checkOut}</p>
    </div>
  </div>

  <!-- Adults -->
  <div class="flex items-center gap-2">
    <img
      src="./src/assets/images/person-svgrepo-com.svg"
      alt="Adults"
      class="h-5 w-5"
    />
    <div>
      <p class="text-xs text-gray-400">Adults</p>
      <p class="font-medium">${item.guests.adults}</p>
    </div>
  </div>

  <!-- Children -->
  <div class="flex items-center gap-2">
    <img
      src="./src/assets/images/person-svgrepo-com.svg"
      alt="Children"
      class="h-5 w-5"
    />
    <div>
      <p class="text-xs text-gray-400">Children</p>
      <p class="font-medium">${item.guests.children}</p>
    </div>
  </div>

</div>

    <!-- Bottom -->
    <div class="flex items-center justify-between gap-2 pt-1">
      <div class="text-gray-400 text-xs sm:text-sm shrink-0">
        <span class="text-lg sm:text-2xl lg:text-3xl font-semibold text-black capitalize">
          $${item.price}
        </span>
        /person
      </div>

      <button
        class="rounded-4xl px-5 py-2 bg-gray-100  hover:text-white hover:bg-black text-xs sm:text-base shrink-0 book-now-btn"
        data-id="${item.id}"
        data-type="allSearch"
      >
        Book now
      </button>
    </div>

    <!-- Floating Badge -->
    <div
      class="absolute right-3 sm:right-4 -top-4 sm:-top-5 rounded-4xl px-2 py-1 shadow-2xl bg-white text-xs sm:text-sm whitespace-nowrap"
    >
      ⭐${item.rating} ( ${item.reviews} reviews )
    </div>
  </div>
</div>
`;
}
export function renderAll(allSection, data, filters = {}) {
  console.log(filters);
  console.log(data);
  allSection.innerHTML = "";
  const {
    type: fType,
    location: fLocation,
    checkIn: fCheckIn,
    checkOut: fCheckOut,
    guests: fGuests,
  } = filters;

  const { adults: fAdults, children: fChildren } = fGuests;

  data.forEach((card) => {
    const {
      type: cType,
      location: cLocation,
      checkIn: cCheckIn,
      checkOut: cCheckOut,
      guests: cGuests,
    } = card;
    const { adults: cAdults, children: cChildren } = cGuests;

    if (
      fType != cType ||
      fLocation != cLocation ||
      fCheckIn != cCheckIn ||
      fCheckOut != cCheckOut ||
      cAdults < fAdults ||
      cChildren < fChildren
    ) {
      console.log("3");
      return;
    }
    allSection.insertAdjacentHTML("beforeend", allCard(card));
    // toggleFavourite();
  });
}

function tourCard(tour) {
  console.log(tour);
  return `
            <div
              class="relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-cover bg-center w-[100%] h-[380px] sm:h-full lg:h-130 flex flex-col justify-between rounded-3xl sm:rounded-4xl"
              
            >
            <div class="relative h-[50%] sm:h-[55%] shrink-0">
    <img
      src="${tour.image}"
      alt="${tour.category}"
      class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
      
    />

    <div class="absolute top-2 sm:top-3 left-2 sm:left-3 rounded-full px-3 sm:px-4 py-1 bg-white text-amber-400 font-medium text-xs sm:text-sm whitespace-nowrap">
      Top Rated
    </div>

    <button
          aria-label="favourite"
            class="heart-btn absolute top-4 right-4 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow">
            <img class="heart"  src="./src/assets/images/heart.avif" alt="heart">
            <img class="red-heart hidden"   src="./src/assets/images/fav2.png" alt="heart">

          </button>
  </div>
             <div
    class="flex flex-col justify-between flex-1 min-h-0 p-2  bg-white relative border-l border-r rounded-b-4xl border-gray-300"
  >
    <div class="p-2 flex flex-col gap-1 sm:gap-2 border-b border-b-gray-400">
      <div class="text-lg sm:text-2xl lg:text-3xl font-semibold">
        ${tour.title}
      </div>

    
    </div>

    <div class="grid grid-cols-2 w-full p-2 text-gray-400 gap-2 sm:gap-4 text-xs sm:text-base">
      <div class="flex items-center gap-2">
        ${tour.days} Days ${tour.nights} Nights
      </div>

      <div class="flex items-center gap-2">
        4-6 Guests
      </div>
</div>
    <div class="flex items-center justify-between gap-2 p-1">
      <div class="text-gray-400 text-xs sm:text-sm shrink-0">
        <span class="text-lg sm:text-2xl lg:text-3xl font-semibold text-black">
          $${tour.price}
        </span>
        /person
      </div>

      <button class="rounded-4xl px-5 py-2 bg-gray-100  hover:text-white hover:bg-black text-xs sm:text-base shrink-0 book-now-btn"
      data-id="${tour.id}"
      data-type="tour">
        Book now
      </button>
    </div>

    <div
      class="absolute right-3 sm:right-4 -top-4 sm:-top-5 rounded-4xl px-2 py-1 shadow-2xl bg-white text-xs sm:text-sm whitespace-nowrap"
    >
      ⭐${tour.rating} (${tour.reviews} reviews)
    </div>
  </div>
    `;
}

export function renderTours(tourSection, tours, filters = {}) {
  console.log("inside renderTOurs");
  console.log(filters);
  tourSection.innerHTML = ``;
  if (filters.sort == 0) {
    tours.sort((a, b) => a.price - b.price);
  } else tours.sort((a, b) => b.price - a.price);
  const {
    category: fCategory,
    days: fDays,
    nights: fNights,
    rating: fRating,
    priceFrom: fPriceFrom,
    priceTo: fPriceTo,
    location: fLocation,
  } = filters;
  tours.forEach((tour) => {
    const {
      category: tCategory,
      days: tDays,
      nights: tNights,
      rating: tRating,
      price: tPrice,
      location: tLocation,
    } = tour;
    console.log("fLocation", fLocation);
    if (fCategory != tCategory && fCategory != "all") return;
    // console.log("why am here");
    if (fDays > tDays || fNights > tNights) return;
    // console.log("how am here");
    if (fRating > tRating) return;
    if (fLocation != tLocation && fLocation != undefined) return;
    // console.log("are yr here");
    if (fPriceFrom > tPrice || tPrice > fPriceTo) return;
    // if (fPriceFrom > tPrice || tPrice > fPriceTo) return;
    // console.log("i am here");
    tourSection.insertAdjacentHTML("beforeend", tourCard(tour));
  });
  // toggleFavourite();
}

function carCard(car) {
  return `
      <div
  class="group overflow-hidden shrink-0 w-[100%] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/3)] h-[400px] sm:h-[600px] lg:h-150 flex flex-col rounded-3xl sm:rounded-4xl border border-gray-200 shadow-lg bg-white
   hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
>
  <!-- Car Image -->
  <div class="relative h-[50%] sm:h-[55%] shrink-0">
    <img
      src="${car.image}"
      alt="${car.brand} ${car.model}"
      class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
      
    />

    <div class="absolute top-2 sm:top-3 left-2 sm:left-3 rounded-full px-3 sm:px-4 py-1 bg-white text-amber-400 font-medium text-xs sm:text-sm whitespace-nowrap">
      Top Rated
    </div>

    <button
          aria-label="favourite"
            class="heart-btn absolute top-4 right-4 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow">
            <img class="heart"  src="./src/assets/images/heart.avif" alt="heart">
            <img class="red-heart hidden"   src="./src/assets/images/fav2.png" alt="heart">

          </button>
  </div>

  <!-- Bottom Card -->
  <div
    class="flex flex-col justify-between flex-1 min-h-0 p-2  bg-white relative"
  >
    <div class="p-2 flex flex-col gap-1 sm:gap-2 border-b border-b-gray-400">
      <div class="text-lg sm:text-2xl lg:text-3xl font-semibold truncate">
        ${car.brand} ${car.model}
      </div>

      <div class="flex items-center gap-2 text-xs sm:text-sm truncate">
        <img class="h-4 sm:h-5 shrink-0" src="./src/assets/images/location.svg.png" alt="location"
        >
        ${car.location}
      </div>
    </div>

    <div class="grid grid-cols-2 w-full p-2 text-gray-400 gap-2 sm:gap-4 text-xs sm:text-sm">
      <div class="flex items-center gap-2 truncate">
        <img class="h-4 sm:h-5 shrink-0" src="./src/assets/images/mile.svg.png" alt="mileage"
        >
        ${car.mileage}
      </div>

      <div class="flex items-center gap-2 truncate">
        <img class="h-4 sm:h-5 shrink-0" src="./src/assets/images/automatic.svg.png" alt="transmission"
        >
        ${car.transmission}
      </div>

      <div class="flex items-center gap-2 truncate">
        <img class="h-4 sm:h-5 shrink-0" src="./src/assets/images/fuel.svg.png" alt="fuel"
        >
        ${car.fuel}
      </div>

      <div class="flex items-center gap-2 truncate">
        <img class="h-4 sm:h-5 shrink-0" src="./src/assets/images/seat.svg.png" alt="seat"
        >
        ${car.seats}
      </div>
    </div>

    <div class="flex items-center justify-between gap-2 p-1">
      <div class="text-gray-400 text-xs sm:text-sm shrink-0">
        <span class="text-lg sm:text-2xl lg:text-3xl font-semibold text-black">
          $${car.price}
        </span>
        /person
      </div>

      <button class="rounded-4xl px-5 py-2 bg-gray-100  hover:text-white hover:bg-black text-xs sm:text-base shrink-0 book-now-btn"
      data-id="${car.id}"
      data-type="car">
        Book now
      </button>
    </div>

    <div
      class="absolute right-3 sm:right-4 -top-4 sm:-top-5 rounded-4xl px-2 py-1 shadow-2xl bg-white text-xs sm:text-sm whitespace-nowrap"
    >
      ⭐${car.rating} (${car.reviews} reviews)
    </div>
  </div>
</div>
    `;
}

export function renderCars(carSection, cars, filters = {}) {
  carSection.innerHTML = ``;
  // if(filters.sort==0){
  //   tours.sort((a,b)=>a.price-b.price);
  // }else tours.sort((a,b)=>b.price-a.price);
  // const {
  //   category: fCategory,
  //   days: fDays,
  //   nights: fNights,
  //   rating: fRating,
  //   priceFrom: fPriceFrom,
  //   priceTo: fPriceTo,
  // } = filters;
  cars.forEach((car) => {
    const {
      brand: cBrand,
      model: cModel,
      location: cLocation,
      mileage: cMileage,
      transmission: cTransmission,
      fuel: cFuel,
      seats: cSeats,
      price: cPrice,
      rating: cRating,
      reviews: cReviews,
    } = car;
    // if (fCategory != tCategory && fCategory != "all") return;
    // // console.log("why am here");
    // if (fDays > tDays || fNights > tNights) return;
    // // console.log("how am here");
    // if (fRating > tRating) return;
    // console.log("are yr here");
    // if (fPriceFrom > tPrice || tPrice > fPriceTo) return;
    // console.log("i am here");
    // if(filters.brand!=cBrand)return;
    console.log(cBrand.toLowerCase(), filters.brand.values().next().value);
    if (filters.brand.size != 0 && !filters.brand.has(cBrand.toLowerCase()))
      return;
    carSection.insertAdjacentHTML("afterbegin", carCard(car));
  });
  // toggleFavourite();
}

export function renderHotels(slider, data, filters = {}) {
  slider.innerHTML = "";
  data.forEach((hotel) => {
    slider.insertAdjacentHTML("beforeend", hotelCard(hotel));
  });
  // toggleFavourite();
}

function hotelCard(hotel) {
  return `
<div
class="group bg-white rounded-[32px] overflow-hidden shrink-0
w-[100%]  sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/3)] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
>

<div class="relative h-64 overflow-hidden">

<img
src="${hotel.image}"
class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
alt="hotel"
/>

<button
          aria-label="favourite"
            class="heart-btn absolute top-4 right-4 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow">
            <img class="heart"  src="./src/assets/images/heart.avif" alt="heart">
            <img class="red-heart hidden"   src="./src/assets/images/fav2.png" alt="heart">

          </button>

<div
class="absolute bottom-4 right-4 bg-white rounded-full px-4 py-2 shadow flex items-center gap-2 text-sm"
>

⭐

<strong>${hotel.rating}</strong>

<span class="text-gray-500">

(${hotel.reviews} reviews)

</span>

</div>

</div>

<div class="p-6 flex flex-col justify-between">


<h3 class="text-2xl font-bold leading-snug">

${hotel.title}

</h3>

<div class="flex justify-between mt-5">

<p class="text-gray-500 text-sm">

📍 ${hotel.location}

</p>

<div class="text-yellow-500">

★★★★★

</div>

</div>

<div class="flex items-center justify-between gap-2 p-1 mt-2">
      <div class="text-gray-400 text-xs sm:text-sm shrink-0">
        <span class="text-lg sm:text-2xl lg:text-3xl font-semibold text-black">
          $${hotel.price}
        </span>
        /person
      </div>

      <button class="rounded-4xl px-5 py-2 bg-gray-100  hover:text-white hover:bg-black text-xs sm:text-base shrink-0 book-now-btn"
      data-id="${hotel.id}"
      data-type="hotel">
        Book now
      </button>
    </div>

</>

</div>
`;
}

function testimonialCard(testimonial) {
  return `
    <div
class="group
flex-none
w-[90%]
sm:w-[calc((100%-1rem)/2)]
lg:w-[calc((100%-2rem)/3)]
bg-white
rounded-[28px]
border
border-gray-200
p-7
transition-all
duration-300
hover:-translate-y-2
hover:shadow-xl
h-10px"
>

    <h3 class="font-bold text-xl">

        ${testimonial.title}

    </h3>

    <p
    class="mt-5
    text-gray-500
    leading-7
    text-[15px]
    h-28
    overflow-hidden"
    >

        ${testimonial.review}

    </p>

    <div
    class="mt-8
    md:flex
    items-center
    justify-between
    "
    >

        <div
        class="flex
        items-center
        gap-4"
        >

            <img
            src="${testimonial.avatar}"
            alt="avatar"
            class="w-14
            h-14
            rounded-full
            object-cover"
            >

            <div>

                <h4 class="font-semibold">

                    ${testimonial.name}

                </h4>

                <p class="text-sm text-gray-500">

                    ${testimonial.location}

                </p>

            </div>

        </div>

        <div
        class="flex
        text-yellow-400
        gap-1"
        >

            ★★★★★

        </div>

    </div>

</div>
  `;
}

export function renderTestimonials(slider, data) {
  data.forEach((card) => {
    slider.insertAdjacentHTML("beforeend", testimonialCard(card));
  });
}
// Attach ONCE, globally (put this at the bottom of your file or in your main init)
// document.addEventListener("click", (e) => {
//   const btn = e.target.closest(".heart-btn");
//   if (!btn) return;
// console.log(btn);

//   btn.children[0].classList.toggle("hidden"); // white heart
//   btn.children[1].classList.toggle("hidden"); // red heart
// });