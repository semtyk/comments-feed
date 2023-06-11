'use strict'
//этот файл содержит подпрограмму преобразования данных с json в массив 

import { renderComments } from "./render.js";       //импорт рендре функции

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
        renderComments(array);      //после того как преобразовали данные, рендерим их на страницу в виде комментария
    })
}

export {convertServToArr};