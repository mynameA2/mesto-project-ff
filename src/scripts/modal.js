

function openModal(popup) {
    popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}

function closeModal(popupName) {
  const openPopup = document.querySelector(".popup_is-opened");
  openPopup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
}

function closeEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}
export { openModal, closeModal, closeEsc };
