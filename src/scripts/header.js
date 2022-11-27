import { fetchRandomFilm, fetchSearchFilm } from './fetch';
import { findGenres } from './gallery';
import { formRef, galleryRef } from './refs';
import { renderFilmList } from './renderFilmList';

const notifyRef = document.querySelector('.notify');

function handleSearchFormSubmit(e) {
  e.preventDefault();
  const query = e.target.elements['search-input'].value.trim();
  galleryRef.innerHTML = '';
  if (!query.length) {
    notFound();
    return;
  }
  notifyRef.textContent = '';
  fetchSearchFilm(query).then(({ results }) => {
    if (!results.length) {
      notFound();
    }
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
        return renderFilmList(
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
      }
    );
  });
}

function notFound() {
  notifyRef.textContent =
    'Search result not successful. Enter the correct movie name';
  fetchRandomFilm().then(({ results }) => {
    results.map(
      ({
        poster_path,
        backdrop_path,
        original_title,
        title,
        genre_ids,
        release_date,
        vote_average,
      }) => {
        renderFilmList(
          poster_path,
          backdrop_path,
          original_title,
          title,
          genre_ids,
          release_date,
          vote_average,
          findGenres
        );
      }
    );
  });
  return;
}

formRef.addEventListener('submit', handleSearchFormSubmit);
