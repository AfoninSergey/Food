"use strict";
import inpCalc from "./modules/calc";
import inpMenuCards from "./modules/menucards";
import inpModal from "./modules/modal";
import inpPostForm from "./modules/postform";
import inpSlider from "./modules/slider";
import inpTabs from "./modules/tabs";
import inpTimer from "./modules/timer";
import { showModal } from "./modules/modal";
document.addEventListener("DOMContentLoaded", () => {
  ////PROGRAM START
  const showModalTimerId = setTimeout(() => {
    console.log("Open modal by Timer)");
    showModal(".modal", showModalTimerId);
  }, 50000);

  inpCalc();
  inpMenuCards();
  inpModal(".modal", ".modal__dialog", "[data-modal]", showModalTimerId);
  inpPostForm(".modal", ".modal__dialog", showModalTimerId, "form");
  inpTabs(
    ".tabcontent",
    ".tabheader__items",
    ".tabheader__item",
    "tabheader__item_active"
  );
  inpTimer(".timer", "2022-12-31T21:00:00.000Z");
  inpSlider({
    slidesWrapperSelector:  ".offer__slider-wrapper",
    slidesInnerSelector:  ".offer__slider-inner",
    slidesSelector:  ".offer__slide",
    prevSelector:  ".offer__slider-prev",
    nextSelector:  ".offer__slider-next",
    totalSelector: "#total",
    currentSelector:  "#current"
    }
  );
  ////PROGRAM END
});

