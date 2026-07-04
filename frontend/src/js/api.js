// Handles data fetching, search, and form submission

export async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export function handleFormSubmission(formElement) {
  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    // Submit form data
    console.log("Form submitted:", Object.fromEntries(formData));
  });
}

export function searchData(data, query) {
  return data.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()),
  );
}
