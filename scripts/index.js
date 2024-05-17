// @todo: Темплейт карточки
const list = document.querySelector('.places__list');
const template = document.querySelector('#card-template');

// @todo: DOM узлы
const sectionElementPlaces = document.querySelector('.places');
const ulElement = sectionElementPlaces.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(cardData) {
    const cardHtml = template.content.cloneNode(true);
    cardHtml.querySelector('.card__title').textContent = cardData.name;
    cardHtml.querySelector('.card__image').src = cardData.link;
return cardHtml;
};
// do: Функция удаления карточки
list.addEventListener('click', function (event) {
    const isDeleteButton = event.target.classList.contains('card__delete-button');
    if (isDeleteButton) {
       const card = event.target.closest('.card');
       card.remove();
    }
});

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const cardHtml = createCard(cardData);
    list.append(cardHtml);
 })