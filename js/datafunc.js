'use strict'
//этот файл содержит подпрограмму преобразования данных с json в массив 

import { renderApp, renderComments } from "./render.js";       //импорт рендре функции
import { token } from "./loginComponents.js";

//Функция преобразования данных с сервера в массив комментариев

const convertServToArr = (response, array) => {
    return response.json().then((responseData) => {
        array = responseData.comments;
        array = array.map((item) => {
            return {
                name: item.author.name,
                date: new Date(item.date),
                text: item.text,
                likes: item.likes,
                isActiveLike: item.isLiked,
                id: item.id,
            }
        });
        if (!token) {
            renderComments(array);      //Если мы без авторизации, то уже в существующую разметку добавляем ленту комментариев
        } else renderApp(array);
        
    })
}

export {convertServToArr};