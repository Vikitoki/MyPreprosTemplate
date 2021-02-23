//  Dynamic adapt ===============================================

// data-move = '.div1,0,752'

$("[data-move]").each(function () {
  let dataMoveValues = $(this).data("move");
  const object = $(this);
  const parent = object.parent();
  let [classAppendTo, position, mediaPoint] = dataMoveValues.split(",");

  startResize(object, parent, classAppendTo, position, mediaPoint);

  $(window).resize(function () {
    startResize(object, parent, classAppendTo, position, mediaPoint);
  });
});

function startResize(object, parent, classAppendTo, position, mediaPoint) {
  adaptiveFunction(object, parent, classAppendTo, position, mediaPoint);
}

function adaptiveFunction(object, parent, classAppendTo, position, mediaPoint) {
  let windowWidth = $(window).outerWidth(),
    windowHeight = $(window).outerHeight();

  adaptiveHeader(
    windowWidth,
    windowHeight,
    classAppendTo,
    position,
    mediaPoint,
    object,
    parent
  );
  // console.log(classAppendTo,position,mediaPoint,object,dataMoveParent)
}

function adaptiveHeader(
  windowWidth,
  windowHeight,
  classAppendTo,
  position,
  mediaPoint,
  object,
  parent
) {
  let headerMenu = $(`${classAppendTo}`), // Куда добавить
    headerContact = object; // Что добавить

  if (windowWidth <= mediaPoint) {
    if (!headerContact.hasClass("done")) {
      headerContact.addClass("done").appendTo(headerMenu);
    }
  } else if (headerContact.hasClass("done")) {
    headerContact.removeClass("done").prependTo(parent); // Родительский блок headerContact
  }
}

// $('input').eq(6).after('<p>Hello</p>');

//  Scroll spy ===============================================

$("[data-scrollspy]").each(function () {
  let sectionId = $(this).data("scrollspy"),
    sectionOffSetTop = $(this).offset().top,
    sectionHeight = $(sectionId).innerHeight();

  if (
    scrollTop >= sectionOffSetTop - $(window).innerHeight() / 3 &&
    scrollTop <= sectionOffSetTop + sectionHeight
  ) {
    $("#navHeader [data-scroll-to]").removeClass("active");
    $(`#navHeader [data-scroll-to = "${sectionId}"]`).addClass("active");
  } else if (scrollTop <= introHeight - $(window).innerHeight() / 3) {
    $("#navHeader [data-scroll-to]").removeClass("active");
  } else {
    $(`#navHeader [data-scroll-to = "${sectionId}"]`).removeClass("active");
  }
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
