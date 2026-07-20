// Modal Overlay
export function singUpModalOverlay(){
    const signupBtns = document.querySelectorAll("#signupBtn");
    const modalOverlay = document.getElementById("modalOverlay");
    const closeBtn = document.getElementById("closeBtn");
    const signupForm = document.getElementById("signupForm");
    const successMessage = document.getElementById("successMessage");
    const signupFormElement = document.getElementById("signupFormElement");
    
    // Open modal
    signupBtns.forEach((signupBtn) => {
      signupBtn.addEventListener("click", () => {
        modalOverlay.classList.remove("hidden");
        modalOverlay.classList.add("flex");
        signupForm.classList.remove("hidden");
        successMessage.classList.add("hidden");
      });
    });
    
    // Close modal (X button)
    closeBtn.addEventListener("click", closeModal);
    
    // Close modal when clicking outside the form
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
    
    function closeModal() {
      modalOverlay.classList.add("hidden");
      modalOverlay.classList.remove("flex");
    }
    
    // Handle form submission
    signupFormElement.addEventListener("submit", (e) => {
      e.preventDefault();
    
      // Hide form, show success message
      signupForm.classList.add("hidden");
      successMessage.classList.remove("hidden");
    
      // Auto close after 2 seconds
      setTimeout(() => {
        closeModal();
        signupFormElement.reset();
      }, 2000);
    });
}
