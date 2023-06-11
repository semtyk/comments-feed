'use strict'
//этот файл содержит рендер функцию


import { initAnswerComment, initUpdateLikesListeners } from "./push.js";        //импорт функций для ответа на коммент и лайка
import { askDataServ } from "./api.js";
import { renderLoginComponents, token } from "./loginComponents.js";

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

export const renderComments = (array) => {
  const elComments = document.getElementById('blockOfComments');   //страница с комментами
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
}

const renderApp = (array) => {
  const appElement = document.getElementById('app');

  if (!token) {
    renderLoginComponents(appElement, askDataServ);
    return;
  }

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


  const appHtml = `
            <ul class="comments" id = "blockOfComments">
          ${commentsHTML}
        </ul >
        <div class="text-while-add-comment dpnone">
          Пожалуйста подождите, комментарий добавляется...
        </div>
        <div class="add-form">
          <input id="inputForName" type="text" class="add-form-name" placeholder="Введите ваше имя" />
          <textarea id="inputForComment" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
            rows="4"></textarea>
          <div class="add-form-row">
            <button class="add-form-button add-form-button_disable" id="buttonForWriteComment" disabled>Написать</button>
          </div>
        </div>`;

  appElement.innerHTML = appHtml;
  //initUpdateLikesListeners(array);
  //initAnswerComment();
}

export { renderApp };




