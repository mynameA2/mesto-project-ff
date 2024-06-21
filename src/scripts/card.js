import { openModal } from "./modal";

const template = document.querySelector("#card-template");
const popupZoom = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const likeButton = document.querySelector(".card__like-button");
function createCard(cardData, deleteCallback, likeClick, handleImageClick) {
  const cardHtml = template.content.firstElementChild.cloneNode(true);
  const cardTitle = cardHtml.querySelector(".card__title");
  const cardImage = cardHtml.querySelector(".card__image");
  const likeButton = cardHtml.querySelector(".card__like-button");

  cardHtml.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardImage.addEventListener("click", () => {
    handleImageClick({ name: cardData.name, link: cardData.link });
  });
  cardHtml.addEventListener("click", () => {
    likeClick(likeButton);
  });

  cardHtml
    .querySelector(".card__delete-button")
    .addEventListener("click", () => deleteCallback(cardHtml));
  return cardHtml;
}

function deleteCard(card) {
  card.remove();
}
function likeClick(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
function handleImageClick(cardData) {
  openModal(popupZoom);
  popupImage.alt = cardData.name;
  popupImage.src = cardData.link;
  popupCaption.textContent = cardData.name;
}
export { createCard, deleteCard, likeClick, handleImageClick };
