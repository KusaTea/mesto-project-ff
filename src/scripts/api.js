const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-29',
    headers: {
        authorization: '2630d1a1-9682-4616-a095-b5906122210f',
        'Content-type': 'application/json'
    }
};

function getUserInfo () {
    return fetch(config.baseUrl + '/users/me', {
        method: 'GET',
        headers: {authorization: config.headers.authorization}
    })
    .then((res) => {
        if (res.ok) {
            return res;
        };
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });
};

function getInitialCards () {
    return fetch(config.baseUrl + '/cards', {
        method: 'GET',
        headers: {authorization: config.headers.authorization}
    })
    .then((res) => {
        if (res.ok) {
            return res;
        };
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });;
}

function getInitialInformation () {
    return Promise.all([getUserInfo(), getInitialCards()])
        .then((res) => {
                return res;
        });
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
    .then((res) => {
        if (res.ok) {
            return res.json()
        };
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });
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
    .then((res) => {
        if (res.ok) {
            return res.json();
        };
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });
}

function removeCard (evt) {
    const card = evt.target.closest(".card");
    fetch(config.baseUrl + `/cards/${card.dataset.id}`, {
        method: 'DELETE',
        headers: {authorization: config.headers.authorization}
    })
        .then((res) => {
            if (res.ok) {
                card.remove();
            } else {
                Promise.reject(`Ошибка: ${res.status}`)
            };
        })
        .catch((err) => {
            console.log(err);
        });
}

function changeLike (card, button, method) {
    fetch(config.baseUrl + `/cards/likes/${card.dataset.id}`, {
        method: method,
        headers: {authorization: config.headers.authorization}
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        };
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
        button.classList.toggle('card__like-button_is-active');
        card.querySelector('.card__like-number').textContent = data.likes.length;
    })
    .catch((err) => console.log(err));
}

function likeCard (evt) {
    const card = evt.target.closest(".card");
    if (evt.target.classList.contains('card__like-button_is-active')) {
        changeLike(card, evt.target, 'DELETE');
    } else {
        changeLike(card, evt.target, 'PUT');
    };
  }

function changeAvatar (link) {
    return fetch(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        };
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    });
}

function renderLoading (isLoading, button) {
    if (isLoading) {
      button.textContent = 'Сохранение...'
    } else {
      button.textContent = 'Сохранить'
    }
  }


export { getInitialInformation, getUserInfo, changeProfileInfo, sendNewCard, removeCard, likeCard, changeAvatar, renderLoading }