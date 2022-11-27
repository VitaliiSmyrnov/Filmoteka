const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('.form');
const containerElem = document.querySelector('.modal__wrapper');
const addWatchBtn = document.querySelector('.film__button-add-to-watch');
const addQueueBtn = document.querySelector('.film__button-add-to-queue');

const openModalBtn = document.querySelector('[data-modal-open]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');

export {
  galleryRef,
  formRef,
  openModalBtn,
  closeModalBtn,
  modal,
  containerElem,
  addWatchBtn,
  addQueueBtn,
};
