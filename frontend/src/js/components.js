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

function allCard(item){
  return `
<div
  class="border overflow-hidden h-[380px] sm:h-[440px] lg:h-150 flex flex-col rounded-3xl sm:rounded-4xl bg-white"
>
  <!-- Image Section -->
  <div class="relative h-[55%]">
    <img
      src=${item.image}
      alt="${item.location}"
      class="w-full h-full object-cover"
    />

    <div class="absolute top-2 sm:top-3 left-2 sm:left-3 rounded-4xl px-3 py-1 sm:w-1/3 flex items-center justify-center bg-white text-red-500 text-xs sm:text-sm whitespace-nowrap capitalize">
      ${item.type}
    </div>

    <button
      class="absolute top-2 sm:top-3 right-2 sm:right-3 rounded-full p-1.5 sm:p-2 bg-white hover:text-red-500 shrink-0"
    >
      <img src="./src/assets/images/heart.avif" alt="heart">
    </button>
  </div>

  <!-- Bottom Card -->
  <div
    class="flex flex-col justify-between gap-2 p-3 sm:p-4 flex-1 rounded-t-3xl sm:rounded-t-4xl bg-white relative"
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
        class="rounded-4xl px-4 py-2 sm:p-3 bg-black text-white hover:bg-gray-500 text-xs sm:text-sm shrink-0 book-now-btn"
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
export function renderAll(allSection,data,filters={}){
  console.log(filters)

  allSection.innerHTML="";
  const {
    type:fType,
    location:fLocation,
    checkIn:fCheckIn,
    checkOut:fCheckOut,
    guests:fGuests
  }=filters;

  const {
    adults:fAdults,
    children:fChildren
  }=fGuests;

  data.forEach((card)=>{
    const {
      type: cType,
      location: cLocation,
      checkIn: cCheckIn,
      checkOut: cCheckOut,
      guests: cGuests,
    } = card;
    const{
      adults:cAdults,
      children:cChildren
    }=cGuests;

    if(fType!=cType ||
        fLocation!=cLocation ||
       fCheckIn!=cCheckIn ||
       fCheckOut!=cCheckOut ||
       cAdults<fAdults ||
       cChildren<fChildren
      ){
        console.log("3");
        return;
       }
    allSection.insertAdjacentHTML("beforeend",allCard(card));
    
  })
}


function tourCard(tour) {
  console.log(tour);
  return `
            <div
              class="border overflow-hidden bg-cover bg-center h-[380px] sm:h-[440px] lg:h-150 flex flex-col justify-between rounded-3xl sm:rounded-4xl"
              style="
                background-image: url(&quot;${tour.image}&quot;);
              "
            >
              <div class="flex justify-between items-start p-2 sm:p-3 gap-2">
                <div class="rounded-4xl px-3 py-1 sm:w-1/3 flex items-center justify-center bg-white text-amber-300 text-xs sm:text-sm whitespace-nowrap">Top Rated</div>
                <button class="rounded-full p-1.5 sm:p-2 bg-white hover:text-red-500 text-xs sm:text-sm shrink-0">
                <img src="./src/assets/images/heart.avif" alt="heart">
                </button>
              </div>
              <div
                class="flex flex-col justify-between gap-1 sm:gap-2 p-3 sm:p-4 min-h-[42%] rounded-3xl sm:rounded-4xl bg-white relative"
              >
                <div class="text-xl sm:text-2xl lg:text-4xl font-semibold  pr-2">${tour.title}
                </div>
                <div class="flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs sm:text-sm lg:text-base text-gray-400">
                  <div>${tour.days} days ${tour.nights} nights</div>
                  <div>4-6 guests</div>
                </div>
                <div class="flex items-center justify-between gap-2 pt-1">
                  <div class="text-gray-400 text-xs sm:text-sm shrink-0"><span class="text-lg sm:text-2xl lg:text-3xl font-semibold text-black">$${tour.price}</span>/person</div>
                  <button class="rounded-4xl px-4 py-2 sm:p-3 bg-black text-white hover:bg-gray-500 text-xs sm:text-sm shrink-0 book-now-btn" data-id="${tour.id}" data-type="tour" >Book now</button>
                </div>
                <div
                  class="absolute right-3 sm:right-4 -top-4 sm:-top-5 rounded-4xl px-2 py-1 shadow-2xl shadow-black bg-white text-xs sm:text-sm whitespace-nowrap"
                >
                  ⭐${tour.rating} ( ${tour.reviews} reviews )
                </div>
              </div>
            </div>
    `;
}

export function renderTours(tourSection, tours, filters = {}) {
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
  } = filters;
  tours.forEach((tour) => {
    const {
      category: tCategory,
      days: tDays,
      nights: tNights,
      rating: tRating,
      price: tPrice,
    } = tour;
    if (fCategory != tCategory && fCategory != "all") return;
    // console.log("why am here");
    if (fDays > tDays || fNights > tNights) return;
    // console.log("how am here");
    if (fRating > tRating) return;
    // console.log("are yr here");
    if (fPriceFrom > tPrice || tPrice > fPriceTo) return;
    // console.log("i am here");
    tourSection.insertAdjacentHTML("beforeend",tourCard(tour));
  });
}

function carCard(car) {
  return `
      <div
  class="overflow-hidden shrink-0 w-[85%] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/3)] h-[400px] sm:h-[440px] lg:h-150 flex flex-col rounded-3xl sm:rounded-4xl border border-gray-200 shadow-lg bg-white"
>
  <!-- Car Image -->
  <div class="relative h-[50%] sm:h-[55%] shrink-0">
    <img
      src="${car.image}"
      alt="${car.brand} ${car.model}"
      class="w-full h-full object-cover"
      
    />

    <div class="absolute top-2 sm:top-3 left-2 sm:left-3 rounded-full px-3 sm:px-4 py-1 bg-white text-amber-400 font-medium text-xs sm:text-sm whitespace-nowrap">
      Top Rated
    </div>

    <button
      class="absolute top-2 sm:top-3 right-2 sm:right-3 rounded-full p-1.5 sm:p-2 bg-white hover:text-red-500 text-xs sm:text-sm"
    >
      <img src="./src/assets/images/heart.avif" alt="heart" >
    </button>
  </div>

  <!-- Bottom Card -->
  <div
    class="flex flex-col justify-between flex-1 min-h-0 p-2 rounded-t-3xl sm:rounded-t-4xl bg-white relative"
  >
    <div class="p-2 flex flex-col gap-1 sm:gap-2 border-b border-b-gray-400">
      <div class="text-lg sm:text-2xl lg:text-3xl font-semibold truncate">
        ${car.brand} ${car.model}
      </div>

      <div class="flex items-center gap-2 text-xs sm:text-sm truncate">
        <img class="h-4 sm:h-5 shrink-0" src="./src/assets/images/location.svg.png" alt=""
        >
        ${car.location}
      </div>
    </div>

    <div class="grid grid-cols-2 w-full p-2 text-gray-400 gap-2 sm:gap-4 text-xs sm:text-sm">
      <div class="flex items-center gap-2 truncate">
        <img class="h-4 sm:h-5 shrink-0" src="./src/assets/images/mile.svg.png" alt=""
        >
        ${car.mileage}
      </div>

      <div class="flex items-center gap-2 truncate">
        <img class="h-4 sm:h-5 shrink-0" src="./src/assets/images/automatic.svg.png" alt=""
        >
        ${car.transmission}
      </div>

      <div class="flex items-center gap-2 truncate">
        <img class="h-4 sm:h-5 shrink-0" src="./src/assets/images/fuel.svg.png" alt=""
        >
        ${car.fuel}
      </div>

      <div class="flex items-center gap-2 truncate">
        <img class="h-4 sm:h-5 shrink-0" src="./src/assets/images/seat.svg.png" alt=""
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

      <button class="rounded-4xl px-4 py-2 sm:p-3 bg-black text-white hover:bg-gray-500 text-xs sm:text-sm shrink-0 book-now-btn"
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
    if (filters.brand.size != 0 && !filters.brand.has(cBrand.toLowerCase()))
      return;
    carSection.insertAdjacentHTML("afterbegin", carCard(car));
  });
}
