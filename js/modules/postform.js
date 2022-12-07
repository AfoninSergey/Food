import {postData} from '../services/services';
import { showModal, closeModal } from './modal';

function forms(modalSelector, modalDialogSelector, modalTimerId, formSelector) {
  //POST FORMS Start
  const forms = document.querySelectorAll(formSelector),
    userMessage = {
      load: "icons/spinner.svg",
      sacces: "СПАСИБО! МЫ ВАМ ПЕРЕЗВОНИМ!",
      error: "ОШИБКА СЕРВЕРА... ((",
    };
  forms.forEach((form) => bindPostData(form));

    

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const spiner = document.createElement("img");
      spiner.src = userMessage.load;
      spiner.alt = "Загрузка...";
      spiner.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", spiner);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((req) => {
          console.log(req);
          showMessageModal(userMessage.sacces);
        })
        .catch(() => {
          showMessageModal(userMessage.error);
        })
        .finally(() => {
          spiner.remove();
          form.reset();
        });
    });
  }

  function showMessageModal(text) {
    const modal = document.querySelector(modalSelector),
          modalDialog = document.querySelector(modalDialogSelector);

    modalDialog.classList.add("hide");
    modalDialog.classList.remove("show");
    const modalMess = document.createElement("div");
    modalMess.classList.add("modal__dialog");
    modalMess.innerHTML = `
      <div class="modal__content">      
        <div class="modal__title">${text}</div>    
      </div>    
    `;
    modal.append(modalMess);
    if (modal.matches(".hide")) {
      showModal(modalSelector, modalTimerId);
    }
    setTimeout(() => {
      closeModal(modalSelector);
      setTimeout(() => {
        modalMess.remove();
        modalDialog.classList.add("show");
        modalDialog.classList.remove("hide");
      }, 200);
    }, 2500);
  }
  //POST FORMS End
}
export default forms;
