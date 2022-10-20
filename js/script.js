"use strict";
document.addEventListener("DOMContentLoaded", () => {
  //PROGRAM START
  //TABS Start
  const tabsParent = document.querySelector('.tabheader__items'),
        tabs = tabsParent.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent');

  function hideTabContent() {
    tabContent.forEach(tab => {      
      tab.classList.remove('show', 'fade');
      tab.classList.add('hide');
    });

    tabs.forEach(tab =>{
      tab.classList.remove('tabheader__item_active');
    });
  }
  hideTabContent();

  function showTabContent(i = 0) {
    tabContent[i].classList.add('show', 'fade');
    tabContent[i].classList.remove('hide');

    tabs[i].classList.add('tabheader__item_active');
  }
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.matches('.tabheader__item')) {
      tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
          if (target == tab) {
            hideTabContent();
            showTabContent(i);
          }
        });
      });
    }
  });
  //TABS End
  //TIMER Start
  const deadline = '2022-11-09T21:00:00.000Z'; // Alcohol (-3 hours)
  // const deadline = '2022-10-19T12:27:00.000Z';
  function getTimeRemaining(end) {
    const t = Date.parse(end) - new Date(),
          d = Math.floor(t / (1000 * 60 * 60 * 24)),
          h = Math.floor((t / (1000 * 60 * 60)) % 60),
          m = Math.floor((t / (1000 * 60)) % 60),
          s = Math.floor((t / 1000) % 60);
    return {t, d, h, m, s};
  }
  
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {return num;}
  }

  function setTimer(selector, end) {
    const timer = document.querySelector(selector),
          d = timer.querySelector('#days'),
          h = timer.querySelector('#hours'),
          m = timer.querySelector('#minutes'),
          s = timer.querySelector('#seconds'),
          timerInterval = setInterval(updateTimer, 1000);        

    updateTimer();
    function updateTimer() {
      const t = getTimeRemaining(end);
        if (t.t > 0) {
          d.textContent = getZero(t.d);
          h.textContent = getZero(t.h);
          m.textContent = getZero(t.m);
          s.textContent = getZero(t.s);
        } else {
          clearInterval(timerInterval);
          d.textContent =
          h.textContent =
          m.textContent =
          s.textContent = '00';
        }
    }
  }
  setTimer('.timer', deadline);
//TIMER End



//PROGRAM END 
});
