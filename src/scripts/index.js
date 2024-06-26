import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal, closeEsc } from "./modal.js";
import { createCard, deleteCard, likeClick } from "./card.js";

const list = document.querySelector(".places__list");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const profileForm = document.querySelector("#edit-profile");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const formAddCard = document.querySelector("#new-place");
const placeNameInput = document.querySelector("#place-name");
const linkInput = document.querySelector("#link");
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const addCardButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");
const popupContents = document.querySelectorAll(".popup__content");
const popupZoom = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardHtml = createCard(
    cardData,
    deleteCard,
    likeClick,
    handleImageClick
  );
  list.append(cardHtml);
});
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
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal();
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

// добавление карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(
    { name: placeNameInput.value, link: linkInput.value },
    deleteCard,
    likeClick,
    handleImageClick
  );

  list.prepend(newCard);
  closeModal();
  // Очистка инпутов:
  placeNameInput.value = ""; // Очистка имени места
  linkInput.value = ""; // Очистка ссылки
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
  openModal(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
// попад добавления карточки
addCardButton.addEventListener("click", () => openModal(popupAddCard));
