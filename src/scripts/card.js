import { openModal } from "./modal";

const template = document.querySelector("#card-template");
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
    handleImageClick(cardData);
  });
  likeButton.addEventListener("click", () => {
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
export { createCard, deleteCard, likeClick };
