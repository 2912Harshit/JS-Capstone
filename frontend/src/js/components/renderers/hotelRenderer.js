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

export function renderHotels(slider, data, filters = {}) {
  slider.innerHTML = "";
  data.forEach((hotel) => {
    slider.insertAdjacentHTML("beforeend", hotelCard(hotel));
  });
}
