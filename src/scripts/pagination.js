import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { fetchRandomFilm } from './fetch';
import { findGenres } from './gallery';
import { renderFilmList } from './renderFilmList';

const container = document.getElementById('tui-pagination-container');
export const instance = new Pagination(container, {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
  centerAlign: true,
  currentPage: 1,
});

instance.on('afterMove', event => {
  currentPage = event.page;
  fetchRandomFilm(currentPage).then(({ results }) =>
    results.map(
      ({ poster_path, original_title, title, genre_ids, release_date }) =>
        renderFilmList(
          poster_path,
          original_title,
          title,
          genre_ids,
          release_date,
          findGenres
        )
    )
  );
});
