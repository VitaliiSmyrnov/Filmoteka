import {
  galleryRef,
  containerElem,
  closeModalBtn,
  modal,
  // addWatchBtn,
} from './refs';
import { fetchMovie } from './fetch';
import renderModal from './renderModal';

let searchId;

closeModalBtn.addEventListener('click', closeModal);

function openModal() {
  modal.classList.remove('is-hidden');
  document.body.classList.add('stop-scroll');
  window.addEventListener('click', handleClickOnBackdrop);
  window.addEventListener('keydown', handleKeyPress);

  const addWatchBtn = document.querySelector('.film__button-add-to-watch');
  const addQueueBtn = document.querySelector('.film__button-add-to-queue');

  // console.log(addWatchBtn);
  // setTimeout(() => console.log(addWatchBtn), 3000);

  addWatchBtn.addEventListener('click', handleWatchClick);
  addQueueBtn.addEventListener('click', handleQueueClick);

  const idArrayWatch = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_WATCH_KEY)
  );
  const isAddToWatch = idArrayWatch
    ? idArrayWatch.find(value => value === searchId)
    : false;

  if (isAddToWatch) {
    addWatchBtn.setAttribute('disabled', true);
    addWatchBtn.classList.add('film__button--already-in-list');
    addWatchBtn.textContent = 'ALREADY IN WATCH LIST';
  }
  const idArrayQueue = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_QUEUE_KEY)
  );
  const isAddToQueue = idArrayQueue
    ? idArrayQueue.find(value => value === searchId)
    : false;

  if (isAddToQueue) {
    addQueueBtn.setAttribute('disabled', true);
    addQueueBtn.classList.add('film__button--already-in-list');
    addQueueBtn.textContent = 'ALREADY IN QUEUE LIST';
  }
}

function closeModal() {
  modal.classList.add('is-hidden');
  document.body.classList.remove('stop-scroll');

  window.removeEventListener('click', handleClickOnBackdrop);
  window.removeEventListener('keydown', handleKeyPress);

  const addWatchBtn = document.querySelector('.film__button-add-to-watch');
  const addQueueBtn = document.querySelector('.film__button-add-to-queue');
  // console.log(addWatchBtn);
  addWatchBtn.removeEventListener('click', handleWatchClick);
  addQueueBtn.removeEventListener('click', handleQueueClick);

  containerElem.innerHTML = '';
}

function handleKeyPress(e) {
  console.log(e.key);
  if (e.key === 'Escape') {
    closeModal();
  }
}

function handleClickOnBackdrop(e) {
  if (e.target === modal) {
    closeModal();
  }
}

galleryRef.addEventListener('click', handleFilmClick);

async function handleFilmClick(e) {
  // console.log(e);
  // console.log(e.target.nodeName);
  // console.log(e.target.closest('li').dataset.id);

  if (!e.target.closest('li')) {
    return;
  }
  if (e.target.closest('li')) {
    const id = e.target.closest('li').dataset.id;
    searchId = id;
    await fetchMovie(id).then(data => renderModal(data));
    openModal();
  }
}

//  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'SPAN') {
//    console.log('не равно');
//    return;
//  }
const LOCAL_STORAGE_WATCH_KEY = 'watch';
const LOCAL_STORAGE_QUEUE_KEY = 'queue';

function handleWatchClick(e) {
  updateLocalStorageList(e, LOCAL_STORAGE_WATCH_KEY, 'WATCH');
}

function handleQueueClick(e) {
  updateLocalStorageList(e, LOCAL_STORAGE_QUEUE_KEY, 'QUEUE');
}

function updateLocalStorageList(event, key, listType) {
  const id = searchId;
  const loadAddedList = localStorage.getItem(key);
  const parsedIdList = JSON.parse(loadAddedList);
  // const findeFilmId = responseParsed
  //   ? responseParsed.find(value => value === id)
  //   : false;

  if (!loadAddedList) {
    const watchSetting = [id];
    localStorage.setItem(key, JSON.stringify(watchSetting));
    event.target.setAttribute('disabled', true);
    event.target.classList.add('film__button--already-in-list');
    event.target.textContent = `ALREADY IN ${listType} LIST`;
  }
  if (loadAddedList) {
    parsedIdList.push(searchId);
    localStorage.setItem(key, JSON.stringify(parsedIdList));
    event.target.setAttribute('disabled', true);
    event.target.classList.add('film__button--already-in-list');
    event.target.textContent = `ALREADY IN ${listType} LIST`;
  }
}
