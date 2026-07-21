import { toast } from "../features/toast/toast.js";

export async function fetchJson(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }

    return response.json();
  } catch (err) {
    toast.error("error with url", 2000);
    console.log(err.message);
  }
}
