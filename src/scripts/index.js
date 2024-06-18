import '../pages/index.css';
import {initialCards} from './cards.js';
import {openModal, closeModal, closeEsc, closeOverlay} from './modal.js';
import {createCard, deleteCard} from './card.js';


const list = document.querySelector('.places__list');
const sectionElementPlaces = document.querySelector('.places');
const conteinerCards = sectionElementPlaces.querySelector('.places__list');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('#edit-profile');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description')
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const formAddCard = document.querySelector('#new-place');
const placeNameInput = document.querySelector('#place-name');
const linkInput = document.querySelector('#link')
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup');
const popupContents = document.querySelectorAll('.popup__content');

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const cardHtml = createCard(cardData, deleteCard);
    list.append(cardHtml);
});
// закрытие попапа через кнопку
popupCloseButtons.forEach(item => {  
    item.addEventListener('click', closeModal);
  });

// закрытие попапа через overlay
    popups.forEach((item) => {
        item.addEventListener('click', ()=>{
            closeOverlay();
        } );
    })
    popupContents.forEach((item) => {
        item.addEventListener('click', (evt) => {
            evt.stopPropagation();
        })
    })   
 // редактирование профиля
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal();
    }
    formElement.addEventListener('submit', handleFormSubmit); 
// добавление карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault(); 
    const newCard = createCard(
        { name: placeNameInput.value, link: linkInput.value },
        deleteCard
    );
    conteinerCards.prepend(newCard);
    closeModal();
    }
formAddCard.addEventListener('submit', handleCardFormSubmit); 
 
// попап редактирования профиля
editButton.addEventListener('click', () => openModal(popupEdit));
// попад добавления карточки
addCardButton.addEventListener('click', () => openModal(popupAddCard));