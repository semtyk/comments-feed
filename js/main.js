"use strict";


import {askDataServ} from "./api.js";
import { userCommentInput, commentButton, arrOfComments } from "./variables.js";
import { letClearForm, letDisabledButton } from "./changeElement.js";
import { sendComment } from "./push.js";
import { renderApp } from "./render.js";

//***************************************************************************************************************
//*********************************************************************************************************
//---- Выполняемый код --------------------
//*********************************************************************************************************
//***************************************************************************************************************

//elComments.innerHTML = 'Пожалуйста подождите, комментарии загружаются...';    //Вставляем заглушку на место пока не прогрузившегося блока с комментами

//askDataServ();      //Заправшиваем данные с сервера и рендерим блок с комментами
renderApp(arrOfComments);

//инициализируем подписку на события клика и ввода в поля имени и комментария
const userNameInput = document.getElementById('inputForName');          //поле ввода имени
userNameInput.addEventListener('input', () => {
    letDisabledButton(userNameInput.value)
});
userCommentInput.addEventListener('input', () => {
    letDisabledButton(userCommentInput.value);
});
userNameInput.addEventListener('click', () => {
    letClearForm(userNameInput);
});
userCommentInput.addEventListener('click', () => {
    letClearForm(userCommentInput);
});


//инициализируем подписку на событие по клику по кнопке отправки коммента:
commentButton.addEventListener('click', sendComment);

//обработчик по клавише enter:
document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        sendComment();
    }
})

console.log("It works!");