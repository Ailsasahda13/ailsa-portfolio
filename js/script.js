const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Menampilkan elemen saat masuk ke area layar
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll(".project-gallery").forEach((gallery) => {
  const slides = Array.from(gallery.querySelectorAll(".project-gallery-slide"));
  const controls = Array.from(gallery.querySelectorAll(".project-gallery-control"));
  const deviceScreen = gallery.closest(".device-screen");

  const updateAspectRatio = () => {
    const activeSlide = slides.find((slide) => slide.classList.contains("is-active"));
    if (deviceScreen && activeSlide && activeSlide.naturalWidth && activeSlide.naturalHeight) {
      deviceScreen.style.setProperty(
        "--screen-aspect-ratio",
        `${activeSlide.naturalWidth} / ${activeSlide.naturalHeight}`
      );
    }
  };

  slides.forEach((slide) => slide.addEventListener("load", updateAspectRatio));
  updateAspectRatio();

  controls.forEach((control, index) => {
    control.addEventListener("click", () => {
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === index;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      controls.forEach((item, controlIndex) => {
        const isActive = controlIndex === index;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      updateAspectRatio();
    });
  });
});

const imageLightbox = document.querySelector(".image-lightbox");
const lightboxImage = imageLightbox.querySelector(".image-lightbox-content");
const lightboxCaption = imageLightbox.querySelector(".image-lightbox-caption");
const lightboxClose = imageLightbox.querySelector(".image-lightbox-close");

document.querySelectorAll(".image-zoom-button").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    lightboxImage.src = image.currentSrc;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.alt;
    imageLightbox.showModal();
  });
});

lightboxClose.addEventListener("click", () => imageLightbox.close());
imageLightbox.addEventListener("click", (event) => {
  if (event.target === imageLightbox) {
    imageLightbox.close();
  }
});

// Menandai menu sesuai section yang sedang dibaca
const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((item) => {
        item.classList.toggle(
          "active",
          item.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));