/**
 * Display a toast notification
 * @param {string} message - The message to display
 * @param {string} type - 'success' | 'error' | 'warning' | 'info' (default: 'error')
 * @param {number} duration - Time in ms before auto-dismiss (default: 2000)
 */
function showToast(message, type = "error", duration = 2000) {
  const container = document.getElementById("toast-container");

  // Config for each toast type
  const config = {
    success: {
      bg: "bg-green-600",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>`,
    },
    error: {
      bg: "bg-red-600",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
    },
    warning: {
      bg: "bg-yellow-500",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>`,
    },
    info: {
      bg: "bg-blue-600",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
    },
  };

  // Fallback to error if invalid type given
  const { bg, icon } = config[type] || config.error;

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `
            flex items-center gap-3 ${bg} text-white px-4 py-3 rounded-lg shadow-lg
            min-w-[280px] max-w-sm transform transition-all duration-300 ease-out
            translate-x-full opacity-0
        `.trim();

  toast.innerHTML = `
            <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${icon}
            </svg>
            <span class="flex-1 text-sm font-medium">${message}</span>
            <button class="text-white/80 hover:text-white flex-shrink-0" onclick="this.parentElement.remove()">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        `;

  container.appendChild(toast);

  // Slide-in animation
  requestAnimationFrame(() => {
    toast.classList.remove("translate-x-full", "opacity-0");
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.add("translate-x-full", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Optional shortcut helpers
export const toast = {
  success: (msg, duration) => showToast(msg, "success", duration),
  error: (msg, duration) => showToast(msg, "error", duration),
  warning: (msg, duration) => showToast(msg, "warning", duration),
  info: (msg, duration) => showToast(msg, "info", duration),
};
