// import { setToLocalStorage, getFromLocalStorage } from "./local-storage_theme-switcher";

// const clickBox = document.querySelector('#theme-switch-toggle');
// const lightEl = document.querySelector('#theme-switch-light');
// const bodySwitch = document.querySelector('body');


// const theme = {
//   LIGHT: 'light-theme',
//   DARK: 'dark-theme',
// };

// const { LIGHT, DARK } = theme;

// let newTheme = getFromLocalStorage('n-theme');

// if (!newTheme) {
//   // newTheme = LIGHT;
//   setToLocalStorage('n-theme', LIGHT);
// } else {
//   bodySwitch.classList.add('darkThemeStyle');
// }

// clickBox = newTheme === LIGHT ? false : true;

// lightEl.addEventListener('click', changeTheme);

// function changeTheme(e) {
//   bodySwitch.classList.toggle('darkThemeStyle');
  
//   setToLocalStorage('theme', bodySwitch.classList.contains(DARK) ? DARK : LIGHT);
// }

// clickBox.addEventListener('click', changeTheme);
// const menuRef = document.querySelector(".js-menu"); //ссылка на место для вставки разметки меню

const clickBox = document.querySelector('#theme-switch-toggle'); //ссылка на переключатель темы
const inputChangeTheme = document.querySelector('.theme-switch__toggle');
const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};
const {LIGHT, DARK} = Theme;
document.body.classList.add(LIGHT); //ставим светлую тему по умолчанию
const handleInputChange = (e) => { //если input checked включается темная тема, если нет, то остается светлая
    if(e.target.checked) {
        document.body.classList.replace(LIGHT, DARK);
        localStorage.setItem("Theme", DARK);
    } else {
        document.body.classList.replace(DARK, LIGHT);
        localStorage.setItem("Theme", LIGHT);
    }
}
const localStorageTheme = () => { //если тема в localStorage dark, то чекбокс ставим в положение true и устанавливаем темную тему
    if(localStorage.getItem("Theme") === "dark-theme") {
        inputChangeTheme.checked = "true";
        document.body.classList.replace(LIGHT, DARK);
    }
    return
}
inputChangeTheme.addEventListener("change", handleInputChange); //вешаем слушателя событий на переключатель темы
localStorageTheme()
