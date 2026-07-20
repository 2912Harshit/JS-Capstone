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

    if (filters.brand.size != 0 && !filters.brand.has(cBrand.toLowerCase()))
      return;
    carSection.insertAdjacentHTML("afterbegin", carCard(car));
  });
}
