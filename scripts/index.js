// @todo: Темплейт карточки
const list = document.querySelector('.places__list');
const template = document.querySelector('#card-template');

// @todo: DOM узлы
const sectionElementPlaces = document.querySelector('.places');
const conteinerCards = sectionElementPlaces.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(cardData) {
    const cardHtml = template.content.cloneNode(true);
    cardHtml.querySelector('.card__title').textContent = cardData.name;
    cardHtml.querySelector('.card__image').src = cardData.link;
    cardHtml.querySelector('.card__image').alt = cardData.name;
    cardHtml.querySelector('.card__delete-button').addEventListener('click', function () {
        card.remove(); 
    })
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