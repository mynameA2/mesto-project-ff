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
        popupZoom.classList.add('popup_is-opened', 'popup_is-animated');
        popupImage.src = cardData.link;
    });
    cardHtml.querySelector('.card__image').alt = cardData.name;
    cardHtml.querySelector('.card__delete-button').addEventListener('click',() => { deleteCallback(cardHtml);
    }) 
    // лайк
    const likeButtons = document.querySelectorAll('.card__like-button');
    likeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.toggle('card__like-button_is-active');
        });
    });
return cardHtml;
};

function deleteCard(card) {
    card.remove()
}

export {createCard, deleteCard, };