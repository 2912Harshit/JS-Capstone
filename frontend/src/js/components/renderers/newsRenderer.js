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
