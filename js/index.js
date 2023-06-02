document.addEventListener("DOMContentLoaded", function () {
  /* burger */
  const burger = document.querySelector(".burger");
  const menuList = document.querySelector(".header__menu");
  const menuItems = document.querySelectorAll(".header-menu__item-link");
  const body = document.querySelector("body");

  burger.addEventListener("click", () => {
    burger.classList.toggle("_active");
    menuList.classList.toggle("_active");
    body.classList.toggle("_overflow-hidden");
  });

  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      burger.classList.remove("_active");
      menuList.classList.remove("_active");
      body.classList.remove("_overflow-hidden");
      const targetId = item.getAttribute("href").slice(1);
      const targetElem = document.getElementById(targetId);
      const targetOffset =
        targetElem.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: targetOffset,
        behavior: "smooth",
      });
    });
  });

  const adElements = document.querySelectorAll('[id*="large-"], [id*="medium-"], [id*="small-"]');
  
  adElements.forEach(function(adElement) {
      adElement.style.display = "none";
  })

  /* tabs */
  const tabs = document.querySelectorAll(".tab-services");
  const images = document.querySelectorAll(".services__image");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabNum = tab.dataset.tab;

      // Remove active class from all tabs and images
      tabs.forEach((tab) => tab.classList.remove("active"));
      images.forEach((image) => image.classList.remove("active"));

      // Add active class to the clicked tab and image
      tab.classList.add("active");
      const image = document.querySelector(
        `.services__image[data-tab="${tabNum}"]`
      );
      image.classList.add("active");
    });
  });

  /* modal */
  const modal = document.querySelector(".modal");
  // const modalDialogs = document.querySelectorAll(".modal-dialog");
  const requestModal = document.querySelector("#request-modal");
  const successModal = document.querySelector("#success-modal");
  const wechatModal = document.querySelector(".wechat");
  const forms = document.querySelectorAll(".form");
  const calculateBtns = document.querySelectorAll(".calculate-btn");
  const wechatBtns = document.querySelectorAll(".wechat-btn");
  const wechatImages = document.querySelectorAll(".wechat img");

  calculateBtns.forEach(function (e) {
    e.addEventListener("click", function () {
      document.body.classList.toggle("_overflow-hidden");
      modal.style.display = "flex";
      requestModal.style.display = "block";
    });
  });

  wechatImages.forEach(function (image) {
    image.style.display = "none";
  });

  wechatBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const dataName = btn.getAttribute("data-name");

      if (dataName) {
        const targetImage = wechatModal.querySelector(`[alt="${dataName}"]`);
        if (targetImage) {
          // Показать только выбранное изображение
          wechatImages.forEach(function (image) {
            image.style.display = "none";
          });
          targetImage.style.display = "block";

          // Открыть модальное окно
          document.body.classList.toggle("_overflow-hidden");
          modal.style.display = "flex";
          wechatModal.style.display = "block";
        }
      }
    });
  });

  forms.forEach(function (form) {
    form.addEventListener("submit", formSend);
  });

  async function formSend(e) {
    e.preventDefault();

    const form = e.target;
    const error = formValidate(form);
    const formData = new FormData(form);

    if (error === 0) {
      try {
        const response = await fetch("sendmail.php", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result.message);
          form.reset();
          modal.style.display = "flex";
          requestModal.style.display = "none";
          successModal.style.display = "block";
        } else {
          throw new Error("Ошибка при отправлении формы");
        }
      } catch (error) {
        console.log("Ошибка при отправлении формы:", error);
      }
    } else {
      console.log("Заполните обязательные поля");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = form.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  window.onclick = function (event) {
    if (event.target == modal || event.target.closest(".modal-dialog__close")) {
      document.body.classList.remove("_overflow-hidden");
      modal.style.display = "none";
      requestModal.style.display = "none";
      successModal.style.display = "none";
      wechatModal.style.display = "none";
    }
  };

  /* slider */
  $(".slider-reviews").slick({
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    arrows: true,
    infinite: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  });

  $(".slider-certificates").slick({
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    arrows: true,
    infinite: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  });

  $(".slider-team").slick({
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    arrows: true,
    infinite: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  });
});
