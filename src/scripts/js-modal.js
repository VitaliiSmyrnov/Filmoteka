import { galleryRef } from './refs';

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

async function toggleModal() {
  await refs.modal.classList.toggle('is-hidden');
  document.body.classList.toggle('stop-scroll');
}

// console.log(refs.openModalBtn);

function handleFilmClick(e) {
  // console.log(e.target);
  console.log(e.currentTarget);
}
galleryRef.addEventListener('click', handleFilmClick);

// if (galleryRef.children.length !== 0) {
// } else {
//   console.log('dsfghj');
// }
// console.log(galleryRef.children.length);
