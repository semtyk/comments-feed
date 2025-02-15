'use strict'
//этот файл содержит подпрограммы отправки и приема данных с сервера

import { arrOfComments} from "./variables.js"; //импорт переменных
import { convertServToArr } from "./datafunc.js";                                                                   //импорт функции преобразования данных с json в массив
import { sendComment } from "./push.js";                                                                            //импорт функции отправки комментария 
import { token } from "./loginComponents.js";
//инициализируем запрос на сервер

function askDataServ() {
    return fetch('https://wedev-api.sky.pro/api/v2/sergey-matveev/comments', {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    }).then((response) => {
        convertServToArr(response, arrOfComments);          //после получения ответа от сервера преобразуем данные с json в массив
    })
        .catch((error) => {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
        })
};


//инициализируем отправку данных на сервер

function sendDataServ() {
    
    const userNameInput = document.getElementById('inputForName');          //поле ввода имени
    const userCommentInput = document.getElementById('inputForComment');    //поле ввода коммента
    const messageCommentAdd = document.querySelector('.text-while-add-comment');  //сообщение что коммент отправляется
    const formForComment = document.querySelector('.add-form');                   //форма ввода комментария

    return fetch('https://webdev-hw-api.vercel.app/api/v2/sergey-matveev/comments', {
        method: 'POST',
        headers: {
            Authorization: token,
        },
        body: JSON.stringify({
            text: userCommentInput.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            name: userNameInput.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            forceError: true,
        })
    }).then((response) => {
        switch (response.status) {      //смотрим коды ответа сервера
            case 201:                   //тут все гуд, данные отправлены, значит нам надо их получить обратно и срендерить (это внутри функции askDataServ)
                return askDataServ();
            case 400:                   //тут ошибка, принудительно прерываем промис
                return Promise.reject(new Error('меньше 3 символов'));
            case 500:                   //тут ошибка, принудительно прерываем промис
                return Promise.reject(new Error('сервер сломался'));
            default:
                break;
        }
    })
        .then(() => {
            formForComment.classList.remove('dpnone');    //после успешного получения комментариев, заменяем текстовую заглушку формой отправки комментария 
            messageCommentAdd.classList.add('dpnone');
            userNameInput.value = "";                     //очищаем поля
            userCommentInput.value = "";
        })
        .catch((error) => {                               //ловим и обрабатываем ошибки в цепочках промисов
            formForComment.classList.remove('dpnone');    //в случае ошибок от сервера, заменяем текстовую заглушку формой отправки комментария 
            messageCommentAdd.classList.add('dpnone');
            switch (error.message) {
                case 'меньше 3 символов':
                    alert('Имя и комментарий должны быть не короче 3 символов')
                    break;
                case 'сервер сломался':
                    //alert('Сервер сломался, попробуй позже');
                    console.log('Сервер сломался, попробуй позже');
                    sendComment();
                    break;
                default:
                    alert('Кажется, у вас сломался интернет, попробуйте позже')
                    break;
            }
        });
}

export function loginUser(login, password) {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Неверный логин или пароль');
            }
            return response.json();
        });
}

export function regUser(login, password, name) {
    return fetch('https://wedev-api.sky.pro/api/user', {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Такой пользователь уже существует');
            }
            return response.json();
        });
}

export {askDataServ, sendDataServ};