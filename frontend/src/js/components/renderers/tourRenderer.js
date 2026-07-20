function tourCard(tour) {
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
    if (fCategory != tCategory && fCategory != "all") return;
    if (fDays > tDays || fNights > tNights) return;
    if (fRating > tRating) return;
    if (fLocation != tLocation && fLocation != undefined) return;
    if (fPriceFrom > tPrice || tPrice > fPriceTo) return;
    tourSection.insertAdjacentHTML("beforeend", tourCard(tour));
  });
}
