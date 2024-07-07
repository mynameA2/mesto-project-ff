import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal, closeEsc } from "./modal.js";
import { createCard, deleteCard, likeClick } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUserInfo,
  getInitialCards,
  editProfile,
  addCard,
  editAvatar,
} from "./api.js";

const list = document.querySelector(".places__list");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const profileForm = document.querySelector("#edit-profile");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const formAddCard = document.querySelector("#new-place");
const placeNameInput = document.querySelector("#place-name");
const linkInput = document.querySelector("#link");
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const addCardButton = document.querySelector(".profile__add-button");
const popupButton = document.querySelector(".popup__button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");
const popupContents = document.querySelectorAll(".popup__content");
const popupZoom = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarForm = document.forms["edit-avatar"];
const avatarEditButton = document.querySelector(".profile__image-container");
// let userID = localStorage.getItem("userID");
let userID = "";
 const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input_type_error_active",
};

// добавим анимации в попап
if (!document.querySelector(".popup").classList.contains("popup_is-animated")) {
  document.querySelector(".popup").classList.add("popup_is-animated");
}

// закрытие попапа через кнопку
popupCloseButtons.forEach((item) => {
  item.addEventListener("click", closeModal);
});

// закрытие попапа через overlay
popups.forEach((item) => {
  item.addEventListener("mousedown", closeModal);
});
popupContents.forEach((item) => {
  item.addEventListener("mousedown", (evt) => {
    evt.stopPropagation();
  });
});
// попап редактирования профиля
editButton.addEventListener("click", () => {
  (nameInput.value = profileName.textContent),
    (jobInput.value = profileJob.textContent),
    openModal(popupEdit);
});
// редактирование профиля
const profileInfo = (userInfo) => {
  profileName.textContent = userInfo.name;
  profileJob.textContent = userInfo.about;
  profileAvatar.src = userInfo.avatar;
};

const waitLoading = (thisLoading, popupButton) => {
  popupButton.textContent = thisLoading ? "Сохранение..." : "Сохранить";
};
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  waitLoading(true, popupButton);
  editProfile({
    name: profileForm.name.value,
    about: profileForm.description.value,
  })
    .then((userInfo) => {
      profileInfo(userInfo);
      closeModal(popupEdit);
      clearValidation(popupEdit, validationConfig);
    })
    .finally(() => {
      waitLoading(false, popupButton);
    });
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

// попад добавления карточки
addCardButton.addEventListener("click", () => {
  openModal(popupAddCard);
  placeNameInput.value = "";
  linkInput.value = "";
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  waitLoading(true, popupAddCard.querySelector(".popup__button"));
  const name = placeNameInput.value;
  const link = linkInput.value;

  addCard({ name, link })
    .then((newCard) => {
      const card = createCard(newCard, userID, deleteCard, likeClick, handleImageClick);
      list.prepend(card);
      closeModal(popupAddCard);
      formAddCard.reset(popupAddCard);
      clearValidation(popupAddCard, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      waitLoading(false, popupAddCard.querySelector(".popup__button"));
    });
}
formAddCard.addEventListener("submit", handleAddCardFormSubmit);

function handleImageClick(cardData) {
  openModal(popupZoom);
  popupImage.alt = cardData.name;
  popupImage.src = cardData.link;
  popupCaption.textContent = cardData.name;
}

// валидация
enableValidation(validationConfig);

// изменение аватара
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  waitLoading(true, popupAvatarForm.querySelector(".popup__button"));
  editAvatar(popupAvatarForm.link.value)
    .then((userInfo) => {
      profileInfo(userInfo);
      closeModal(popupAvatar);
      clearValidation(popupAvatarForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      waitLoading(false, popupAvatarForm.querySelector(".popup__button"));
    });
}
popupAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);
avatarEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  openModal(popupAvatar);
  popupAvatarForm.reset();
});

  // добавление карточки
  const initCards = (userID) => {
    getInitialCards()
  .then((cards) => {
    cards.forEach((cardData) => {
      const cardHtml = createCard(
        cardData,
        deleteCard,
        likeClick,
        handleImageClick,
        userID
      );
      list.append(cardHtml);
    });
  })
  .catch((err) => {
    console.log(err);
  });
  }

// инициализация
getUserInfo()
  .then((userInfo) => {
    const userID = userInfo._id;
    initCards(userID);
    // const initialCards = result[1];
    profileInfo(userInfo);
    // getInitialCards(initialCards, userID);
  })
  .catch((err) => {
    console.log(err);
  });


