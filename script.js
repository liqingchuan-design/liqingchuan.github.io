const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const images = Array.from(carousel.querySelectorAll(".carousel-track img"));
  const dots = carousel.querySelector(".carousel-dots");
  const previous = carousel.querySelector(".carousel-control.prev");
  const next = carousel.querySelector(".carousel-control.next");
  let activeIndex = images.findIndex((image) => image.classList.contains("is-active"));

  if (!images.length || !dots) return;

  if (activeIndex < 0) activeIndex = 0;

  const dotButtons = images.map((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Show project image ${index + 1}`);
    button.addEventListener("click", () => showImage(index));
    dots.appendChild(button);
    return button;
  });

  function showImage(index) {
    activeIndex = (index + images.length) % images.length;
    images.forEach((image, imageIndex) => {
      image.classList.toggle("is-active", imageIndex === activeIndex);
    });
    dotButtons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === activeIndex);
      button.setAttribute("aria-current", buttonIndex === activeIndex ? "true" : "false");
    });
  }

  previous?.addEventListener("click", () => showImage(activeIndex - 1));
  next?.addEventListener("click", () => showImage(activeIndex + 1));
  showImage(activeIndex);
});
