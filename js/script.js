"use strict";
document.addEventListener("DOMContentLoaded", () => {
  ////PROGRAM START
  //TABS Start
  const tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items"),
    tabs = tabsParent.querySelectorAll(".tabheader__item");

  function hideTabContent() {
    tabsContent.forEach((tab) => {
      tab.classList.add("hide");
      tab.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }
  hideTabContent();

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  showTabContent();

  tabsParent.addEventListener("click", (e) => {
    if (e.target && e.target.matches(".tabheader__item")) {
      tabs.forEach((tab, i) => {
        if (e.target == tab) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  //TABS End

  //TIMER Start
  const deadline = "2022-12-31T21:00:00.000Z"; // New Year
  // const deadline = "2022-10-19T12:27:00.000Z";
  function getTimeRemaining(end) {
    const rem = Date.parse(end) - new Date(),
      days = Math.floor(rem / (1000 * 60 * 60 * 24)),
      hours = Math.floor((rem / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((rem / (1000 * 60)) % 60),
      seconds = Math.floor((rem / 1000) % 60);

    return { rem, days, hours, minutes, seconds };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setTimer(selector, end) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timerUpdetIntervalId = setInterval(updateTimer, 1000);

    updateTimer();
    function updateTimer() {
      const remaining = getTimeRemaining(end);
      if (remaining.rem > 0) {
        days.textContent = getZero(remaining.days);
        hours.textContent = getZero(remaining.hours);
        minutes.textContent = getZero(remaining.minutes);
        seconds.textContent = getZero(remaining.seconds);
      } else {
        clearInterval(timerUpdetIntervalId);
        days.textContent =
          hours.textContent =
          minutes.textContent =
          seconds.textContent =
            "00";
      }
    }
  }
  setTimer(".timer", deadline);
  //TIMER End

  //MODAL Start
  const modal = document.querySelector(".modal"),
    modalDialog = modal.querySelector(".modal__dialog"),
    modalTargets = document.querySelectorAll("[data-modal]");
  // const showModalTimerId = setTimeout(showModal, 5000);

  function showModal() {
    modal.classList.add("show", "fade");
    modal.classList.remove("hide", "fadeout");
    document.body.style.marginRight = `${
      window.innerWidth - document.documentElement.clientWidth
    }px`;
    document.body.style.overflow = "hidden";
    // clearInterval(showModalTimerId);
  }

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      showModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  function closeModal() {
    modal.classList.add("fadeout");
    setTimeout(() => {
      modal.classList.add("hide");
      modal.classList.remove("show", "fade");
      document.body.style.marginRight = "";
      document.body.style.overflow = "";
    }, 200);
  }
  modalTargets.forEach((btn) => btn.addEventListener("click", showModal));
  modal.addEventListener("click", (e) => {
    if (
      e.target.matches(".modal__close") ||
      (e.target.matches(".modal") && modalDialog.matches(".show"))
    ) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (
      e.code == "Escape" &&
      modal.matches(".show") &&
      modalDialog.matches(".show")
    ) {
      closeModal();
    }
  });
  window.addEventListener("scroll", showModalByScroll);
  //MODAL End
  //CLASSES Start
  document.querySelector(".menu .container").innerHTML = "";
  class MenuCard {
    constructor(src, alt, title, descr, price, selector, ...classNames) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.course = 61;
      this.convertUSD();
      this.classNames = classNames;
      this.parent = document.querySelector(selector);
    }
    convertUSD() {
      this.price *= this.course;
    }
    render() {
      const menuCard = document.createElement("div");
      if (this.classNames.length > 0) {
        this.classNames.forEach((className) =>
          menuCard.classList.add(className)
        );
      } else {
        menuCard.classList.add("menu__item");
      }
      menuCard.innerHTML = `
        <img src=${this.src} alt=${this.alt}/>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> р/день</div>
        </div>
            `;
      this.parent.append(menuCard);
    }
  }

  const getMenuCards = async (url) => {
    const req = await fetch(url);
    if (!req.ok) {
      throw new Error(`Ошебка! Путь ${url} не фетчится! Статус ${req.status}`);
    }

    return req.json();
  };
  /*
  getMenuCards("http://localhost:3000/menu").then((cards) =>
    cards.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    })
  );
  */

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше
    свежих овощей и фруктов. Продукт активных и здоровых людей. Это
    абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
    40,
    ".menu .container",
    "menu__item",
    "vegy"
  ).render();
  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню "Премиум"',
    `В меню "Премиум" мы используем не только красивый дизайн упаковки,
    но и качественное исполнение блюд. Красная рыба, морепродукты,
    фрукты - ресторанное меню без похода в ресторан!`,
    90,
    ".menu .container",
    "menu__item",
    "elite"
  ).render();
  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    `Меню "Постное" - это тщательный подбор ингредиентов: полное
    отсутствие продуктов животного происхождения, молоко из миндаля,
    овса, кокоса или гречки, правильное количество белков за счет тофу
    и импортных вегетарианских стейков.`,
    70,
    ".menu .container",
    "menu__item",
    "post"
  ).render();
  //CLASSES End
  //POST FORMS Start
  const forms = document.querySelectorAll("form"),
    userMessage = {
      load: "icons/spinner.svg",
      sacces: "СПАСИБО! МЫ ВАМ ПЕРЕЗВОНИМ!",
      error: "ОШИБКА СЕРВЕРА... ((",
    };
  forms.forEach((form) => bindPostData(form));

  const postData = async (url, formData) => {
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: formData,
    });

    return await req.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const spiner = document.createElement("img");
      spiner.src = userMessage.load;
      spiner.alt = "Загрузка...";
      spiner.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", spiner);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((req) => {
          console.log(req);
          showMessageModal(userMessage.sacces);
        })
        .catch(() => {
          showMessageModal(userMessage.error);
        })
        .finally(() => {
          spiner.remove();
          form.reset();
        });
    });
  }

  function showMessageModal(text) {
    modalDialog.classList.add("hide");
    modalDialog.classList.remove("show");
    const modalMess = document.createElement("div");
    modalMess.classList.add("modal__dialog");
    modalMess.innerHTML = `
      <div class="modal__content">      
        <div class="modal__title">${text}</div>    
      </div>    
    `;
    modal.append(modalMess);
    if (modal.matches(".hide")) {
      showModal();
    }
    setTimeout(() => {
      closeModal();
      setTimeout(() => {
        modalMess.remove();
        modalDialog.classList.add("show");
        modalDialog.classList.remove("hide");
      }, 200);
    }, 2500);
  }
  //POST FORMS End
  //SLIDER Start
  const slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesInner = slidesWrapper.querySelector(".offer__slider-inner"),
    slides = slidesInner.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slideWidth = +window
      .getComputedStyle(slidesWrapper)
      .width.replace(/\D/g, "");
  let slideIndex = 1,
    offset = 0;

  const carousel = document.createElement("ol"),
    dots = [];
  carousel.classList.add("carousel-indicators");
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.classList.add("dot");
    dot.setAttribute("data-slider-index", i);
    dots.push(dot);
    carousel.append(dot);
  }
  slidesWrapper.append(carousel);

  function setStartSliderSettings() {
    total.textContent = getZero(slides.length);
    slidesWrapper.style.cssText = `
      overflow: hidden;
      position: relative;
    `;

    slidesInner.style.cssText = `
      display: flex;
      width: ${slideWidth * slides.length}px;
      transition: .5s;
    `;
  }
  setStartSliderSettings();

  function moveSlide() {
    if (offset > slideWidth * (slides.length - 1)) {
      offset = 0;
      slideIndex = 1;
    }
    if (offset < 0) {
      offset = slideWidth * (slides.length - 1);
      slideIndex = slides.length;
    }
    slidesInner.style.transform = `translateX(-${offset}px)`;
    current.textContent = getZero(slideIndex);
    setDotOpacity();
  }
  moveSlide();

  next.addEventListener("click", () => {
    offset += slideWidth;
    slideIndex++;
    moveSlide();
  });

  prev.addEventListener("click", () => {
    offset -= slideWidth;
    slideIndex--;
    moveSlide();
  });

  function setDotOpacity() {
    dots.forEach((dot) => {
      dot.style.opacity = ".3";
      if (dot.getAttribute("data-slider-index") == slideIndex - 1) {
        dot.style.opacity = "1";
      }
    });
  }
  setDotOpacity();

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      offset = slideWidth * +dot.getAttribute("data-slider-index");
      slideIndex = +dot.getAttribute("data-slider-index") + 1;
      moveSlide();
      setDotOpacity();
    });
  });
  //SLIDER End
  //CALC Start
  const calcResult = document.querySelector(".calculating__result span"),
    genders = document.querySelectorAll("#gender div"),
    ratioBtns = document.querySelectorAll(".calculating__choose_big div"),
    calcInputs = document.querySelectorAll(".calculating__choose input");
  let sex, height, weight, age, ratio;

  function firstCalcSettings() {
    if (localStorage.getItem("data-ratio")) {
      ratio = localStorage.getItem("data-ratio");
    } else {
      ratio = 1.375;
      localStorage.setItem("data-ratio", 1.375);
    }
    if (localStorage.getItem("id")) {
      sex = localStorage.getItem("id");
    } else {
      sex = "woman";
      localStorage.setItem("id", "woman");
    }
  }
  firstCalcSettings();

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      calcResult.textContent = "_ _ _ _";
      return;
    }

    if (sex == "man") {
      calcResult.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    } else {
      calcResult.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    }
  }
  calcTotal();

  function getStaticInformation(el) {
    if (el.getAttribute("data-ratio")) {
      ratio = +el.getAttribute("data-ratio");
      localStorage.setItem("data-ratio", +el.getAttribute("data-ratio"));
    } else {
      sex = el.getAttribute("id");
      localStorage.setItem("id", el.getAttribute("id"));
    }
    calcTotal();
  }
  function changeActiveClass() {
    ratioBtns.forEach((btn) => {
      btn.classList.remove("calculating__choose-item_active");
      if (btn.getAttribute("data-ratio") == ratio) {
        btn.classList.add("calculating__choose-item_active");
      }
    });
    genders.forEach((gender) => {
      gender.classList.remove("calculating__choose-item_active");
      if (gender.getAttribute("id") == sex) {
        gender.classList.add("calculating__choose-item_active");
      }
    });
  }
  changeActiveClass();
  function getDinamycInformation(inp) {
    inp.value = inp.value.trim();
    if (inp.value.match(/\D/g)) {
      inp.style.border = '1px solid red';
      
    } else {
      inp.style.border = 'none';
    }

    switch (inp.getAttribute("id")) {
      case "height":
        height = +inp.value;
        break;
      case "weight":
        weight = +inp.value;
        break;
      case "age":
        age = +inp.value;
        break;
    }
    calcTotal();
    
  }
  genders.forEach((gender) =>
    gender.addEventListener("click", (e) => {
      getStaticInformation(e.target);
      changeActiveClass(e.target);
    })
  );
  ratioBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      getStaticInformation(e.target);
      changeActiveClass(e.target);
    })
  );
  calcInputs.forEach((input) =>
    input.addEventListener("input", (e) => {
      getDinamycInformation(e.target);
    })
  );

  //CALC End
  ////PROGRAM END
});
