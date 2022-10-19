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

    tabs.forEach(tab => {
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

  tabsParent.addEventListener('click', event => {
    const target = event.target;
    if (target && target.matches('.tabheader__item')) {
      tabs.forEach((tab, index) => {
        if (tab == target) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
  //TABS End

  

  //PROGRAM END
});
