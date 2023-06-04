'use strict'
//этот файл содержит подпрограммы отправки и приема данных с сервера

import { arrOfComments, userCommentInput, userNameInput, formForComment, messageCommentAdd } from "./variables.js"; //импорт переменных
import { convertServToArr } from "./datafunc.js";                                                                   //импорт функции преобразования данных с json в массив
import { sendComment } from "./push.js";                                                                            //импорт функции отправки комментария 

//инициализируем запрос на сервер

function askDataServ() {
    return fetch('https://webdev-hw-api.vercel.app/api/v1/sergey-matveev/comments', {
        method: 'GET',
    }).then((response) => {
        convertServToArr(response, arrOfComments);          //после получения ответа от сервера преобразуем данные с json в массив
    })
        .catch((error) => {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
        })
};


//инициализируем отправку данных на сервер

function sendDataServ() {
    return fetch('https://webdev-hw-api.vercel.app/api/v1/sergey-matveev/comments', {
        method: 'POST',
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

export {askDataServ, sendDataServ};