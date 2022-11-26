import { galleryRef } from './refs';

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
  document.body.classList.toggle('stop-scroll');
}

// function handleGalleryClick(e) {
//   console.log(e.target.nodeName);
//   if (e.target.nodeName !== 'IMG' || e.target.nodeName !== 'SPAN') {
//     return;
//   }
//   refs.modal.classList.toggle('is-hidden');
// }

// galleryRef.addEventListener('click', handleGalleryClick);
