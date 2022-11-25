import { fetchSearchFilm } from './fetch';
import { findGenres } from './gallery';
import { formRef, galleryRef } from './refs';
import { renderFilmList } from './renderFilmList';

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
