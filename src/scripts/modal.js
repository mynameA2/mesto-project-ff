function openModal(popapInput) {
    popapInput.classList.add('popup_is-opened','popup_is-animated');
    document.addEventListener('keydown', closeEsc);
};

 function closeModal() {
    const closePopup = document.querySelector('.popup_is-opened');
    closePopup.classList.remove('popup_is-opened', 'popup_is-animated');
    document.removeEventListener('keydown', closeEsc);
}

 function closeEsc(evt) {
    if (evt.key === 'Escape') {
        closeModal();
    }
  };

function closeOverlay() {
        closeModal();
    }

  export {openModal, closeModal, closeEsc, closeOverlay};