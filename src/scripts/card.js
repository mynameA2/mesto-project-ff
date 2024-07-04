import { openModal } from "./modal";
import { likeCard, dislikeCard } from "./api";

const template = document.querySelector("#card-template");
function createCard(cardData, deleteCallback, likeClick, handleImageClick, userID) {
  const cardHtml = template.content.firstElementChild.cloneNode(true);
  const cardTitle = cardHtml.querySelector(".card__title");
  const cardImage = cardHtml.querySelector(".card__image");
  const likeButton = cardHtml.querySelector(".card__like-button");
  const likeCounter = cardHtml.querySelector(".card__like-counter");
  const cardId = cardData._id;

  cardHtml.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeCounter.textContent = cardData.likes.length;

  const isLiked = cardData.likes.some((like) => like._id === userID);

//   проверка на лайк
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }else{
    likeButton.classList.remove("card__like-button_is-active"); 
  }


  cardImage.addEventListener("click", () => {
    handleImageClick(cardData);
  });
  likeButton.addEventListener("click", () => {
    likeClick(likeButton, cardId, likeCounter);
  });

  cardHtml
    .querySelector(".card__delete-button")
    .addEventListener("click", () => deleteCallback(cardHtml));
  return cardHtml;
}

function deleteCard(card) {
  card.remove();
}

function likeClick(likeButton, cardId, likeCounter) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    dislikeCard(cardId);
    likeCounter.textContent = Number(likeCounter.textContent) - 1
  } else {
    likeCard(cardId);
    likeCounter.textContent = Number(likeCounter.textContent) + 1
  }
}


export { createCard, deleteCard, likeClick };
