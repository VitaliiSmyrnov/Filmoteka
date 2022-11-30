const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('.form');
const containerElem = document.querySelector('.modal__wrapper');

const openModalBtn = document.querySelector('[data-modal-open]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');

const goTop = document.getElementById('go-top');
const headerContainer = document.querySelector('.header__container');

const footerModal = document.querySelector('.footer__modal');
const openTeamModal = document.querySelector('.footer-team__name');
const closeTeamModal = document.querySelector('#teammates');
const backdrop = document.querySelector('.backdrop__footer');

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
};
