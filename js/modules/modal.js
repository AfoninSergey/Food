function showModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show", "fade");
  modal.classList.remove("hide", "fadeout");
  document.body.style.marginRight = `${
    window.innerWidth - document.documentElement.clientWidth
  }px`;
  document.body.style.overflow = "hidden";
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("fadeout");
  setTimeout(() => {
    modal.classList.add("hide");
    modal.classList.remove("show", "fade");
    document.body.style.marginRight = "";
    document.body.style.overflow = "";
  }, 200);
}

function modal(
  modalSelector,
  modalDialogSelector,
  triggersSelector,
  modalTimerId
) {
  //MODAL Start    
  const modal = document.querySelector(modalSelector),
    modalDialog = modal.querySelector(modalDialogSelector),
    modalTargets = document.querySelectorAll(triggersSelector);

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      showModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  modalTargets.forEach((btn) =>
    btn.addEventListener("click", () => showModal(modalSelector, modalTimerId))
  );
  modal.addEventListener("click", (e) => {
    if (
      e.target.matches(".modal__close") ||
      (e.target.matches(".modal") && modalDialog.matches(".show"))
    ) {
      closeModal(modalSelector);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (
      e.code == "Escape" &&
      modal.matches(".show") &&
      modalDialog.matches(".show")
    ) {
      closeModal(modalSelector);
    }
  });
  window.addEventListener("scroll", showModalByScroll);
  //MODAL End
}
export default modal;
export { showModal, closeModal };
