import { data } from "autoprefixer";
const configSet = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-17",
  headers: {
    authorization: "eedf6ae8-5131-4b63-a103-f6cc42ac5f14",
    "Content-Type": "application/json",
  },
};

const checkTheResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};



// запрос на получение информации о пользователе
 function getUserInfo() {
  return fetch(`${configSet.baseUrl}/users/me`, {
    method: "GET",
    headers: configSet.headers,
  })
    .then((res) => checkTheResponse(res))
    .catch((err) => {
      console.log(err);
    });
}

// запрос на получение карточек
 function getInitialCards() {
  return fetch(`${configSet.baseUrl}/cards`, {
    method: "GET",
    headers: configSet.headers,
  })
  .then((res) => checkTheResponse(res))
    .catch((err) => {
      console.log(err);
    });
}

const getInitialInfo = () => {
    return Promise.all([getUserInfo(), getInitialCards()]);
  };

//   редактирование профиля
 function editProfile(userProfileData) {
  return fetch(`${configSet.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configSet.headers,
    body: JSON.stringify({
      name: userProfileData.name,
      about: userProfileData.about,
    }),
  })
    .then((res) => checkTheResponse(res))
    .catch((err) => {
      console.log(err);
    });
}

// добавление карточки
 function addCard(cardData) {
  return fetch(`${configSet.baseUrl}/cards`, {
    method: "POST",
    headers: configSet.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  })
    .then((res) => checkTheResponse(res))
    .catch((err) => {
      console.log(err);
    });
}

// лайк карточки
 function likeCard(cardId) {
  return fetch(`${configSet.baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: configSet.headers,
  })
    .then((res) => checkTheResponse(res))
    .catch((err) => {
      console.log(err);
    });
}

// дизлайк карточки
 function dislikeCard(cardId) {
  return fetch(`${configSet.baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: configSet.headers,
  })
    .then((res) => checkTheResponse(res))
    .catch((err) => {
      console.log(err);
    });
}

//   загрузка аватара
 function editAvatar(link) {
  return fetch(`${configSet.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: configSet.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then((res) => checkTheResponse(res))
    .catch((err) => {
      console.log(err);
    });
}

export {
  configSet,
  checkTheResponse,
  getUserInfo,
  getInitialCards,
  getInitialInfo,
  editProfile,
  addCard,
  likeCard,
  dislikeCard,
  editAvatar,
};