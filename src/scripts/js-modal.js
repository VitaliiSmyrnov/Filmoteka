import { galleryRef } from './refs';

const refs = {
  // openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};

// refs.openModalBtn.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', closeModal);

function openModal() {
  refs.modal.classList.remove('is-hidden');
  document.body.classList.add('stop-scroll');
  window.addEventListener('click', handleClickOnBackdrop);
  window.addEventListener('keydown', handleKeyPress);
}

function closeModal() {
  refs.modal.classList.add('is-hidden');
  document.body.classList.remove('stop-scroll');

  window.removeEventListener('click', handleClickOnBackdrop);
  window.removeEventListener('keydown', handleKeyPress);
}

function handleKeyPress(e) {
  console.log(e.key);
  if (e.key === 'Escape') {
    closeModal();
  }
}

function handleClickOnBackdrop(e) {
  if (e.target === refs.modal) {
    closeModal();
  }
}

galleryRef.addEventListener('click', handleFilmClick);

function handleFilmClick(e) {
  // console.log(e.target);
  // console.log(e);
  console.log(e.target.closest('li').dataset.id);

  if (!e.target.closest('li')) {
    return;
  }
  if (e.target.closest('li')) {
    openModal();
  }
}

//  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'SPAN') {
//    console.log('не равно');
//    return;
//  }
