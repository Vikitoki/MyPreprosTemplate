$(function () {
  $(".slider").slick({
    arrows: true,
    dots: true,
    adaptiveHeight: true, // Чтобы работало нужно написать align-items:flex-end в slick-track
    slidesToShow: 1, // Сколько слайдов на экране
    slidesToScroll: 1, // Сколько пролистывается за раз
    speed: 1000, // Скорость
    easing: "ease", // Тип анимации по умолчанию linear
    infinite: true, // Бесконечность слайда
    initialSlide: 3, // Стартовый слайд
    autoplay: true, // Автопролистывание
    autoplaySpeed: 4000, // Скорость автопролистывания
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: false, // Отключает свайп на декстопе, но на отсавляет его ативным на мобилках
    swipe: true, // Отключает свайп на мобилках
    touchThresHold: 5, // Увеличивает количество 1 свайпа (по умолчанию 5)
    touchMove: false, // Убирает тянучесть слайда по свайпу
    waitForAnimate: true, // Создаёт ожидание,пока слайдер прокрутиться(блокирует быструю перелистку по постоянно повторяющемуся нажатию)
    centerMode: false, // Очень классный мод,который убирает отступы между слайдами и центрирует их (появляется на активном слайдере класс slick-center для стилизации)
    variableWidth: false, // Полезное отображение слайдера,когда у нам не важна адаптация его конента(хорошо работает с centerMode)
    rows: 1, // Ряды слайда
    slidesPerRow: 1, // Столбы слайда (чтобы увидеть меняем rows)
    vertical: false, // Делает слайд вертекальным (обязательно выключить display:flex у родителя .slider slider-track путём изменения на display:block.Также полезно указать для slider_item конкретную высоту,чтобы он работал коректно)
    verticalSwiping: true, // Делает свайп вертикальным
    fade: false, // Эффект fade (не работает со стрелками,но с точками нормально)
    asNavFor: "", // Связывает работу двух слайдеров вместе(здесь нужно указать класс второго слайдера, а у него первого)
    responsive: [
      // Меняет определённые свойства при определённом брейкпоинте
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
    mobileFirst: false, // Меняет свойства респонсив в обратную сторону (было с 768 и ниже, станет с 768 и выше)
    // appendArrows: $(""), // Помещает стрелки в указанную секцию(стилизация пропадает)
    // appendDots: $(""), // Помещает точки в указанную секцию(стилизация пропадает)
  });

  //   Основные события слайдера

  $(".slider").on("beforeChange", function (
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    console.log(nextSlide);
  });

  $(".slider").on("afterChange", function (
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    console.log(currentSlide);
  });

  $(".slider").slick("setPosition");  // Обновляет слайдер
  $(".slider").slick("goTo",1); // Пролистывает до определённого слайда
  $(".slider").slick("slickPrev");  // Пролистывает до предыдущего
  $(".slider").slick("slickNext");  // Пролистывает до следующего (по сути стрелки)
  $(".slider").slick("slickPlay"); // Запускает автопрокрутку
  $(".slider").slick("slickPause"); // Останавливает автопрокрутку
  $(".slider").slick("slickAdd"); // Добавляет слайд , вторым аргументом принимает html разметку в стринг формате
  $(".slider").slick("slickRemove",0); // Удаляет слайд, второй аргумент - индекс
  $(".slider").slick("slickFilter");  // Фильтрует слайды , вторым аргументом принимает класс, который привязан к элементам (тоесть как только это будет применено, остануться только те итемы у которых есть данный класс)
  $(".slider").slick("slickUnfilter"); // Возвращает исходную сортировку
  
});
