import { fetchJson } from "../api/http.js";
import {
  renderAll,
  renderCars,
  renderHotels,
  renderNews,
  renderTestimonials,
  renderTopCategoryTours,
  renderTours,
} from "../components/index.js";
import { variables } from "../shared/dataVariables.js";

export async function getAllData(section, filters = {}) {
  const data = await fetchJson("./src/data/search.json");
  variables.allData = data;
  renderAll(section, variables.allData, filters);
  return data;
}

export async function getToursData(section, filters = {}) {
  const data = await fetchJson("./src/data/tour_cards.json");
  variables.tours = data;
  renderTours(section, variables.tours, filters);
  return data;
}

export async function getCarsData(section, filters = {}) {
  const data = await fetchJson("./src/data/cars_cards.json");
  variables.cars = data;
  renderCars(section, variables.cars, filters);
  return data;
}

export async function getTopCategoryToursData(section, filters = {}) {
  const data = await fetchJson("./src/data/topCategoryTours.json");
  renderTopCategoryTours(section, data, filters);
  return data;
}

export async function getNewsData(section, filters = {}) {
  const data = await fetchJson("./src/data/news.json");
  renderNews(section, data, filters);
  return data;
}

export async function getHotelsData(section, filters = {}) {
  const data = await fetchJson("./src/data/hotel.json");
  variables.hotels = data;
  renderHotels(section, variables.hotels, filters);
  return data;
}

export async function getTestimonialsData(section) {
  const data = await fetchJson("./src/data/testimonial.json");
  renderTestimonials(section, data);
  return data;
}
