import { openModal, closeModal } from "./modal";
import { postData } from '../services/services';

function forms(timerOpenModal) {
  // Forms

  const forms = document.querySelectorAll("form");
  const message = {
    loading: "/img/svg/Spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

 

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.textContent = message.loading;
      statusMessage.style.cssText = `margin: 10px auto 0 auto; max-width:25px; display: block;`;
      // form.appendChild(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((request) => {
          console.log(request);
          thanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          thanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  const prevModal = document.querySelector(".modal__dialog");

  function thanksModal(message) {
    prevModal.classList.add("hide");

    const thanskPopup = document.createElement("div");
    openModal('.modal', timerOpenModal);
    thanskPopup.classList.add("modal__dialog");

    thanskPopup.innerHTML = `
            <div class="modal__content">        
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

    document.querySelector(".modal").append(thanskPopup);

    setTimeout(() => {
      thanskPopup.remove();
      prevModal.classList.add("show");
      prevModal.classList.remove("hide");
      closeModal('.modal');
    }, 4000);
  }
}

export default forms;

