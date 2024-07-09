

function openModal(popup) {
    popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
}
function closeEsc(evt) { 
  if (evt.key === "Escape") { 
    const openedPopup = document.querySelector(".popup_is-opened"); 
    closeModal(openedPopup); 
  } 
};
export { openModal, closeModal, closeEsc };
