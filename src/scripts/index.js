import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal, closeEsc } from "./modal.js";
import { createCard, deleteCard, likeClick } from "./card.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./validation.js";
import {
  getUserInfo,
  getInitialCards,
  getInitialInfo,
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
const userID = localStorage.getItem("userID");

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

// редактирование профиля
// принимает данные но выводит стандартное значение
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

// добавление карточки

getInitialCards((initialCards, userId)  => {
    initialCards.forEach((card) => {
        createCard(newCard, userId, deleteCard, likeClick,  handleImageClick);
    });
  });

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  waitLoading(true, popupButton);
  const name = placeNameInput.value;
  const link = linkInput.value;
  addCard({ name, link })
  .then((newCard) => {
    createCard(
      newCard,
      userID,
      deleteCard,
      likeClick,
      handleImageClick,
      list.prepend(newCard)
    );
  });

  closeModal(popupAddCard);
  formAddCard.reset(popupAddCard);
  clearValidation(popupAddCard, validationConfig);
  waitLoading(false, popupButton); 
 
  // Очистка инпутов:
//   placeNameInput.value = "";
//   linkInput.value = "";
}
formAddCard.addEventListener("submit", handleAddCardFormSubmit);

function handleImageClick(cardData) {
  openModal(popupZoom);
  popupImage.alt = cardData.name;
  popupImage.src = cardData.link;
  popupCaption.textContent = cardData.name;
}

// попап редактирования профиля
editButton.addEventListener("click", () => {
  (nameInput.value = profileName.textContent),
    (jobInput.value = profileJob.textContent),
    openModal(popupEdit);
});
// попад добавления карточки
addCardButton.addEventListener("click", () => {
  openModal(popupAddCard);
});

// валидация
enableValidation(validationConfig);

// изменение аватара
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  editAvatar(popupAvatarForm.link.value).then((userInfo) => {
    profileInfo(userInfo);
    closeModal(popupAvatar);
    clearValidation(popupAvatarForm, validationConfig);
  });
}
popupAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);
avatarEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  openModal(popupAvatar);
  popupAvatarForm.reset();
  clearValidation(popupAvatarForm, validationConfig);
});

// инициализация
Promise.all([getUserInfo(), getInitialCards()]).then(([user, cards]) => {
  const userID = user._id;
  //   handleGetUserInfo(user);
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
});

getInitialInfo()
  .then((result) => {
    const userInfo = result[0];
    userID = userInfo._id;
    const initialCards = result[1];
    profileInfo(userInfo);
    getInitialCards(initialCards, userID);
  })
  .catch((err) => {
    console.log(err);
  });