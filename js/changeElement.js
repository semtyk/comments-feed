'use strict'
//этот файл содержит подпрограммы для изменения внешнего вида элементов
import { commentButton } from "./variables.js";

//Расширенная валидация

function letDisabledButton(expectedValue) {
    if (expectedValue === '') {
        commentButton.disabled = true;
        commentButton.classList.add('add-form-button_disable')
    } else {
        commentButton.disabled = false;
        commentButton.classList.remove('add-form-button_disable')
    }
};

//Очистка формы

function letClearForm(form) {
    form.classList.remove('error');
};

export {letDisabledButton, letClearForm}