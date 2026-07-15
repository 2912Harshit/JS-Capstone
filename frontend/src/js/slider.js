export function createSlider({
    slider,
    nextBtn,
  prevBtn,
  getVisibleCards,
  gap = 16,
}) {
    
    console.log(slider);
  let currentIndex = 0;

  function maxIndex() {
    return Math.max(0, slider.children.length - getVisibleCards());
  }

  function moveSlider() {
    if (!slider.children.length) return;

    const move = slider.children[0].offsetWidth + gap;

    slider.style.transform = `translateX(-${currentIndex * move}px)`;
  }

  function updateButtons() {
    const max = maxIndex();

    prevBtn.classList.toggle("bg-gray-300", currentIndex > 0);

    nextBtn.classList.toggle("bg-gray-300", currentIndex < max);
  }

  function next() {
    if (currentIndex >= maxIndex()) return;

    currentIndex++;

    moveSlider();

    updateButtons();
  }

  function prev() {
    if (currentIndex <= 0) return;

    currentIndex--;

    moveSlider();

    updateButtons();
  }

  function refresh() {
    const max = maxIndex();

    if (currentIndex > max) {
      currentIndex = max;
    }

    moveSlider();

    updateButtons();
  }

  function setCurrentIndex(index){
    currentIndex=index;
  }
  nextBtn.addEventListener("click", next);

  prevBtn.addEventListener("click", prev);

  let resizeTimeout;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(refresh, 150);
  });

  refresh();

  return {
    refresh,
    next,
    prev,
    setCurrentIndex
  };
}

export function getVisibleCards() {
  if (window.innerWidth < 640) return 1;

  if (window.innerWidth < 1024) return 2;

  return 3;
}
