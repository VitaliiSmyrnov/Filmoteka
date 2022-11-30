
import { clickBox, inputChangeTheme } from "./refs";
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
