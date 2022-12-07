function tabs(
  tabsContentSelector,
  tabsParentSelector,
  tabsSelector,
  activeClass
) {
  //TABS Start
  const tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector),
    tabs = tabsParent.querySelectorAll(tabsSelector);

  function hideTabContent() {
    tabsContent.forEach((tab) => {
      tab.classList.add("hide");
      tab.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  }
  hideTabContent();

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(activeClass);
  }
  showTabContent();

  tabsParent.addEventListener("click", (e) => {
    if (e.target && e.target.matches(tabsSelector)) {
      tabs.forEach((tab, i) => {
        if (e.target == tab) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  //TABS End
}

export default tabs;
