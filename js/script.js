"use strict";
document.addEventListener("DOMContentLoaded", () => {
  ////PROGRAM START
  //TABS Start
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = tabsParent.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent");

  function hideTabsContent() {
    tabsContent.forEach((tab) => {
      tab.classList.add("hide");
      tab.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }
  hideTabsContent();

  function showTabsContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  showTabsContent();

  tabsParent.addEventListener("click", (e) => {
    if (e.target && e.target.matches(".tabheader__item")) {
      tabs.forEach((tab, i) => {
        if (e.target == tab) {
          hideTabsContent();
          showTabsContent(i);
        }
      });
    }
  });
  //TABS End

  //TIMER Start
  const deadline = "2022-11-09T21:00:00.000Z"; // Alcohol (-3 hours)
  // const deadline = "2022-10-19T12:27:00.000Z";

  function getTimeRemaining(end) {
    const t = Date.parse(end) - new Date(),
      d = Math.floor(t / (1000 * 60 * 60 * 24)),
      h = Math.floor((t / (1000 * 60 * 60)) % 24),
      m = Math.floor((t / (1000 * 60)) % 60),
      s = Math.floor((t / 1000) % 60);

    return { t, d, h, m, s };
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
      timerIntervalID = setInterval(updateTimer, 1000);

    updateTimer();
    function updateTimer() {
      const rem = getTimeRemaining(end);
      if (rem.t > 0) {
        days.textContent = getZero(rem.d);
        hours.textContent = getZero(rem.h);
        minutes.textContent = getZero(rem.m);
        seconds.textContent = getZero(rem.s);
      } else {
        clearInterval(timerIntervalID);
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
  // const showModalTimerId = setTimeout(showModal, 7000);

  function showModal() {
    modal.classList.add("show", "fade");
    modal.classList.remove("hide", "fadeout");
    document.body.style.marginRight = `${
      window.innerWidth - document.documentElement.scrollWidth
    }px`;
    document.body.style.overflow = "hidden";
    // clearInterval(showModalTimerId);
  }

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      showModal();
      window.removeEventListener("scroll", showModalByScroll);
      console.log(' :>> ');
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
  // closeModal();

  modalBtns.forEach((btn) => {
    btn.addEventListener("click", showModal);
  });
  window.addEventListener("scroll", showModalByScroll);
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
  //MODAL End
  //CLASSES Start
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.parrent = document.querySelector(parentSelector);
      this.classes = classes;
      this.price = price;
      this.course = 61;
      this.convertUsdToRub();
    }
    convertUsdToRub() {
      this.price *= this.course;
    }
    render() {
      const menuCard = document.createElement("div");
      if (this.classes.length == 0) {
        menuCard.classList.add("menu__item");
      } else {
        this.classes.forEach((className) => menuCard.classList.add(className));
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
      this.parrent.append(menuCard);
    }
  }
  document.querySelector(".menu .container").innerHTML = "";

  const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Ошибка ${res.ok}! Статус ошибки ${res.status}`);
    }
    return await res.json();
  };
  getResource("http://localhost:3000/menu")
    .then((data) => {
      data.forEach(({ img, altimg, title, descr, price }) => {
        new MenuCard(
          img,
          altimg,
          title,
          descr,
          price,
          ".menu .container"
        ).render();
      });
    });
  //CLASSES End
  //POST FORMS Start
  const forms = document.querySelectorAll("form"),
    userMessage = {
      load: "icons/spinner.svg",
      sacces: "ВСЁ ОТЛИЧНО! МЫ ПЕРЕЗВОНИМ!",
      error: "ОШИБКА (((",
    };

  forms.forEach((form) => {
    bindPostData(form);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const spiner = document.createElement("img");
      spiner.src = userMessage.load;
      spiner.style.cssText = `
        display: block;
        margin: 5px auto 0;
      `;
      form.insertAdjacentElement("afterend", spiner);
      const formData = new FormData(form);
      const jsonObj = {};
      formData.forEach((value, key) => {
        jsonObj[key] = value;
      });
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      postData("http://localhost:3000/requests", json)
        .then((data) => {
          showUserMessModal(userMessage.sacces);
          console.log(data);
        })
        .catch(() => {
          showUserMessModal(userMessage.error);
        })
        .finally(() => {
          spiner.remove();
          form.reset();
        });
    });
  }

  function showUserMessModal(text) {
    modalDialog.classList.add("hide");
    modalDialog.classList.remove("show");
    const modalMessage = document.createElement("div");
    modalMessage.classList.add("modal__dialog");
    modalMessage.innerHTML = `
      <div class="modal__content">             
        <div class="modal__title">${text}</div>   
      </div>    
    `;
    modal.append(modalMessage);
    showModal();
    setTimeout(() => {
      closeModal();
      setTimeout(() => {
        modalDialog.classList.add("show");
        modalDialog.classList.remove("hide");
        modalMessage.remove();
      }, 200);
    }, 2500);
  }
  //POST FORMS End
  //JSON-Server Start

  //JSON-Server End
  ////PROGRAM END
});
