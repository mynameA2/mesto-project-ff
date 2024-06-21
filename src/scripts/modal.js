function openModal(popupInput) {
  popupInput.classList.add("popup_is-animated");
  setTimeout(() => {
    popupInput.classList.add("popup_is-opened");
  }, 1);
  document.addEventListener("keydown", closeEsc);
}

function closeModal() {
  const openPopup = document.querySelector(".popup_is-opened");
  openPopup.classList.add("popup_is-animated");
  setTimeout(() => {
    openPopup.classList.remove("popup_is-opened");
  }, 1);
  document.removeEventListener("keydown", closeEsc);
}

function closeEsc(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}
export { openModal, closeModal, closeEsc };
