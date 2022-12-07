function calc() {
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
      inp.style.border = "1px solid red";
    } else {
      inp.style.border = "none";
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
}
export default calc;
