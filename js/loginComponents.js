import { authorizationUser, registrationUser } from "./push.js";

export let token = null;

export function renderLoginComponents(appElement, askDataServ) {
    let isLoginMode = true;

    const appHtml = `
            <ul class="comments" id="blockOfComments">
        <!-- Тут будет список комментов -->
            </ul>
            <p>Чтобы добавить комментарий, <a href='#' id='toogleLink'>авторизуйтесь<a><p>
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
                });
            } else {
                registrationUser((newToken) => {
                    token = newToken;
                });
            }
        })

    }

    //renderForm();

}


/* <div class="text-while-add-comment dpnone">
      Пожалуйста подождите, комментарий добавляется...
    </div>
    <div class="add-form">
      <input id="inputForName" type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea id="inputForComment" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button class="add-form-button add-form-button_disable" id="buttonForWriteComment" disabled>Написать</button>
      </div>
    </div>

    <div class="add-form">
      <h3 class="">Форма входа</h3>
      <input id="inputForRegName" type="text" class="add-form-regname" placeholder="Введите имя"/>
      <br>
      <input id="inputForRegLogin" type="text" class="add-form-regname" placeholder="Введите логин" />
      <br>
      <input id="inputForRegPassword" type="password" class="add-form-regname" placeholder="Введите пароль" />
      
        <button class="add-form-button add-form-button_disable" id="buttonForWriteComment" disabled>Зарегистрироваться</button>
        <br>
        <a href="#" class="text_Reglink">Войти</a>
        
    </div> */