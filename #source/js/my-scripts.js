document.addEventListener("DOMContentLoaded", function () {
  // Burger btn ===============================================

  const burgerMenuBtn = document.querySelector("#burgerMenu"),
    headerMenuBody = document.querySelector(".menu-header__body"),
    header = document.querySelector(".header");

  burgerMenuBtn.addEventListener("click", function (event) {
    event.preventDefault();

    headerMenuBody.classList.toggle("active");
    header.classList.toggle("active");
    this.classList.toggle("active");
  });

  //   Filter group ===============================================

  let cat = $("[data-filter]");

  cat.on("click", function (event) {
    event.preventDefault();

    let catBox = $(this).data("filter");

    $("[data-cat]").animate({ opacity: "0" }, 200);

    if (catBox === "all") {
      setTimeout(function () {
        $("[data-cat]").css({
          display: "block",
          opacity: "1",
        });
      }, 300);
    } else {
      $("[data-cat]").each(function () {
        let catWork = $(this).data("cat");

        if (catWork != catBox) {
          $(this).animate({ opacity: "0" }, 200);
          setTimeout(function () {
            $(`[data-cat = '${catWork}']`).css("display", "none");
          }, 300);
        } else {
          setTimeout(function () {
            $(`[data-cat = '${catWork}']`).css("display", "block");
          }, 300);

          $(this).animate({ opacity: "1" }, 200);
        }
      });
    }
  });

  //  Scroll section  ===============================================

  $("[data-section]").on("click", function (event) {
    event.preventDefault();

    let dataBox = $(this).data("section"),
      dataOffSet = $(dataBox).offset().top;

    $("html , body").animate(
      {
        scrollTop: dataOffSet - $(window).innerHeight() / 5,
      },
      700
    );
  });

  //  Spy scroll section  ===============================================

  const ScrollSpySections = document.querySelectorAll("[data-scrollspy]"),
    NavHeaderLinks = document.querySelectorAll("[data-scroll-to]");

  scrollSpy();
  window.addEventListener("scroll", function () {
    scrollSpy();
  });

  function scrollSpy() {
    let windowScrollTop = window.pageYOffset;

    ScrollSpySections.forEach((section, index) => {
      let sectionId = section.dataset.scrollspy,
        sectionOffSetTop = section.scrollTop,
        sectionHeight = section.clientHeight;

      if (
        windowScrollTop >=
          sectionOffSetTop - document.documentElement.clientHeight / 3 &&
        windowScrollTop <= sectionOffSetTop + sectionHeight
      ) {
        NavHeaderLinks.forEach((link) => {
          link.classList.remove("active");

          if (link.dataset.scrollTo === sectionId) {
            link.classList.add("active");
          }
        });
      } else if (
        windowScrollTop <= document.querySelector(".intro").clientHeight
      ) {
        NavHeaderLinks.forEach((link) => {
          link.classList.remove("active");
        });
      }
    });
  }

  // Turn img to background ===========================================

  const ibgBlocks = document.querySelectorAll("._ibg");

  function setImgToBackground() {
    ibgBlocks.forEach((block) => {
      let image = block.document.querySelector("img");

      block.classList.cssText = `
			background: url(${image.getAttribute("src")}) center no-repeat';
			background-size : cover;
		`;

      image.style.display = "none";
    });
  }

  setImgToBackground();

  // Check categories for many select================================================

  let categoriesInputs = document.querySelectorAll(".checkbox__input"),
    categoriesText = document.querySelectorAll(".checkbox__text"),
    checkedInputs = [],
    selectTitle = document.querySelector(".search-intro__title");

  categoriesInputs.forEach((input, index) => {
    input.addEventListener("click", function (event) {
      if (input.checked) {
        if (!checkedInputs.includes(input)) {
          checkedInputs.push(input);
          categoriesText[index].classList.add("active");
        }
      } else {
        if (checkedInputs.includes(input)) {
          checkedInputs = checkedInputs.filter((item) => item !== input);
          categoriesText[index].classList.remove("active");
        }
      }
      if (checkedInputs.length <= 0) {
        selectTitle.textContent = "Везде";
      } else {
        if (windowWith < 480) {
          selectTitle.textContent = `${checkedInputs.length} категории`;
        } else {
          selectTitle.textContent = `Выбрано ${checkedInputs.length} категории`;
        }
      }
    });
  });

  // Quantity ===================================================================

  const quantityArrowPrev = document.querySelector(".quantity__arrow_prev"),
    quantityArrowNext = document.querySelector(".quantity__arrow_next"),
    quantityInput = document.querySelector(".quantity__input input");

  quantityArrowPrev.addEventListener("click", function (event) {
    event.preventDefault();

    let inputValue = quantityInput.value;

    console.log(inputValue);
    if (+inputValue <= 0) {
      return;
    }

    quantityInput.value = --inputValue;
  });

  quantityArrowNext.addEventListener("click", function (event) {
    event.preventDefault();

    let inputValue = quantityInput.value;

    console.log(inputValue);
    if (+inputValue < 0) {
      return;
    }

    quantityInput.value = ++inputValue;
  });

  // Bild Swiper Slider ============================================================================

  // Example =====================
  // <div class = "_swiper"></div>

  // Default

  let sliders = document.querySelectorAll("._swiper");

  if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
      let slider = sliders[index];

      if (!slider.classList.contains("swiper-bild")) {
        // Берутся дочерние элементы слайдера
        let sliderItems = slider.children;

        // Дочерним элементам слайдера присваевается классы слайдов
        if (sliderItems) {
          for (let index = 0; index < sliderItems.length; index++) {
            let el = sliderItems[index];
            el.classList.add("swiper-slide");
          }
        }

        // Создаётся обёртка и в неё погружается контент слайда
        let sliderContent = slider.innerHTML;
        let sliderWrapper = document.createElement("div");
        sliderWrapper.classList.add("swiper-wrapper");
        sliderWrapper.innerHTML = sliderContent;

        slider.innerHTML = "";
        slider.appendChild(sliderWrapper);
        slider.classList.add("swiper-bild");

        if (slider.classList.contains("_swiper_scroll")) {
          let sliderScroll = document.createElement("div");
          sliderScroll.classList.add("swiper-scrollbar");
          slider.appendChild(sliderScroll);
        }
      }
    }
  }

  // Scroll

  let sliderScrollItems = document.querySelectorAll("._swiper_scroll");
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar = sliderScrollItem.querySelector(
        ".swiper-scrollbar"
      );
      const sliderScroll = new Swiper(sliderScrollItem, {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false,
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      });
      sliderScroll.scrollbar.updateSize();
    }
  }

  //Slides element with effect ========================================================================================

  // Up ========================================================

  let _slideUp = (target, duration = 500) => {
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.style.display = "none";
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  };

  // Down ========================================================

  let _slideDown = (target, duration = 500) => {
    target.style.removeProperty("display");
    let display = window.getComputedStyle(target).display;
    if (display === "none") display = "block";

    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  };

  // Toggle ========================================================

  let _slideToggle = (target, duration = 500) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      if (window.getComputedStyle(target).display === "none") {
        return _slideDown(target, duration);
      } else {
        return _slideUp(target, duration);
      }
    }
  };
});
