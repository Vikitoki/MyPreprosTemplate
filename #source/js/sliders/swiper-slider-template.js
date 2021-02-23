if (document.querySelector(".")) {
  let myProductSlider = new Swiper(".", {
    loop: true,
    speed: 800,
    autoHeight: true,
    observer: true,
    observeParents: true,
    slidesPerGroup: 1,
    slidesPerView: 4,

    grabCursor: false,
    slideToClickedSlide: false,

    // Стрелки
    navigation: {
      nextEl: ".control-intro-products__arrow_next",
      prevEl: ".control-intro-products__arrow_prev",
    },

    // Пагинация
    pagination: {
      el: ".main-intro-content__pagination",
      // Буллеты
      type: "bullets",
      clickable: true,
    },

    // Автопрокрутка
    autoplay: {
      // Пауза между прокруткой
      delay: 5000,
      // Закончить на последнем слайде
      stopOnLastSlide: false,
      // Отключить после ручного переключения
      disableOnInteraction: false,
    },

    // Брейкпоинты
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1170: {
        slidesPerView: 5,
      },
    },
  });
}

// Полезные чанки для слайдера

// Get background to dots
const itemImages = document.querySelectorAll(".item-content-intro__image"),
  sliderIntroDotts = document.querySelectorAll(
    ".main-intro-content__pagination .swiper-pagination-bullet"
  );

sliderIntroDotts.forEach((item, index) => {
  let dotBackground = itemImages[index]
    .querySelector("img")
    .getAttribute("src");
  item.style.cssText = `
	background: url('${dotBackground}') center no-repeat;
	background-size: cover;
	`;
});
