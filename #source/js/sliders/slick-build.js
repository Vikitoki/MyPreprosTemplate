// Bild Swiper Slider ============================================================================

// Example =====================
// <div class = "_swiper"></div>

// Default

let sliders = document.querySelectorAll(".swiper");

if (sliders.length > 0) {
  sliders.forEach((slider) => {
    if (!slider.classList.contains("swiper-bild")) {
      let sliderItems = slider.children;

      let sliderWrapper = document.createElement("div");
      sliderWrapper.classList.add("swiper-wrapper");

      for (let index = 0; index < sliderItems.length; index++) {
        let sliderItem = sliderItems[index];

        let slideForWrapper = document.createElement("div");
        slideForWrapper.className = "swiper-slide";

        let sliderItemWrapper = document.createElement("div");
        sliderItemWrapper.className = sliderItem.getAttribute("class");
        sliderItemWrapper.innerHTML = sliderItem.innerHTML;

        slideForWrapper.append(sliderItemWrapper);
        sliderWrapper.append(slideForWrapper);
      }

      slider.innerHTML = "";
      slider.append(sliderWrapper);
      slider.classList.add("swiper-bild");
    }
  });
}