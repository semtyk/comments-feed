'use strict'
//этот файл содержит рендер функцию

import { elComments } from "./variables.js";
import { initAnswerComment, initUpdateLikesListeners } from "./push.js";        //импорт функций для ответа на коммент и лайка

//Функция для форматирования даты под коммент

const formatDate = (dateObject) => {
    let minutes = dateObject.getMinutes();
    let months = dateObject.getMonth() + 1;
    let years = dateObject.getFullYear() - 2000;
    let days = dateObject.getDate();
    if (days < 10) {
        days = "0" + days;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (months < 10) {
        months = "0" + months;
    }
    const outDate = days + '.' + months + '.' + years + '  ' + dateObject.getHours() + ':' + minutes;
    return outDate;
}


//рендер-функция преобразования из массива в html содержимое комментария

const renderComments = (array) => {
    const commentsHTML = array.map((item, index) => {
        let activeLike = '';
        if (item.isActiveLike) {
            activeLike = '-active-like'
        }
        return `<li class="comment">
        <div class="comment-header">
          <div>${item.name}</div>
          <div>${formatDate(item.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${item.text}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${item.likes}</span>
            <button class="like-button ${activeLike}" data-id='${item.id}' data-index='${index}'></button>
          </div>
        </div>
      </li>`
    }).join('');


    elComments.innerHTML = commentsHTML;
    initUpdateLikesListeners(array);
    initAnswerComment();
}

export {renderComments};