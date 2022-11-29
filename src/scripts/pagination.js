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
   template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  }
});

const instance_2 = new Pagination(container, {
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

instance_1.on('afterMove', event => {
  let currentPage = event.page;
  fetchRandomFilm(currentPage).then(({ results }) =>
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

if (query) {
  // instance_2.movePageTo(1);
  instance_2.on('afterMove', event => {
    let currentPage = event.page;
    fetchSearchFilm(query, currentPage).then(({ results }) =>
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
}
