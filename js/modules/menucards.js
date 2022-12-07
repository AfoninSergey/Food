import { getMenuCards } from "../services/services";
function cards() {
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

  /*
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
  */
  //CLASSES End
}
export default cards;
