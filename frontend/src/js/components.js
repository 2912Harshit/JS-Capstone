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

function tourCard(tour) {
  console.log(tour);
  return `
            <div
              class="border h-150 flex flex-col justify-between rounded-4xl"
              style="
                background-image: url(&quot;${tour.bg_image}&quot;);
              "
            >
              <div class="flex justify-between p-3">
                <div class="rounded-4xl w-1/3 flex items-center justify-center bg-white text-amber-300">Top Rated</div>
                <button class="rounded-full p-1 bg-white hover:text-red-500">fav</button>
              </div>
              <div
                class=" flex flex-col justify-between p-2 h-4/9 rounded-4xl bg-white relative"
              >
                <div class="p-2 text-4xl font-semibold">${tour.title}
                </div>
                <div class="flex justify-between w-1/2 p-2 text-gray-400">
                  <div>${tour.days} days ${tour.nights} nights</div>
                  <div>4-6 guests</div>
                </div>
                <div class="flex justify-between w-4/5 p-2 ">
                  <div class="text-gray-400"><span class="text-3xl font-semibold text-black">$${tour.price}</span>/person</div>
                  <button class="rounded-4xl p-3 bg-black text-white hover:bg-gray-500">Book now</button>
                </div>
                <div
                  class="absolute right-1/6 -top-1/16  rounded-4xl p-1 shadow-2xl shadow-black bg-white"
                >
                  ⭐${tour.rating} ( ${tour.reviews} reviews )
                </div>
              </div>
            </div>
    `;
}

export function renderTours(tourSection, tours, filters = {}) {
  tourSection.innerHTML = ``;
  if(filters.sort==0){
    tours.sort((a,b)=>a.price-b.price);
  }else tours.sort((a,b)=>b.price-a.price);
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
      price:tPrice
    } = tour;
    if (fCategory != tCategory && fCategory != "all") return;
    // console.log("why am here");
    if (fDays > tDays || fNights > tNights) return;
    // console.log("how am here");
    if (fRating > tRating) return;
    console.log("are yr here");
    if (fPriceFrom > tPrice || tPrice > fPriceTo) return;
    console.log("i am here");
    tourSection.innerHTML += tourCard(tour);
  });
};

function carCard(car){
    return `
      <div
                class="shadow-rounded-2xl shrink-0 w-[calc((100%-3rem)/3)] h-150 flex flex-col justify-between rounded-4xl border border-gray-200"
                style="
                  background-image: url(&quot;${car.image}&quot;);
                "
              >
                <div class="flex justify-between p-3">
                  <div class="rounded-4xl w-1/3 flex items-center justify-center bg-white text-amber-300">Top Rated</div>
                  <button class="rounded-full p-1 bg-white hover:text-red-500">fav</button>
                </div>
                <div
                  class=" flex flex-col justify-between p-2 h-4/9 rounded-4xl bg-white relative"
                >
                <div class="p-2 flex flex-col gap-2 border-b border-b-gray-400">
                  <div class="text-3xl font-semibold">${car.brand} ${car.model}
                  </div>
  
                  <div class="class flex gap-2"><img class="h-5" src="./src/assets/images/location.svg.png" alt="">${car.location}</div>
  
                </div>
                  <div class="grid grid-cols-2 w-full p-2 text-gray-400 self-center gap-4">
                    <div class="grid grid-cols-2 w-1/4"><img class="self-center" src="./src/assets/images/mile.svg.png" alt="">${car.mileage}</div>
                    <div class="grid grid-cols-2 w-1/4"><img src="./src/assets/images/automatic.svg.png" alt="">${car.transmission}</div>
                    <div class="grid grid-cols-2 w-1/4"><img class="self-center" src="./src/assets/images/fuel.svg.png" alt="">${car.fuel}</div>
                    <div class="grid grid-cols-2 w-1/4"><img src="./src/assets/images/seat.svg.png" alt="">${car.seats}</div>
                    
                  </div>
                  <div class="flex justify-between w-4/5 p-1 ">
                    <div class="text-gray-400"><span class="text-3xl font-semibold text-black">$${car.price}</span>/person</div>
                    <button class="rounded-4xl p-3 bg-black text-white hover:bg-gray-500">Book now</button>
                  </div>
                  <div
                    class="absolute right-1/6 -top-1/16  rounded-4xl p-1 shadow-2xl shadow-black bg-white"
                  >
                    ⭐${car.rating} ( ${car.reviews} reviews )
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
      fuel:cFuel,
      seats:cSeats,
      price:cPrice,
      rating:cRating,
      reviews:cReviews
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
    if(filters.brand.size!=0 && !filters.brand.has(car.brand.toLowerCase()))return;
    carSection.innerHTML += carCard(car);
  });
}

