import {
  fetchGenre,
  fetchRandomFilm,
  fetchMovie,
  fetchPopularFilm,
} from './fetch';
import { prepareGalleryInfo } from './renderFilmList';
import { saveToLS, loadFromLS } from './storage.js';
import axios from 'axios';
import {
  BASE_URL,
  API_KEY,
  search_point,
  discover_point,
  genre_point,
} from './api';
import Pagination from 'tui-pagination';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { galleryRef, formRef } from './refs';
// import { handleSearchFormSubmit } from './header';
import 'tui-pagination/dist/tui-pagination.css';
const container = document.getElementById('tui-pagination-container');

async function markupPopularFilms() {
  const { results } = await fetchPopularFilm(1);

  render(results);
  const instance_1 = new Pagination(container, {
    totalItems: 500,
    itemsPerPage: 10,
    visiblePages: 5,
    centerAlign: true,
    page: 1,
  });

  instance_1.on('afterMove', async event => {
    let currentPage = event.page;
    const { results } = await fetchPopularFilm(currentPage);
    render(results);
  });
}

markupPopularFilms();

export function render(results) {
  const markup = results
    .map(
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
        prepareGalleryInfo(
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
    .join('');
  galleryRef.innerHTML = markup;
}
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
