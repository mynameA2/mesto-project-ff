function openModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  document.addEventListener("keydown", closeEsc);
}

function closeModal() {
  const openPopup = document.querySelector(".popup_is-opened");
  openPopup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
}

function closeEsc(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}
export { openModal, closeModal, closeEsc };
