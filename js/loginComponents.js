import { authorizationUser, registrationUser } from "./push.js";

export let token = null;
export let currentUser = null;

export function renderLoginComponents(appElement, askDataServ) {
    let isLoginMode = true;

    const appHtml = `
            <ul class="comments" id="blockOfComments">
            <p>Пожалуйста подождите, комментарии загружаются...</p>
            </ul>
            <p>Чтобы добавить комментарий, <a href='#' id='toogleLink'>авторизуйтесь<a></p>
        `;

    appElement.innerHTML = appHtml;
    askDataServ();
    document.getElementById('toogleLink').addEventListener('click', () => {
        renderForm();
    })

    const renderForm = () => {

        appElement.innerHTML = `<div class="add-form">
            <h3>Форма ${isLoginMode ? 'входа' : 'регистрации'}</h3>
            ${isLoginMode ? ' ' : `<input id="inputForRegName" type="text" class="add-form-regname" placeholder="Введите имя"/> <br>`}          
            <input id="inputForRegLogin" type="text" class="add-form-regname" placeholder="Введите логин" />
            <br>
            <input id="inputForRegPassword" type="password" class="add-form-regname" placeholder="Введите пароль" />
            
                <button class="add-form-button" id="buttonForReg">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
                <br>
                <a href="#" class="text_Reglink" id='toggleRegLink'>${isLoginMode ? 'Зарегистрироваться' : 'Войти'}</a>               
            </div>`

        document.getElementById('toggleRegLink').addEventListener('click', () => {
            isLoginMode = !isLoginMode;
            renderForm();
        })


        document.getElementById('buttonForReg').addEventListener('click', () => {
            if (isLoginMode) {
                authorizationUser((newToken) => {
                    token = newToken;
                }, (newUser) => {currentUser = newUser});
            } else {
                registrationUser((newToken) => {
                    token = newToken;
                }, (newUser) => { currentUser = newUser });
            }
        })
    }
}

