import { likeCard, dislikeCard, deleteCardFromServer } from "./api";

const template = document.querySelector("#card-template");

function likeClick(likeButton, cardId, likeCounter) {
  
  if (likeButton.classList.contains("card__like-button_is-active")) {
    dislikeCard(cardId)
      .then((updateCard) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCounter.textContent = updateCard.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    likeCard(cardId)
      .then((updateCard) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCounter.textContent = updateCard.likes.length;
      })
      .catch((err) => console.log(err));
  }
}
function createCard(
  cardData,
  handleImageClick,
  userID
) {
  const cardHtml = template.content.firstElementChild.cloneNode(true);
  const cardTitle = cardHtml.querySelector(".card__title");
  const cardImage = cardHtml.querySelector(".card__image");
  const likeButton = cardHtml.querySelector(".card__like-button");
  const likeCounter = cardHtml.querySelector(".card__like-counter");
  const cardDeleteButton = cardHtml.querySelector('.card__delete-button');
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
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  if (userID !== cardData.owner._id) {
    cardDeleteButton.style.display = "none";
    } else {
      cardDeleteButton.addEventListener("click", () => {
      const cardId = cardData._id;
      deleteCardFromServer(cardId)
        .then(() => {
          cardHtml.remove();
        })
        .catch((err) => console.log(err));
    });
  }

  cardImage.addEventListener("click", () => {
    handleImageClick(cardData);
  });
  likeButton.addEventListener("click", () => {
    likeClick(likeButton, cardId, likeCounter);
  });

  return cardHtml;
}

export { createCard };
