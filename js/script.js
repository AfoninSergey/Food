"use strict";
document.addEventListener("DOMContentLoaded", () => {
  //PROGRAM START
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
  hideTabContent();

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, index) => {
        if (target == tab) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
  //TABS End_______________________________________________________

  //TIMER Start
  const deadline = "2022-11-09T21:00:00.000Z"; // Alcohol (-3 hours)
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
      timerIntervalId = setInterval(updateTimer, 1000);

    updateTimer();
    function updateTimer() {
      const rem = getTimeRemaining(end);
      if (rem.rem > 0) {
        days.textContent = getZero(rem.days);
        hours.textContent = getZero(rem.hours);
        minutes.textContent = getZero(rem.minutes);
        seconds.textContent = getZero(rem.seconds);
      } else {
        clearInterval(timerIntervalId);
        days.textContent =
          hours.textContent =
          minutes.textContent =
          seconds.textContent =
            "00";
      }
    }
  }
  setTimer(".timer", deadline);
  //TIMER End________________________________________________________

  //MODAL Start
  const modal = document.querySelector(".modal"),
    modalClose = modal.querySelector(".modal__close"),
    modalBtns = document.querySelectorAll("[data-modal]");
    // openModalTimerId = setTimeout(openModal, 7000);

  function openModal() {
    modal.classList.add("show", "fade");
    modal.classList.remove("hide", "fadeout");
    document.body.style.marginRight = `${
      window.innerWidth - document.documentElement.clientWidth
    }px`;
    document.body.style.overflow = "hidden";
  }

  function openModalByScroll() {
    if (
      document.documentElement.clientHeight + window.pageYOffset ==
      document.documentElement.scrollHeight
    ) {
      openModal();
      // console.log('true');
      removeEventListener("scroll", openModalByScroll);
    }    
  }

  function closeModal() {
    modal.classList.add("fadeout");
    // clearInterval(openModalTimerId);
    setTimeout(() => {
      modal.classList.add("hide");
      modal.classList.remove("show", "fade");
      document.body.style.marginRight = "";
      document.body.style.overflow = "";
    }, 400);
  }

  modalBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target.matches(".modal")) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.code == "Escape" && modal.matches(".show")) {
      closeModal();
    }
  });
  window.addEventListener("scroll", openModalByScroll);
  //MODAL End________________________________________________________



  //PROGRAM END

  // Expiriens
});
