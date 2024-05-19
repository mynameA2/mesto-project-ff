// @todo: Темплейт карточки
const list = document.querySelector('.places__list');
const template = document.querySelector('#card-template');

// @todo: DOM узлы
const sectionElementPlaces = document.querySelector('.places');
const conteinerCards = sectionElementPlaces.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCallback) {
    const cardHtml = template.content.firstElementChild.cloneNode(true);
    // firstElementChild - первый дочерний элемент в document-fragment
    cardHtml.querySelector('.card__title').textContent = cardData.name;
    cardHtml.querySelector('.card__image').src = cardData.link;
    cardHtml.querySelector('.card__image').alt = cardData.name;
    cardHtml.querySelector('.card__delete-button').addEventListener('click',() => { deleteCallback(cardHtml);
 });
return cardHtml;
};
// do: Функция удаления карточки 
function deleteCard(card) {
    card.remove()
}
// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const cardHtml = createCard(cardData, deleteCard);
    list.append(cardHtml);
})