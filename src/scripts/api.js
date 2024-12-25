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
    });
};

function getInitialCards () {
    return fetch(config.baseUrl + '/cards', {
        method: 'GET',
        headers: {authorization: config.headers.authorization}
    });
}

function getInitialInformation () {
    return Promise.all([getUserInfo(), getInitialCards()])
        .then((res) => {
            if (res[0].ok & res[1].ok) {
                return res;
            };
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
}

function changeProfileInfo (newName, newDescription) {
    fetch(config.baseUrl + '/users/me', {
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
    .then((answer) => {
        return answer["name"], answer["about"];
    })
    .catch((err) => {
        console.log(err);
    });
}

function sendNewCard (cardName, cardImageLink) {
    fetch(config.baseUrl + '/cards', {
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
    })
}

export { getUserInfo, getInitialCards, getInitialInformation, changeProfileInfo }