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
      return;
    }
    allSection.insertAdjacentHTML("beforeend", allCard(card));
  });
}
