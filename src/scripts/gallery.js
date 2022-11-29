// пусті імпорти не видаляти,бо тільки з ними працює
import { fetchGenre, fetchRandomFilm, fetchMovie } from './fetch';
import { renderFilmList } from './renderFilmList';
import { saveToLS, loadFromLS } from './storage.js';
import axios from 'axios';
// import {
//   BASE_URL,
//   API_KEY,
//   search_point,
//   discover_point,
//   genre_point,
// } from './api';

// import { Loading } from 'notiflix/build/notiflix-loading-aio';
// import { galleryRef, formRef } from './refs';
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
