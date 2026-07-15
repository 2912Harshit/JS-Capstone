(function () {
  "use strict";

  const CFG = window.CHATBOT_CONFIG || {};
  const API_KEY = CFG.OPENROUTER_API_KEY || "";
  const MODEL = CFG.MODEL || "tencent/hy3:free";
  const SITE_NAME = CFG.SITE_NAME || "Travila";
  const PRIMARY = CFG.PRIMARY_COLOR || "#f59e0b";

  let knowledgeBase = null;
  let conversationHistory = [];
  let isTyping = false;
  let isOpen = false;
  let chatMessages,
    chatTagsEl,
    chatInput,
    chatForm,
    typingIndicator,
    chatPanel,
    iconOpen,
    iconClose;

  const TAGS = [
    { label: "🚗 Cars", category: "cars" },
    { label: "🏨 Hotels", category: "hotels" },
    { label: "🗺️ Tours", category: "tours" },
    { label: "📰 News", category: "news" },
    { label: "📋 How to Book", category: "howto" },
  ];

  const PREDEFINED_RESPONSES = {
    cars: "🚗 We have a range of cars available — from sedans to luxury SUVs. Want me to list some options?",
    hotels:
      "🏨 We offer top-rated hotels and travel experiences worldwide. Want to see some picks?",
    tours:
      "🗺️ Explore adventure, cultural, and scenic tours. Want me to show you a few?",
    news: "📰 Check out our latest travel guides and articles. Want to see recent posts?",
  };

  const WELCOME_MESSAGE = `👋 Hi there! I'm your ${SITE_NAME} assistant. Ask me anything about cars, hotels, tours, or bookings — or tap a category below to get started!`;

  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeInUp { from { opacity:0; transform: translateY(8px);} to {opacity:1; transform: translateY(0);} }
      .animate-fade-in-up { animation: fadeInUp .25s ease-out; }
      @keyframes chatPulse { 0%,100%{ box-shadow: 0 0 0 0 rgba(17,24,39,.25);} 50%{ box-shadow: 0 0 0 12px rgba(17,24,39,0);} }
      .animate-chat-pulse { animation: chatPulse 2.5s infinite; }
      .no-scrollbar::-webkit-scrollbar{ display:none; }
      .no-scrollbar{ scrollbar-width:none; }
      #chat-messages::-webkit-scrollbar{ width:6px; }
      #chat-messages::-webkit-scrollbar-thumb{ background:#e5e7eb; border-radius:10px; }
    `;
    document.head.appendChild(style);
  }

  function injectWidget() {
    const root = document.getElementById("ai-chatbot-root");
    if (!root) {
      console.error('Add <div id="ai-chatbot-root"></div> to your HTML.');
      return;
    }
    root.innerHTML = `
      <button id="chat-toggle-btn" aria-label="Open chat" class="fixed bottom-6 right-6 z-[999] w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-xl flex items-center justify-center bg-gray-900 text-white hover:scale-105 transition-transform duration-300 animate-chat-pulse">
        <svg id="chat-icon-open" class="w-7 h-7 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.05 0-2.05-.14-2.98-.4L3 21l1.5-4.5A7.94 7.94 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        <svg id="chat-icon-close" class="w-7 h-7 sm:w-9 sm:h-9 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      <div id="chat-panel" class="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-[999] w-auto sm:w-[540px] h-[70vh] sm:h-[770px] max-h-[600px] sm:max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden opacity-0 scale-95 pointer-events-none transition-all duration-300 origin-bottom-right border border-gray-200">

        <div class="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 bg-white border-b border-gray-100 flex-shrink-0">
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-100 flex items-center justify-center text-xl sm:text-2xl">🤖</div>
            <div>
              <p class="font-semibold text-lg sm:text-xl text-gray-900">${SITE_NAME} Assistant</p>
              <p class="text-sm sm:text-base text-gray-500 flex items-center gap-1.5 mt-1">
                <span class="w-2.5 h-2.5 bg-green-500 rounded-full inline-block"></span>Online now
              </p>
            </div>
          </div>
          <button id="chat-close-btn" aria-label="Close chat" class="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2.5 transition">
            <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div id="chat-messages" class="flex-1 overflow-y-auto px-5 sm:px-6 py-5 sm:py-6 space-y-5 bg-white"></div>

        <div id="typing-indicator" class="hidden px-5 sm:px-6 pb-3 flex-shrink-0">
          <div class="flex gap-1.5 items-center bg-gray-100 w-fit px-5 py-3 rounded-full">
            <span class="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay:-0.3s"></span>
            <span class="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay:-0.15s"></span>
            <span class="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></span>
          </div>
        </div>

        <div id="chat-tags" class="flex gap-2.5 px-5 sm:px-6 py-3.5 sm:py-4 overflow-x-auto border-t border-gray-100 bg-white no-scrollbar flex-shrink-0"></div>

        <form id="chat-form" class="flex items-center gap-3 p-4 sm:p-5 border-t border-gray-100 bg-white flex-shrink-0">
          <input id="chat-input" type="text" placeholder="Ask about cars, hotels, tours..." autocomplete="off"
            class="flex-1 px-5 py-3.5 sm:py-4 rounded-full bg-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white text-base sm:text-lg text-gray-800 placeholder-gray-400 transition"/>
          <button type="submit" aria-label="Send"
            class="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-gray-900 text-white flex-shrink-0 hover:bg-gray-800 transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </form>
      </div>
    `;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function formatText(text) {
    return escapeHtml(text)
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  function appendMessage(role, text) {
    const wrapper = document.createElement("div");
    wrapper.className = `flex ${role === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`;
    const bubble = document.createElement("div");
    bubble.className =
      role === "user"
        ? "max-w-[88%] sm:max-w-[85%] bg-gray-900 text-white text-base sm:text-lg leading-relaxed px-5 py-3.5 rounded-3xl rounded-br-lg"
        : "max-w-[88%] sm:max-w-[85%] bg-gray-100 text-gray-800 text-base sm:text-lg leading-relaxed px-5 py-3.5 rounded-3xl rounded-bl-lg";
    bubble.innerHTML = formatText(text);
    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTyping() {
    typingIndicator.classList.remove("hidden");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  function hideTyping() {
    typingIndicator.classList.add("hidden");
  }
  function trimHistory() {
    if (conversationHistory.length > 20)
      conversationHistory = conversationHistory.slice(-20);
  }

  // ---------- Data formatters (based on your real JSON structure) ----------

  function formatCars(cars) {
    if (!Array.isArray(cars) || !cars.length) return "";
    const lines = cars
      .slice(0, 15)
      .map(
        (c) =>
          `- ${c.brand} ${c.model} | Location: ${c.location} | Price: $${c.price}/day | Transmission: ${c.transmission} | Fuel: ${c.fuel} | Seats: ${c.seats} | Rating: ${c.rating} (${c.reviews} reviews) | Mileage: ${c.mileage}km`,
      )
      .join("\n");
    return `### CARS AVAILABLE\n${lines}`;
  }

  function formatHotels(hotels) {
    if (!Array.isArray(hotels) || !hotels.length) return "";
    const lines = hotels
      .slice(0, 15)
      .map(
        (h) =>
          `- ${h.title} | Location: ${h.location} | Price: $${h.price} | Rating: ${h.rating}/5 (${h.reviews} reviews)`,
      )
      .join("\n");
    return `### HOTELS & EXPERIENCES\n${lines}`;
  }

  function formatTours(tours) {
    if (!Array.isArray(tours) || !tours.length) return "";
    const lines = tours
      .slice(0, 15)
      .map(
        (t) =>
          `- ${t.title} | Category: ${t.category} | Duration: ${t.days} days ${t.nights} nights | Price: $${t.price} | Rating: ${t.rating}/5 (${t.reviews} reviews)`,
      )
      .join("\n");
    return `### TOURS\n${lines}`;
  }

  function formatNews(news) {
    if (!Array.isArray(news) || !news.length) return "";
    const lines = news
      .slice(0, 10)
      .map(
        (n) =>
          `- "${n.title}" | Category: ${n.category} | Date: ${n.date} | Read time: ${n.readTime} | Author: ${n.author?.name || "Unknown"}`,
      )
      .join("\n");
    return `### NEWS & ARTICLES\n${lines}`;
  }

  function formatTopCategories(cats) {
    if (!Array.isArray(cats) || !cats.length) return "";
    const lines = cats
      .slice(0, 10)
      .map(
        (c) =>
          `- ${c.title}: ${c.tours} tours, ${c.activities} activities available`,
      )
      .join("\n");
    return `### TOP TOUR CATEGORIES\n${lines}`;
  }

  function formatSearchTypes(search) {
    if (!Array.isArray(search) || !search.length) return "";
    const types = [...new Set(search.map((s) => s.type))];
    return `### BOOKABLE TYPES\nUsers can search/filter by: ${types.join(", ")}. Each listing includes location, price, rating, reviews, and availability for check-in/check-out dates or guest counts.`;
  }

  function buildSystemPrompt(userMessage = "") {
    if (!knowledgeBase) {
      return `You are an assistant for "${SITE_NAME}". Data is still loading — tell the user to try again in a moment.`;
    }

    const msg = userMessage.toLowerCase();
    const sections = [];

    const wantsCars =
      !userMessage ||
      msg.includes("car") ||
      msg.includes("rent") ||
      msg.includes("drive");
    const wantsHotels =
      !userMessage ||
      msg.includes("hotel") ||
      msg.includes("stay") ||
      msg.includes("room");
    const wantsTours =
      !userMessage ||
      msg.includes("tour") ||
      msg.includes("trip") ||
      msg.includes("activit");
    const wantsNews =
      !userMessage ||
      msg.includes("news") ||
      msg.includes("article") ||
      msg.includes("blog");
    const wantsCategories = !userMessage || msg.includes("categor");
    const wantsBooking =
      !userMessage ||
      msg.includes("book") ||
      msg.includes("reserv") ||
      msg.includes("process") ||
      msg.includes("how");

    if (wantsCars) sections.push(formatCars(knowledgeBase.cars));
    if (wantsHotels) sections.push(formatHotels(knowledgeBase.hotels));
    if (wantsTours) sections.push(formatTours(knowledgeBase.tours));
    if (wantsNews) sections.push(formatNews(knowledgeBase.news));
    if (wantsCategories)
      sections.push(formatTopCategories(knowledgeBase.topCategories));

    const dataText =
      sections.filter(Boolean).join("\n\n") ||
      "No specific matching data found — politely tell the user and suggest browsing the site categories.";

    let bookingInfo = "";
    if (wantsBooking) {
      const bp = knowledgeBase.bookingInfo?.bookingProcess;
      if (bp) {
        bookingInfo = `\n\n### HOW TO BOOK\n`;
        bookingInfo += bp.steps.map((s, i) => `${i + 1}. ${s}`).join("\n");
        bookingInfo += `\n\nCancellation policy: ${bp.cancellation}`;
        bookingInfo += `\nSupport: ${bp.support}`;
      }
    }

    return `You are a helpful, friendly assistant for "${knowledgeBase.bookingInfo?.siteName || SITE_NAME}", a travel booking platform offering cars, hotels, tours, and rentals.

STRICT RULES:
- Only answer using the DATA provided below. Never invent details not listed here.
- If asked HOW to book, use the "HOW TO BOOK" section to explain the exact steps.
- Keep answers SHORT: 2-4 sentences or a brief bullet list. Do not write long paragraphs.
- Use **bold** for names and prices.

DATA:
${dataText}
${bookingInfo}`;
  }

  // ---------- Category quick-reply logic ----------

  function getCategoryAnswer(category) {
    if (!knowledgeBase) return "Let me look into that for you!";

    const map = {
      cars: {
        data: knowledgeBase.cars,
        formatter: (c) =>
          `**${c.brand} ${c.model}** — $${c.price}/day, ${c.seats} seats, ⭐${c.rating} (${c.reviews} reviews)`,
      },
      hotels: {
        data: knowledgeBase.hotels,
        formatter: (h) =>
          `**${h.title}** — $${h.price}, ⭐${h.rating} (${h.reviews} reviews), ${h.location}`,
      },
      tours: {
        data: knowledgeBase.tours,
        formatter: (t) =>
          `**${t.title}** — $${t.price}, ${t.days}D/${t.nights}N, ⭐${t.rating} (${t.reviews} reviews)`,
      },
      news: {
        data: knowledgeBase.news,
        formatter: (n) => `**${n.title}** — ${n.category}, ${n.readTime} read`,
      },
    };

    const entry = map[category];
    if (!entry || !Array.isArray(entry.data) || entry.data.length === 0) {
      return (
        PREDEFINED_RESPONSES[category] ||
        `We don't have ${category} listed right now. Check back soon!`
      );
    }

    const preview = entry.data.slice(0, 4).map(entry.formatter).join("\n");
    return `Here's what we have for ${category}:\n\n${preview}\n\nWant more details, or need help booking?`;
  }

  function getBookingProcessAnswer() {
    const bp = knowledgeBase?.bookingInfo?.bookingProcess;
    if (!bp) {
      return "To book: browse a category, select an item, fill in your details in the form, and click Confirm Booking. Need more help? Just ask!";
    }
    const steps = bp.steps.map((s, i) => `${i + 1}. ${s}`).join("\n");
    return `📋 **How to book:**\n\n${steps}`;
  }

  function handleTagClick(tag) {
    if (isTyping) return;
    appendMessage("user", tag.label);
    conversationHistory.push({ role: "user", content: tag.label });
    showTyping();
    isTyping = true;
    setTimeout(() => {
      const answer =
        tag.category === "howto"
          ? getBookingProcessAnswer()
          : getCategoryAnswer(tag.category);
      appendMessage("bot", answer);
      conversationHistory.push({ role: "assistant", content: answer });
      trimHistory();
      hideTyping();
      isTyping = false;
    }, 500);
  }

  function renderTags() {
    chatTagsEl.innerHTML = TAGS.map(
      (t) =>
        `<button data-category="${t.category}" class="tag-btn flex-shrink-0 px-4 py-2.5 rounded-full bg-gray-100 text-gray-700 text-sm sm:text-base font-medium hover:bg-amber-100 hover:text-amber-800 transition whitespace-nowrap">${t.label}</button>`,
    ).join("");
    chatTagsEl.querySelectorAll(".tag-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tag = TAGS.find((t) => t.category === btn.dataset.category);
        if (tag) handleTagClick(tag);
      });
    });
  }

  // ---------- OpenRouter API call ----------

  async function callOpenRouter() {
    if (!API_KEY || API_KEY.includes("PASTE_YOUR")) {
      throw new Error(
        "Missing API key. Add your OpenRouter API key in chatbot/config.js",
      );
    }
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": SITE_NAME,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...conversationHistory,
        ],
        temperature: 0.5,
        max_tokens: 5000,
      }),
    });
    if (!res.ok)
      throw new Error(`API error ${res.status}: ${await res.text()}`);
    const data = await res.json();
    console.log("RAW OPENROUTER RESPONSE:", data); // 👈 TEMP DEBUG LINE
    return (
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response."
    );
  }

  async function sendMessage(rawText) {
    const text = (rawText || "").trim();
    if (!text || isTyping) return;
    appendMessage("user", text);
    conversationHistory.push({ role: "user", content: text });
    chatInput.value = "";
    showTyping();
    isTyping = true;
    try {
      const reply = await callOpenRouter();
      appendMessage("bot", reply);
      conversationHistory.push({ role: "assistant", content: reply });
    } catch (err) {
      console.error(err);
      appendMessage(
        "bot",
        "⚠️ Sorry, something went wrong. " +
          (err.message.includes("API key")
            ? "Please add a valid API key."
            : "Please try again shortly."),
      );
    } finally {
      trimHistory();
      hideTyping();
      isTyping = false;
    }
  }

  function toggleChat() {
    isOpen = !isOpen;
    if (isOpen) {
      chatPanel.classList.remove(
        "opacity-0",
        "scale-95",
        "pointer-events-none",
      );
      chatPanel.classList.add("opacity-100", "scale-100");
      iconOpen.classList.add("hidden");
      iconClose.classList.remove("hidden");
      chatInput.focus();
    } else {
      chatPanel.classList.add("opacity-0", "scale-95", "pointer-events-none");
      chatPanel.classList.remove("opacity-100", "scale-100");
      iconOpen.classList.remove("hidden");
      iconClose.classList.add("hidden");
    }
  }

  // ---------- Knowledge base loading ----------

  async function loadKnowledgeBase() {
    const files = {
      cars: "./src/data/cars_cards.json",
      hotels: "./src/data/hotel.json",
      news: "./src/data/news.json",
      search: "./src/data/search.json",
      topCategories: "./src/data/topCategoryTours.json",
      tours: "./src/data/tour_cards.json",
      bookingInfo: "chatbot/booking-info.json",
    };

    knowledgeBase = {};

    await Promise.all(
      Object.entries(files).map(async ([key, path]) => {
        try {
          const res = await fetch(path);
          if (res.ok) {
            const data = await res.json();
            knowledgeBase[key] = data;
          } else {
            console.warn(`chatbot: ${path} returned ${res.status}`);
          }
        } catch (e) {
          console.warn(`chatbot: could not load ${path}`, e);
        }
      }),
    );

    console.log("chatbot: knowledge base loaded", knowledgeBase);
  }

  function init() {
    injectStyles();
    injectWidget();
    chatMessages = document.getElementById("chat-messages");
    chatTagsEl = document.getElementById("chat-tags");
    chatInput = document.getElementById("chat-input");
    chatForm = document.getElementById("chat-form");
    typingIndicator = document.getElementById("typing-indicator");
    chatPanel = document.getElementById("chat-panel");
    iconOpen = document.getElementById("chat-icon-open");
    iconClose = document.getElementById("chat-icon-close");

    document
      .getElementById("chat-toggle-btn")
      .addEventListener("click", toggleChat);
    document
      .getElementById("chat-close-btn")
      .addEventListener("click", toggleChat);
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      sendMessage(chatInput.value);
    });

    renderTags();
    appendMessage("bot", WELCOME_MESSAGE);
    loadKnowledgeBase();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
