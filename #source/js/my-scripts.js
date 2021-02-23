
// Header =================================================================================================

const burgerMenuBtn = document.querySelector(".menu-header__icon"),
  headerMobileMenu = document.querySelector(".header__mobile-menu"),
  header = document.querySelector(".header");

burgerMenuBtn.addEventListener("click", function (event) {
  event.preventDefault();

  toggleHeader();
});

window.addEventListener("resize", function () {
  toggleHeader();
});

document.documentElement.addEventListener("click", function (event) {
  if (event.target && !event.target.closest(".header")) {
    headerMobileMenu.classList.remove("active");
    header.classList.remove("active");
    burgerMenuBtn.classList.remove("active");
    document.body.classList.remove("lock");
  }
});

function toggleHeader() {
  headerMobileMenu.classList.toggle("active");
  header.classList.toggle("active");
  burgerMenuBtn.classList.toggle("active");
  document.body.classList.toggle("lock");
}

// Tabs ===============================================================================================

const contentBlocks = document.querySelectorAll(".tabcontent"),
  tabsItems = document.querySelectorAll(".tabheader__item"),
  tabsParent = document.querySelector(".tabheader__items");

function hideContentTabs() {
  contentBlocks.forEach((item) => item.classList.add("hide"));
  tabsItems.forEach((item) => item.classList.remove("tabheader__item_active"));
}

function showContentTabs(i = 0) {
  contentBlocks[i].classList.remove("hide");
  contentBlocks[i].classList.add("show");

  tabsItems[i].classList.add("tabheader__item_active");
}

function choosePreferedCategory() {
  tabsParent.addEventListener("click", function (event) {
    let target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabsItems.forEach((item, index) => {
        if (target === item) {
          hideContentTabs();
          showContentTabs(index);
        }
      });
    }
  });
}

hideContentTabs();
showContentTabs();
choosePreferedCategory();

// Timer ================================================================================================

const deadline = "2020-12-11";

function getTimeRemaining(endtime) {
  const deltaTime = Date.parse(endtime) - Date.parse(new Date()),
    days = Math.floor(deltaTime / (1000 * 60 * 60 * 24)),
    hours = Math.floor((deltaTime / (1000 * 60 * 60)) % 24),
    minutes = Math.floor((deltaTime / (1000 * 60)) % 60),
    seconds = Math.floor((deltaTime / 1000) % 60);

  return {
    total: deltaTime,
    days,
    hours,
    minutes,
    seconds,
  };
}

function getZero(number) {
  if (+number <= 9) {
    return `0${number}`;
  } else {
    return number;
  }
}

function setClock(selector, endtime) {
  const parent = document.querySelector(selector),
    days = parent.querySelector("#days"),
    hours = parent.querySelector("#hours"),
    minutes = parent.querySelector("#minutes"),
    seconds = parent.querySelector("#seconds"),
    timeInterval = setInterval(updateClock, 1000);

  updateClock();

  function updateClock() {
    const t = getTimeRemaining(endtime);

    days.textContent = getZero(t.days);
    hours.textContent = getZero(t.hours);
    minutes.textContent = getZero(t.minutes);
    seconds.textContent = getZero(t.seconds);

    if (+t.total <= 0) {
      clearInterval(timeInterval);
    }
  }
}

setClock(".timer", deadline);

// Modal Window ======================================================================================

// Values

const openModalBtns = document.querySelectorAll("[data-modal]"),
  modalWindow = document.querySelector(".modal");

// Main

openModalBtns.forEach((item) =>
  item.addEventListener("click", function (event) {
    event.preventDefault();

    openModal();
  })
);

modalWindow.addEventListener("click", function (event) {
  if (
    event.target === modalWindow ||
    event.target.getAttribute("data-close") === ""
  ) {
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (modalWindow.classList.contains("show") && event.code === "Escape") {
    closeModal();
  }
});

const modalTimerId = setTimeout(openModal, 60000);

window.addEventListener("scroll", showModalByScroll);

// Function

function closeModal() {
  modalWindow.classList.remove("show");
  document.body.classList.remove("no_scroll");
}

function openModal() {
  modalWindow.classList.add("show");
  document.body.classList.add("no_scroll");

  clearInterval(modalTimerId);
}

function showModalByScroll() {
  const htmlPage = document.documentElement;
  if (htmlPage.scrollTop + htmlPage.clientHeight >= htmlPage.scrollHeight) {
    openModal();
    window.removeEventListener("scroll", showModalByScroll);
  }
}

//  Spy scroll section  ======================================================================================

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

const quantityArrowsPrev = document.querySelectorAll(".quantity__arrow_prev"),
  quantityArrowsNext = document.querySelectorAll(".quantity__arrow_next"),
  quantityInputs = document.querySelectorAll(".quantity__input input");

quantityArrowsPrev.forEach((arrow, index) => {
  arrow.addEventListener("click", function (event) {
    event.preventDefault();

    let inputValue = quantityInputs[index].value;

    if (+inputValue <= 0) {
      return;
    }

    quantityInputs[index].value = --inputValue;
  });
});

quantityArrowsNext.forEach((arrow, index) => {
  arrow.addEventListener("click", function (event) {
    event.preventDefault();

    let inputValue = quantityInputs[index].value;

    if (+inputValue < 0) {
      return;
    }

    quantityInputs[index].value = ++inputValue;
  });
});
