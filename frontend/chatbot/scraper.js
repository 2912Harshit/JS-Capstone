// chatbot/scraper.js
// Scrapes the CURRENT page's DOM directly (single-page site: index.html)
// No fetch needed — works everywhere, even opened via file://

(function () {
  "use strict";

  function scrapeCurrentPage() {
    const pages = [];

    // 1. Preferred method: elements you've explicitly tagged with data-chatbot + data-category
    const taggedSections = document.querySelectorAll('[data-chatbot="true"]');

    if (taggedSections.length > 0) {
      // Group tagged content by category (data-category attribute), or "general" if none set
      const grouped = {};
      taggedSections.forEach((el) => {
        const category = el.getAttribute("data-category") || "general";
        const text = el.innerText.trim();
        if (!text) return;
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push(text);
      });

      Object.entries(grouped).forEach(([category, texts]) => {
        pages.push({
          title: category.charAt(0).toUpperCase() + category.slice(1),
          url: window.location.pathname,
          category,
          content: texts.join(" | ").slice(0, 1000),
        });
      });
    }

    // 2. Fallback / supplement: scrape sections by common ID/class naming (cars, hotels, rentals, deals, support)
    const knownSectionIds = [
      "cars",
      "hotels",
      "rentals",
      "deals",
      "support",
      "faq",
      "about",
      "contact",
    ];
    knownSectionIds.forEach((id) => {
      const el =
        document.getElementById(id) || document.querySelector(`.${id}`);
      if (el) {
        const text = el.innerText.trim();
        if (text && text.length > 20) {
          pages.push({
            title: id.charAt(0).toUpperCase() + id.slice(1),
            url: window.location.pathname + "#" + id,
            category: id,
            content: text.slice(0, 1000),
          });
        }
      }
    });

    // 3. Extra: grab all headings site-wide for general context (helps AI understand structure)
    const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
      .map((h) => h.innerText.trim())
      .filter(Boolean);

    // 4. Extra: grab anything that looks like a price, in case it's not tagged
    const priceMatches = [];
    document.querySelectorAll("body *").forEach((el) => {
      if (el.children.length === 0) {
        const text = el.innerText?.trim();
        if (text && /(\$|₹|€)\s?\d+/.test(text) && text.length < 60) {
          priceMatches.push(text);
        }
      }
    });

    if (pages.length === 0) {
      // Absolute fallback if nothing tagged/found: dump visible body text (capped)
      pages.push({
        title: "Page Content",
        url: window.location.pathname,
        category: "general",
        content: document.body.innerText
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 1500),
      });
    }

    return {
      pages,
      headings,
      prices: [...new Set(priceMatches)].slice(0, 20),
      scrapedAt: new Date().toISOString(),
    };
  }

  // Expose globally so chatbot.js can use it
  window.scrapeWebsiteData = function () {
    // Wrapped in Promise.resolve for consistency with chatbot.js's `await`
    return Promise.resolve(scrapeCurrentPage());
  };
})();
