import { galleryRef, containerElem, addWatchBtn, addQueueBtn } from './refs';
import { fetchMovie } from './fetch';
import renderModal from './renderModal';
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

  console.log(addWatchBtn);
  addWatchBtn.addEventListener('click', handleWatchClick);
  addQueueBtn.addEventListener('click', handleQueueClick);
}

function closeModal() {
  refs.modal.classList.add('is-hidden');
  document.body.classList.remove('stop-scroll');
  containerElem.innerHTML = '';

  window.removeEventListener('click', handleClickOnBackdrop);
  window.removeEventListener('keydown', handleKeyPress);
  addWatchBtn.removeEventListener('click', handleWatchClick);
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
  // console.log(e);
  // console.log(e.target.nodeName);
  // console.log(e.target.closest('li').dataset.id);

  if (!e.target.closest('li')) {
    return;
  }
  if (e.target.closest('li')) {
    const id = e.target.closest('li').dataset.id;
    openModal();
    fetchMovie(id).then(data => renderModal(data));
  }
}

//  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'SPAN') {
//    console.log('не равно');
//    return;
//  }

function handleWatchClick(e) {
  console.log(e);
  // const id = e.target.closest('li').dataset.id;
  // console.log(id);
}

function handleQueueClick(e) {
  console.log(e);
}
