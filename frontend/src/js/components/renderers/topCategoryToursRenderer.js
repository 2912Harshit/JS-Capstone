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
}
