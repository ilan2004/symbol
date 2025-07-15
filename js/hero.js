import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  const isHomePage = document.querySelector(".page.home-page");
  if (!isHomePage) return;

  gsap.registerPlugin(ScrollTrigger);

  const heroImg = document.querySelector(".hero-img img");

  // New set of images
  const imageNames = ["bebek", "burger", "jet", "palm", "tikka"];
  let currentImageIndex = 0;
  const totalImages = imageNames.length;
  let scrollTriggerInstance = null;

  // Set the initial image
  heroImg.src = `/images/work-items/${imageNames[currentImageIndex]}.jpg`;

  setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    heroImg.src = `/images/work-items/${imageNames[currentImageIndex]}.jpg`;
  }, 250);

  const initAnimations = () => {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
    }

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: ".hero-img-holder",
      start: "top bottom",
      end: "top top",
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(".hero-img", {
          y: `${-110 + 110 * progress}%`,
          scale: 0.25 + 0.75 * progress,
          rotation: -15 + 15 * progress,
        });
      },
    });
  };

  initAnimations();

  window.addEventListener("resize", () => {
    initAnimations();
  });
});
