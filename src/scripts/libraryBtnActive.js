import { fetchMovie } from './fetch';
import { findGenres } from './gallery';
import { renderFilmList } from './renderFilmList';
import { loadFromLS } from './storage.js';
import { galleryRef } from './refs';

const watchedBtn = document.querySelector('[data-id="watched-btn"]');
const queueBtn = document.querySelector('[data-id="queue-btn"]');
const watchedSet = document.querySelector('.library-buttons__wrapper');

// watchedSet.addEventListener('click', makeActiveBtn);

function makeActiveBtn(e) {
  if (e.target.classList.contains('is-active')) {
    return;
  }
  watchedBtn.classList.toggle('is-active');
  queueBtn.classList.toggle('is-active');
  return;
}


//============= Кнопка Watched ====================================
const LOCALSTORAGE_KEY_WATCHED = 'watch';

onWatchedBtnClick();

function onWatchedBtnClick() {
  if (localStorage[LOCALSTORAGE_KEY_WATCHED]) {
    const arrayFromLSWatch = loadFromLS(LOCALSTORAGE_KEY_WATCHED);
    galleryRef.innerHTML = '';
    const filmPromisesWatch = arrayFromLSWatch.map(id => fetchMovie(id));

    Promise.all(filmPromisesWatch).then(results => 
      results.map(
        ({
          poster_path,
          backdrop_path,
          original_title,
          title,
          genres,
          release_date,
          vote_average,
          id,
        }) => {
          const genres_ids = genres.map((genre) => genre.id);
          renderFilmList(
            poster_path,
            backdrop_path,
            original_title,
            title,
            genres_ids,
            release_date,
            vote_average,
            id,
            findGenres
          );
        }
      )
    );
  }
}

watchedBtn.addEventListener('click', onWatchedBtnClick);

//============= Кнопка Queue ====================================
const LOCALSTORAGE_KEY_QUEUE = 'queue';

function onQueueBtnClick() {
  if (localStorage[LOCALSTORAGE_KEY_QUEUE]) {
    const arrayFromLSQueue = loadFromLS(LOCALSTORAGE_KEY_QUEUE);
    galleryRef.innerHTML = '';
    const filmPromisesQueue = arrayFromLSQueue.map(id => fetchMovie(id));

    Promise.all(filmPromisesQueue).then(results =>
      results.map(
        ({
          poster_path,
          backdrop_path,
          original_title,
          title,
          genres,
          release_date,
          vote_average,
          id,
        }) => {
          const genres_ids = genres.map((genre) => genre.id);
          renderFilmList(
            poster_path,
            backdrop_path,
            original_title,
            title,
            genres_ids,
            release_date,
            vote_average,
            id,
            findGenres
          );
        }
      )
    );
  }
}

queueBtn.addEventListener('click', onQueueBtnClick);
