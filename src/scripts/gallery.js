import { fetchGenre, fetchRandomFilm, fetchMovie } from './fetch';
import { renderFilmList } from './renderFilmList';
import { saveToLS, loadFromLS } from './storage.js';
import axios from 'axios';
import {
  BASE_URL,
  API_KEY,
  search_point,
  discover_point,
  genre_point,
} from './api';

import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { galleryRef, formRef } from './refs';
import { handleSearchFormSubmit } from './header';

function markupRandomFilms() {
  fetchRandomFilm().then(({ results }) =>
    results.map(
      ({
        poster_path,
        backdrop_path,
        original_title,
        title,
        genre_ids,
        release_date,
        vote_average,
        id,
      }) =>
        renderFilmList(
          poster_path,
          backdrop_path,
          original_title,
          title,
          genre_ids,
          release_date,
          vote_average,
          id,
          findGenres
        )
    )
  );
}

markupRandomFilms();

export async function findGenres(genre_ids) {
  if (!localStorage.getItem('genres')) {
    await fetchGenre();
  }
  try {
    const genresObj = JSON.parse(localStorage.getItem('genres'));
    const { genres } = genresObj;
    return genres
      .filter(({ id }) => genre_ids.includes(id))
      .map(({ name }) => name || 'No genres');
  } catch (error) {
    console.log(error);
  }
}

//=========== натискання на посилання MY LIBRARY =========================
const myLibraryRef = document.querySelector('.library-item');
console.log(myLibraryRef);

function onMyLibraryLinkClick() {
  console.log('клік працює');
  formRef.removeEventListener('submit', handleSearchFormSubmit);

  // galleryRef.innerHTML = '';
  onWatchedBtnClick();
}

myLibraryRef.addEventListener('click', onMyLibraryLinkClick);

//============= Кнопка add to Watched ====================================
// const arrayFilmWatched = [];
// const addWatchedBtnRef = document.querySelector('button[data-action="addWatched"]');

// async function onAddWatchedBtnClick() {
//   const randomId = Math.round(Math.random() * (100 - 1) + 1);
//   const value = await fetchFilmById(randomId);
//   const emptyValue = !Object.keys(value).length;
//   // const myValue = {[randomId]: value};
//   if (emptyValue) return;
//   arrayFilmWatched.push(value);

//   saveToLS(LOCALSTORAGE_KEY_WATCHED, arrayFilmWatched);
// }

// addWatchedBtnRef.addEventListener('click', onAddWatchedBtnClick);

// async function fetchFilmById(movie_id) {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

//============= Кнопка Watched ====================================
// const LOCALSTORAGE_KEY_WATCHED = "watch";
// const watchedBtnRef = document.querySelector('button[data-action="watched"]');

// function onWatchedBtnClick() {

//   if (localStorage[LOCALSTORAGE_KEY_WATCHED]) {
//     const arrayFromLSWatch = loadFromLS(LOCALSTORAGE_KEY_WATCHED);
//     galleryRef.innerHTML = '';
//     const filmPromisesWatch = arrayFromLSWatch.map(id => fetchMovie(id));

//     Promise.all(filmPromisesWatch).then(results =>
//      results.map(
//      ({
//        poster_path,
//        backdrop_path,
//        original_title,
//        title,
//        genres,
//        release_date,
//        vote_average,
//        id,
//      }) =>
//        renderFilmList(
//          poster_path,
//          backdrop_path,
//          original_title,
//          title,
//          genres,
//          release_date,
//          vote_average,
//          id,
//          findGenres
//        )
//        ));
//    }
//     }

// watchedBtnRef.addEventListener('click', onWatchedBtnClick);

//============= Кнопка add to Queue ====================================

//============= Кнопка Queue ====================================
// const LOCALSTORAGE_KEY_QUEUE = "queue";
// const queueBtnRef = document.querySelector('button[data-action="queue"]');

// function onQueueBtnClick() {

//     if (localStorage[LOCALSTORAGE_KEY_QUEUE]) {
//        const arrayFromLSQueue = loadFromLS(LOCALSTORAGE_KEY_QUEUE);
//        galleryRef.innerHTML = '';
//        const filmPromisesQueue = arrayFromLSQueue.map(id => fetchMovie(id));

//        Promise.all(filmPromisesQueue).then(results =>
//         results.map(
//         ({
//           poster_path,
//           backdrop_path,
//           original_title,
//           title,
//           genres,
//           release_date,
//           vote_average,
//           id,
//         }) =>
//           renderFilmList(
//             poster_path,
//             backdrop_path,
//             original_title,
//             title,
//             genres,
//             release_date,
//             vote_average,
//             id,
//             findGenres
//           )
//           ));
//       }
//     }

// queueBtnRef.addEventListener('click', onQueueBtnClick);
