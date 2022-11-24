import { fetchGenre, fetchRandomFilm, fetchSearchFilm } from './fetch';
import { formRef, galleryRef } from './refs';
import { renderFilmList } from './renderFilmList';

function findGenres(filmId) {
  return fetchGenre().then(({ genres }) =>
    genres.filter(({ id, name }) => {
      if (id === filmId) name;
    })
  );
}

function markupRandomFilms() {
  fetchRandomFilm().then(({ results }) =>
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
}

markupRandomFilms();

function handleSearchFormSubmit(e) {
  e.preventDefault();
  const query = e.target.elements['search-input'].value.trim();
  galleryRef.innerHTML = '';

  fetchSearchFilm(query).then(({ results }) =>
    results.map(
      ({ poster_path, original_title, title, genre_ids, release_date }) => {
        return renderFilmList(
          poster_path,
          original_title,
          title,
          genre_ids,
          release_date,
          findGenres
        );
      }
    )
  );
}

formRef.addEventListener('submit', handleSearchFormSubmit);
