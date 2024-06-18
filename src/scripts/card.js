import { openModal } from "./modal";

const template = document.querySelector('#card-template');
const popupZoom = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');

function createCard(cardData, deleteCallback, likeClick) {
    const cardHtml = template.content.firstElementChild.cloneNode(true);
    // firstElementChild - первый дочерний элемент в document-fragment
    cardHtml.querySelector('.card__title').textContent = cardData.name;
    const cardImage = cardHtml.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.addEventListener('click', () => {
        openModal(popupZoom);
        popupImage.alt = cardData.name;
        popupImage.src = cardData.link;
    });
    cardHtml.querySelector('.card__image').alt = cardData.name;
    cardHtml.querySelector('.card__delete-button').addEventListener('click',() => { deleteCallback(cardHtml);
    }) 
    // лайк
    const likeButton = cardHtml.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
        });
return cardHtml;
};

function deleteCard(card) {
    card.remove()
}

export {createCard, deleteCard, };