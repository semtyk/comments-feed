'use strict'
//этот файл содержит подпрограммы, активируемые при нажатии каких либо элементов на странице

import { renderComments } from "./render.js";       //импорт рендер функции
import { userCommentInput, userNameInput, formForComment, messageCommentAdd } from "./variables.js";        //импорт переменных
import { sendDataServ } from "./api.js";            //импорт функции отправки данных на сервер
import { letClearForm } from "./changeElement.js";

//Функция задержки для использования вместо промисов
function delay(interval) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

//Функция для включения кнопки лайка на любом из комментов

const initUpdateLikesListeners = (array) => {
    const likeButtonsElements = document.querySelectorAll(".like-button");

    for (const likeButtonsElement of likeButtonsElements) {
        likeButtonsElement.addEventListener("click", (e) => {
            e.stopPropagation();
            const index = likeButtonsElement.dataset.index;
            likeButtonsElement.classList.add('-loading-like');
            delay(1000).then(() => {
                if (array[index].isActiveLike) {
                    array[index].likes--;
                } else {
                    array[index].likes++;
                }
                array[index].isActiveLike = !array[index].isActiveLike;
                likeButtonsElement.classList.remove('-loading-like');
                renderComments(array);      //после того как нажали на лайк, рендерим страницу (число лайков изменилось)
            })

        });
    }
};

//Функция для функционала ответ на комментарий

const initAnswerComment = () => {
    const oldComments = document.querySelectorAll('.comment')
    for (const oldComment of oldComments) {                         //при нажатии на коммент, пихаем его внутреннее содержимое в поле ввода комментария
        oldComment.addEventListener('click', () => {
            userCommentInput.value = `> ${oldComment.querySelector('.comment-text').innerHTML
                .replaceAll("&amp;", "&")
                .replaceAll("&lt;", "<")
                .replaceAll("&gt;", ">")
                .replaceAll("&quot;", '"')}`
                + `\n\n${oldComment.querySelector('.comment-header').children[0].innerHTML
                    .replaceAll("&amp;", "&")
                    .replaceAll("&lt;", "<")
                    .replaceAll("&gt;", ">")
                    .replaceAll("&quot;", '"')},`
        })
    }
}

//Функция вызываемая по нажатии кнопки отправки коммента

const sendComment = () => {
    letClearForm(userNameInput);
    letClearForm(userCommentInput);


    //валидация что поля не пустые и содержат больше 3х символов
    if (userNameInput.value === "") {
        userNameInput.classList.add('error');
        if (userCommentInput.value.replaceAll("\n", "") === "") {
            userCommentInput.classList.add('error');
        }
        return;
    }
    if (userCommentInput.value.replaceAll("\n", "") === "") {
        userCommentInput.classList.add('error');
        return;
    }

    formForComment.classList.add('dpnone');           //если валидация пройдена то заменяем форму отправки комментария текстовой заглушкой
    messageCommentAdd.classList.remove('dpnone');

    //Отправляем обьект { "text": "...", "name": "..." } на сервер
    sendDataServ();
};

export {initUpdateLikesListeners, initAnswerComment, sendComment}

