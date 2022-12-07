import { getZero } from "./timer";

function slider({
    slidesWrapperSelector,
    slidesInnerSelector,
    slidesSelector,
    prevSelector,
    nextSelector,
    totalSelector,
    currentSelector
  }
) {
  //SLIDER Start
  const slidesWrapper = document.querySelector(slidesWrapperSelector),
    slidesInner = slidesWrapper.querySelector(slidesInnerSelector),
    slides = slidesInner.querySelectorAll(slidesSelector),
    prev = document.querySelector(prevSelector),
    next = document.querySelector(nextSelector),
    total = document.querySelector(totalSelector),
    current = document.querySelector(currentSelector),
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
}
export default slider;
