const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('.form');
const containerElem = document.querySelector('.modal__wrapper');
// const addWatchBtn = document.querySelector('.film__button-add-to-watch');
// const addQueueBtn = document.querySelector('.film__button-add-to-queue');

const openModalBtn = document.querySelector('[data-modal-open]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');

const goTop = document.getElementById('go-top');
const headerContainer = document.querySelector('.header__container');

const footerModal = document.querySelector('.footer__modal');
const openTeamModal = document.querySelector('.footer-team__name');
const closeTeamModal = document.querySelector('#teammates');
const backdrop = document.querySelector('.backdrop__footer');
const clickBox = document.querySelector('#theme-switch-toggle');
const inputChangeTheme = document.querySelector('.theme-switch__toggle');

const openModalAuth = document.querySelector('[data-auth-open]');
const closeLoginBtn = document.querySelector('[data-login-close]');
const closeRegBtn = document.querySelector('[data-register-close]');
const closeResultBtn = document.querySelector('[data-result-close]');
const modalAuth = document.querySelector('[data-auth-modal]');

export {
  galleryRef,
  formRef,
  openModalBtn,
  closeModalBtn,
  modal,
  containerElem,
  addWatchBtn,
  goTop,
  headerContainer,
  footerModal,
  openTeamModal,
  closeTeamModal,
  backdrop,
  addQueueBtn,
  openModalAuth,
  closeLoginBtn,
  closeRegBtn,
  closeResultBtn,
  modalAuth,
  clickBox,
  inputChangeTheme,

};
