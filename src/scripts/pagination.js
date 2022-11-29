import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { fetchRandomFilm, fetchSearchFilm } from './fetch';
import { findGenres } from './gallery';
import { query } from './header';
import { galleryRef } from './refs';
import { renderFilmList } from './renderFilmList';

const container = document.getElementById('tui-pagination-container');
const instance = new Pagination(container, {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
  centerAlign: true,
  page: 1,
});

instance.on('afterMove', event => {
  let currentPage = event.page;
  let promise;
  if (!query.query) {
    promise = fetchRandomFilm(currentPage);
  } else {
    promise = fetchSearchFilm(query.query, currentPage);
    // instance.movePageTo(1);
  }
  promise.then(({ results }) =>
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
      }) => {
        galleryRef.innerHTML = '';
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
        );
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    )
  );
});
