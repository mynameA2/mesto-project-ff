import '../pages/index.css';
import {initialCards} from './cards.js';
import {openModal, closeModal, closeEsc, closeOverlay} from './modal.js';
import {createCard, deleteCard} from './card.js';


const list = document.querySelector('.places__list');
// const sectionElementPlaces = document.querySelector('.places');
// const conteinerCards = sectionElementPlaces.querySelector('.places__list');
const popupCloseButton = document.querySelectorAll('.popup__close');
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
const popup = document.querySelectorAll('.popup');
const popupContent = document.querySelectorAll('.popup__content');

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const cardHtml = createCard(cardData, deleteCard);
    list.append(cardHtml);
});
// закрытие попапа через кнопку
popupCloseButton.forEach(item => {  
    item.addEventListener('click', closeModal);
  });
// закрытие попапа через кнопку
popupCloseButton.forEach(item => {  
    item.addEventListener('click', closeModal);
  });
// закрытие попапа через кнопку
popupCloseButton.forEach(item => {  
    item.addEventListener('click', closeModal);
  });
 // закрытие попапа через esc
 document.addEventListener('keydown', closeEsc);
 //  убираем слушателя при закрытом попапе
 if (!'popup_is-opened') {
    document.removeEventListener('keydown', closeEsc);
    } 
// закрытие попапа через overlay
    popup.forEach((item) => {
        item.addEventListener('click', ()=>{
            closeOverlay();
        } );
    })
    popupContent.forEach((item) => {
        item.addEventListener('click', (evt) => {
            evt.stopPropagation();
        })
    })   
 // редактирование профиля
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    close();
    }
    formElement.addEventListener('submit', handleFormSubmit); 
// добавление карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault(); 
    const placeNameValue = placeNameInput.value;
    const linkValue = linkInput.value;
    placeNameInput.value = placeNameValue;
    linkInput.value = linkValue;
    }
formAddCard.addEventListener('submit', handleCardFormSubmit); 
 
// попап редактирования профиля
editButton.addEventListener('click', () => openModal(popupEdit));
// попад добавления карточки
addCardButton.addEventListener('click', () => openModal(popupAddCard));