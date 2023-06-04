'use strict'
//этот файл содержит переменные
export let arrOfComments = []; //Массив комментов
export const elComments = document.getElementById('blockOfComments');   //страница с комментами
export const userNameInput = document.getElementById('inputForName');          //поле ввода имени
export const userCommentInput = document.getElementById('inputForComment');    //поле ввода коммента
export const commentButton = document.getElementById('buttonForWriteComment');   //кнопка для отправки коммента
export const messageCommentAdd = document.querySelector('.text-while-add-comment');  //сообщение что коммент отправляется
export const formForComment = document.querySelector('.add-form');                   //форма ввода комментария