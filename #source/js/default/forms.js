if (document.querySelector(".form__body")) {
  // Show password =====================================================
  const eyes = document.querySelectorAll(".body-form__item-eye");

  eyes.forEach((eye) => {
    const item = eye.closest(".body-form__item"),
      itemInput = item.querySelector("input");

    eye.addEventListener("click", function (event) {
      event.preventDefault();

      if (itemInput.getAttribute("type") === "text") {
        itemInput.setAttribute("type", "password");
      } else {
        itemInput.setAttribute("type", "text");
      }
    });
  });

  // Forms and modal ===================================================

  const forms = document.querySelectorAll("form"),
    modalThancks = document.querySelector(".modal-succes"),
    modalError = document.querySelector(".modal-error"),
    modalBtnError = document.querySelector(".modal-error__btn button"),
    modalBtnSuccess = document.querySelector(".modal-succes__btn button");

  // Common functions

  function goToPage(url, timeout = 1500) {
    setTimeout(function () {
      window.location.href = url;
    }, timeout);
  }

  // Modal actions

  modalBtnError.addEventListener("click", function (event) {
    closeModalWindow(event);
  });

  modalBtnSuccess.addEventListener("click", function (event) {
    closeModalWindow(event);
  });

  function closeModalWindow(event) {
    event.preventDefault();

    event.target.closest("._modal").classList.remove("show");
  }

  // Form actions

  forms.forEach((form) => {
    form.addEventListener("submit", formLoad);
  });

  function formLoad(event) {
    event.preventDefault();

    let form = event.target,
      error = formValidate(form);

    if (error !== 0) {
      alert("Заполните обязательные поля");
    } else {
      document.querySelectorAll("._registration-password").forEach((input) => {
        input.setAttribute("type", "password");
      });

      formActions(form);
    }
  }

  // Валидации формы в целом

  function formValidate(form) {
    let error = 0,
      formReq = form.querySelectorAll("._req"),
      inputsPassword = form.querySelectorAll("._registration-password"),
      inputsRadio = form.querySelectorAll("._req-or");

    if (inputsPassword.length > 0) {
      if (inputsPassword[0].value !== inputsPassword[1].value) {
        inputsPassword.forEach((input) => {
          formAddError(input);
        });
        error++;
        alert("Пароль должны совпадать");
        return;
      }
    }

    if (inputsRadio.length > 0) {
      let checkedNow = 0;

      inputsRadio.forEach((input) => {
        if (input.checked) {
          checkedNow++;
        }
      });

      if (!checkedNow) {
        inputsRadio.forEach((input) => input.classList.add("_error"));
        alert("Выберите к кому вы относитесь");
      } else {
        inputsRadio.forEach((input) => input.classList.remove("_error"));
      }
    }

    formReq.forEach((input) => {
      formRemoveError(input);

      if (input.value === "") {
        formAddError(input);
        error++;
      }

      if (input.classList.contains("_check")) {
        if (input.value.includes("@")) {
          input.setAttribute("type", "email");
        } else {
          input.setAttribute("type", "tel");
        }
      }

      // Валидации пароля

      if (input.classList.contains("_password")) {
        if (!validatePassword(input.value)) {
          alert(
            "Пароль должен содержать не менее 8 символов, включать хотя бы 1 строчную букву и 1 заглавнаую букву и 1 число"
          );
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute("type") === "checkbox" && !input.checked) {
        // Валидации чекбокса
        formAddError(input);
        error++;
        return;
      }
    });

    return error;
  }

  // Функции компонентов для валидации и тогл классов ошибок

  function formAddError(input) {
    input.classList.add("_error");
    input.parentElement.classList.add("_error");
  }

  function formRemoveError(input) {
    input.classList.remove("_error");
    input.parentElement.classList.remove("_error");
  }

  function validatePassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(String(password));
  }

  // Fetch funcions

  async function postData(url, data, loading) {
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      loading.classList.remove("show");
      modalError.classList.add("show");
      throw new Error(`Couldn't fetch post ${url} , status ${response.status}`);
    }

    console.log(`Данные успешно отправлены, статус ${response.status}`);

    return;
  }

  // Fetch body

  async function formActions(form) {
    const formData = new FormData(form),
      urlPost = "http://37.140.197.193/",
      formEnterLoading = document.querySelector(".enter-intro__loading"),
      formForgetLoading = document.querySelector(".forget-data__loading");

    if (form.classList.contains("body-form__first")) {
      formForgetLoading.classList.add("show");
      let checkInput = form.querySelector("#formLoginEmailOrTel");

      await postData(urlPost, formData, formForgetLoading);

      formForgetLoading.classList.remove("show");
      form.classList.remove("active");

      if (checkInput.type === "tel") {
        document.querySelector(".body-form__second").classList.add("active");
      } else {
        document.querySelector(".body-form__third").classList.add("active");
      }
    }

    if (form.classList.contains("body-form__second")) {
      formForgetLoading.classList.add("show");

      await postData(urlPost, formData, formForgetLoading);

      formForgetLoading.classList.remove("show");
      form.classList.remove("active");

      document.querySelector(".body-form__forth").classList.add("active");
    }

    if (form.classList.contains("body-form__second")) {
      formForgetLoading.classList.add("show");

      await postData(urlPost, formData, formForgetLoading);

      formForgetLoading.classList.remove("show");
      form.classList.remove("active");

      document.querySelector(".body-form__forth").classList.add("active");
    }

    if (form.classList.contains("body-form__forth")) {
      formForgetLoading.classList.add("show");

      await postData(urlPost, formData, formForgetLoading);

      formForgetLoading.classList.remove("show");
      form.classList.remove("active");

      document.querySelector(".body-form__fifth").classList.add("active");
    }

    if (form.classList.contains("body-form_login-in")) {
      formEnterLoading.classList.add("show");

      await postData(urlPost, formData, formEnterLoading);

      formEnterLoading.classList.remove("show");
      form.reset();
    }

    if (form.classList.contains("body-form_registration")) {
      formEnterLoading.classList.add("show");

      await postData(urlPost, formData, formEnterLoading);

      formEnterLoading.classList.remove("show");
      modalThancks.classList.add("show");
      form.reset();
    }
  }

  // Form btns

  const thirdBtn = document.querySelector(".body-form__btn_third button"),
    fifthBtn = document.querySelector(".body-form__btn_fifth");

  thirdBtn.addEventListener("click", function (event) {
    event.preventDefault();

    goToPage(
      "file:///C:/Users/%D0%92%D0%B0%D1%81%D0%B8%D0%BB%D0%B8%D0%B9/Desktop/Login-registration/html/index.html"
    );
  });

  fifthBtn.addEventListener("click", function (event) {
    event.preventDefault();

    goToPage(
      "file:///C:/Users/%D0%92%D0%B0%D1%81%D0%B8%D0%BB%D0%B8%D0%B9/Desktop/Login-registration/html/index.html"
    );
  });
}
