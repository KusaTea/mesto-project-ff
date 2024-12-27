const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-29',
    headers: {
        authorization: '2630d1a1-9682-4616-a095-b5906122210f',
        'Content-type': 'application/json'
    }
};


function checkAnswer (res) {
    if (res.ok) {
        return res.json();
    };
    return Promise.reject(`Ошибка: ${res.status}`);
};


function getUserInfo () {
    return fetch(config.baseUrl + '/users/me', {
        method: 'GET',
        headers: {authorization: config.headers.authorization}
    })
    .then(checkAnswer)
};

function getInitialCards () {
    return fetch(config.baseUrl + '/cards', {
        method: 'GET',
        headers: {authorization: config.headers.authorization}
    })
    .then(checkAnswer)
}

function getInitialInformation () {
    return Promise.all([getUserInfo(), getInitialCards()])
        .then(res => res)
}

function changeProfileInfo (newName, newDescription) {
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newDescription
        })
    })
    .then(checkAnswer)
}

function sendNewCard (cardName, cardImageLink) {
    return fetch(config.baseUrl + '/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardImageLink
        })
    })
    .then(checkAnswer)
}

function removeCardRequest (card) {
    fetch(config.baseUrl + `/cards/${card.dataset.id}`, {
        method: 'DELETE',
        headers: {authorization: config.headers.authorization}
    })
    .then(checkAnswer)
}

function likeCardRequest (card, method) {
    fetch(config.baseUrl + `/cards/likes/${card.dataset.id}`, {
        method: method,
        headers: {authorization: config.headers.authorization}
    })
    .then(checkAnswer)
}


function changeAvatar (link) {
    return fetch(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
    .then(checkAnswer)
}

function renderLoading (isLoading, button) {
    if (isLoading) {
      button.textContent = 'Сохранение...'
    } else {
      button.textContent = 'Сохранить'
    }
  }


export { getInitialInformation, getUserInfo, changeProfileInfo, sendNewCard, removeCardRequest, likeCardRequest, changeAvatar, renderLoading }