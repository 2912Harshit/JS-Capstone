// ============================================================
// HERO SLIDER — with crossfade background + fading thumbnails
// ============================================================
// frontend\src\assets\images\temp photo_compressed.avif
export function initHeroSlider() {
  // ---------- SLIDE DATA (replace paths with your images) ----------
  const heroSlides = [
    {
      bg: "./src/assets/images/Hero bg.avif",
      title: "Unleash Your Wanderlust",
      subtitle: "Book Your Next Journey",
      thumbs: [
        "./src/assets/images/temp photo_compressed.avif",
        "./src/assets/images/temp photo_compressed.avif",
        "./src/assets/images/temp photo_compressed.avif",
      ],
    },
    {
      bg: "./src/assets/images/Hero-bg-2.png",
      title: "Explore the Peaks",
      subtitle: "Adventure Awaits You",
      thumbs: [
        "./src/assets/images/thumb.png.png",
        "./src/assets/images/thumb2.png.png",
        "./src/assets/images/thumb3.png.png",
      ],
    },
    // {
    //   bg: "./src/assets/images/hero-city.avif",
    //   title: "Discover City Lights",
    //   subtitle: "Urban Escapes & More",
    //   thumbs: [
    //     "./src/assets/images/city1.avif",
    //     "./src/assets/images/city2.avif",
    //     "./src/assets/images/city3.avif",
    //   ],
    // },
  ];

  // ---------- CONFIG ----------
  const FADE_DURATION = 500; // must match `duration-500` on text/thumbs
  const AUTOPLAY_DELAY = 5000;

  // ---------- DOM ELEMENTS ----------
  const heroSection = document.getElementById("heroSection");
  const bgLayerA = document.getElementById("bgLayerA");
  const bgLayerB = document.getElementById("bgLayerB");
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const heroThumbs = [
    document.getElementById("heroThumb0"),
    document.getElementById("heroThumb1"),
    document.getElementById("heroThumb2"),
  ].filter(Boolean);
  const nextBtn = document.getElementById("heroNext");
  const prevBtn = document.getElementById("heroPrev");

  // Guard: if section not on page, exit
  if (!heroSection) return;

  // ---------- STATE ----------
  let currentSlide = 0;
  let activeLayer = "A"; // which bg layer is currently visible
  let isAnimating = false; // block clicks mid-transition
  let autoTimer = null;

  // ---------- PRELOAD IMAGES (prevents flicker on first swap) ----------
  function preloadImages() {
    heroSlides.forEach((slide) => {
      [slide.bg, ...slide.thumbs].forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }

  // ---------- BACKGROUND CROSSFADE ----------
  function crossfadeBackground(url) {
    const showing = activeLayer === "A" ? bgLayerA : bgLayerB;
    const hidden = activeLayer === "A" ? bgLayerB : bgLayerA;

    hidden.style.backgroundImage = `url('${url}')`;
    // force reflow so the opacity transition fires reliably
    void hidden.offsetWidth;

    hidden.style.opacity = "1";
    showing.style.opacity = "0";

    activeLayer = activeLayer === "A" ? "B" : "A";
  }

  // ---------- RENDER A SLIDE (with fade) ----------
  function renderHeroSlide(index) {
    const slide = heroSlides[index];
    const fadeEls = [heroTitle, heroSubtitle, ...heroThumbs].filter(Boolean);

    isAnimating = true;

    // 1) fade OUT text + thumbnails
    fadeEls.forEach((el) => (el.style.opacity = "0"));

    // 2) crossfade background immediately (it has its own smooth fade)
    crossfadeBackground(slide.bg);

    // 3) after fade-out, swap text/thumb content, then fade IN
    setTimeout(() => {
      heroTitle.textContent = slide.title;
      heroSubtitle.textContent = slide.subtitle;
      heroThumbs.forEach((img, i) => {
        if (img && slide.thumbs[i]) img.src = slide.thumbs[i];
      });

      fadeEls.forEach((el) => (el.style.opacity = "1"));

      isAnimating = false;
    }, FADE_DURATION);
  }

  // ---------- NAVIGATION ----------
  function goToSlide(index) {
    if (isAnimating) return; // ignore rapid clicks
    currentSlide = (index + heroSlides.length) % heroSlides.length; // loop
    renderHeroSlide(currentSlide);
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // ---------- AUTOPLAY ----------
  function startAutoplay() {
    stopAutoplay();
    autoTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
  }
  function stopAutoplay() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
  }

  // ---------- EVENT LISTENERS ----------
  nextBtn?.addEventListener("click", () => {
    nextSlide();
    startAutoplay(); // reset timer after manual click
  });

  prevBtn?.addEventListener("click", () => {
    prevSlide();
    startAutoplay();
  });

  // pause autoplay while hovering the hero
  heroSection.addEventListener("mouseenter", stopAutoplay);
  heroSection.addEventListener("mouseleave", startAutoplay);

  // keyboard arrows (nice accessibility touch)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  // pause autoplay when tab is not visible (saves resources)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  // ---------- INIT ----------
  preloadImages();
  renderHeroSlide(currentSlide); // set first slide
  startAutoplay();
}
