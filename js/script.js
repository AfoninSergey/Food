"use strict";
document.addEventListener("DOMContentLoaded", () => {
  ////PROGRAM START
  //TABS Start
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = tabsParent.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent");

  function hideTabContent() {
    tabsContent.forEach((tab) => {
      tab.classList.add("hide");
      tab.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");

    tabs[i].classList.add("tabheader__item_active");
  }

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.matches(".tabheader__item")) {
      tabs.forEach((tab, i) => {
        if (target == tab) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  //TABS End

  //TIMER Start
  const deadline = "2022-11-14T21:00:00.000Z"; // Alcohol (-3 hours)
  // const deadline = "2022-10-19T12:27:00.000Z";

  function getTimeRemaining(endTime) {
    const rem = Date.parse(endTime) - new Date(),
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

  function setTimer(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      updateTimerIntervalId = setInterval(updateTimer, 1000);
    updateTimer();
    function updateTimer() {
      const t = getTimeRemaining(endTime);
      if (t.rem > 0) {
        days.textContent = getZero(t.days);
        hours.textContent = getZero(t.hours);
        minutes.textContent = getZero(t.minutes);
        seconds.textContent = getZero(t.seconds);
      } else {
        clearInterval(updateTimerIntervalId);
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
    modalBtns = document.querySelectorAll("[data-modal]");
  // const swowModalTimerId = setTimeout(showModal, 5000);

  function showModal() {
    modal.classList.add("show");
    modal.classList.remove("hide", "fadeout");
    document.body.style.marginRight = `${
      window.innerWidth - document.documentElement.clientWidth
    }px`;
    document.body.style.overflow = "hidden";
  }

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      showModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  function closeModal() {
    modal.classList.add("fadeout");
    // clearInterval(swowModalTimerId);
    setTimeout(() => {
      modal.classList.add("hide");
      modal.classList.remove("show");
      document.body.style.marginRight = "";
      document.body.style.overflow = "";
    }, 200);
  }

  modalBtns.forEach((btn) => {
    btn.addEventListener("click", showModal);
  });
  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (
      (target.matches(".modal") || target.matches(".modal__close")) &&
      modalDialog.matches(".show")
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.code == "Escape" &&
      modalDialog.matches(".show") &&
      modal.matches(".show")
    ) {
      closeModal();
    }
  });

  window.addEventListener("scroll", showModalByScroll);
  //MODAL End
  //CLASSES Start
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classNames) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classNames = classNames;
      this.course = 61;
      this.changeToRUB();
    }

    changeToRUB() {
      this.price *= this.course;
    }

    render() {
      const menuCard = document.createElement("div");
      if (this.classNames.length == 0) {
        menuCard.classList.add("menu__item");
      } else {
        this.classNames.forEach((className) =>
          menuCard.classList.add(className)
        );
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
  document.querySelector(".menu .container").innerHTML = "";
  const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      console.log("error");
      throw new Error(`Could non fetch ${url}, status: ${res.status}`);
    } else {
      return await res.json();
    }
  };
  getResource("http://localhost:3000/menu").then((data) =>
    data.forEach(({ img, altimg, title, descr, price }) => {
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

  // axios.get("http://localhost:3000/menu")
  // .then(res => res.data.forEach(({ img, altimg, title, descr, price }) => {
  //   new MenuCard(
  //           img,
  //           altimg,
  //           title,
  //           descr,
  //           price,
  //           ".menu .container"
  //         ).render();
  //   })
  //   );

  //CLASSES End
  //POST FORMS Start
  const forms = document.querySelectorAll("form"),
    mess = {
      load: "icons/spinner.svg",
      sacces: "ВСЁ ОТЛИЧНО! МЫ ВАМ ПЕРЕЗВОНИМ!!!",
      error: "ОШИБКА (((",
    };

  forms.forEach((form) => bindPostData(form));

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });
    return res.text();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const spiner = document.createElement("img");
      spiner.src = mess.load;
      spiner.alt = "loading...";
      spiner.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", spiner);
      const formData = new FormData(form);

      postData(
        "http://localhost:3000/requests",
        JSON.stringify(Object.fromEntries(formData.entries()))
      )
        .then((data) => {
          console.log(data);
          notifyUser(mess.sacces);
        })
        .catch(() => {
          notifyUser(mess.error);
        })
        .finally(() => {
          spiner.remove();
          form.reset();
        });
    });
  }

  function notifyUser(text) {
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
        modalDialog.classList.add("show");
        modalDialog.classList.remove("hide");
        modalMess.remove();
      }, 200);
    }, 2500);
  }
  //POST FORMS End
  //SLIDER Start
  const slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesInner = slidesWrapper.querySelector(".offer__slider-inner"),
    slides = slidesInner.querySelectorAll(".offer__slide"),
    next = document.querySelector(".offer__slider-next"),
    prev = document.querySelector(".offer__slider-prev"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    wrapperWidth = +window.getComputedStyle(slidesWrapper).width.slice(0, -2);
  let slideIndex = 0,
    offset = 0;

  function setSliderSettings() {
    total.textContent = getZero(slides.length);
    current.textContent = getZero(slideIndex + 1);
    slidesWrapper.style.cssText = `
      overflow: hidden;
      position: relative;
    `;
    slidesInner.style.cssText = `
    display: flex;
    width: ${wrapperWidth * slides.length}px;
    transition: .5s;
  `;
  }
  setSliderSettings();

  function moveSlide() {
    slidesInner.style.transform = `translateX(-${offset}px)`;
    current.textContent = getZero(slideIndex + 1);
    addActiveClassDot();
  }

  next.addEventListener("click", () => {
    if (offset >= wrapperWidth * (slides.length - 1)) {
      offset = 0;
      slideIndex = 0;
    } else {
      offset += wrapperWidth;
      slideIndex++;
    }
    moveSlide();
  });

  prev.addEventListener("click", () => {
    if (offset <= 0) {
      offset = wrapperWidth * (slides.length - 1);
      slideIndex = slides.length - 1;
    } else {
      offset -= wrapperWidth;
      slideIndex--;
    }
    moveSlide();
  });

  const carousel = document.createElement("ol"),
    dots = [];
  carousel.classList.add("carousel-indicators");
  slidesWrapper.append(carousel);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.classList.add("dot");
    dot.setAttribute("data-dotIndex", i);
    carousel.append(dot);
    dots.push(dot);
  }
  function addActiveClassDot() {
    dots.forEach((dot) => {
      dot.style.opacity = ".3";
    });
    dots[slideIndex].style.opacity = "1";
  }
  addActiveClassDot();

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      offset = wrapperWidth * e.target.getAttribute("data-dotIndex");
      slideIndex = +e.target.getAttribute("data-dotIndex");
      moveSlide();
    });
  });

  //SLIDER End
  ////PROGRAM END
});
