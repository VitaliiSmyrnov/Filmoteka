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
    notifyRef.textContent =
      'Search result not successful. Enter the correct movie name';
    fetchRandomFilm().then(({ results }) => {
      results.map(
        ({ poster_path, original_title, title, genre_ids, release_date }) => {
          renderFilmList(
            poster_path,
            original_title,
            title,
            genre_ids,
            release_date,
            findGenres
          );
        }
      );
    });
    return;
  }
  notifyRef.textContent = '';
  fetchSearchFilm(query).then(({ results }) => {
    if (!results.length) {
      notifyRef.textContent =
        'Search result not successful. Enter the correct movie name';
      fetchRandomFilm().then(({ results }) => {
        results.map(
          ({ poster_path, original_title, title, genre_ids, release_date }) => {
            renderFilmList(
              poster_path,
              original_title,
              title,
              genre_ids,
              release_date,
              findGenres
            );
          }
        );
      });
      return;
    }
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
    );
  });
}

// function notFound() {
//   notifyRef.textContent =
//     'Search result not successful. Enter the correct movie name';
//   fetchRandomFilm().then(({ results }) => {
//     results.map(
//       ({ poster_path, original_title, title, genre_ids, release_date }) => {
//         renderFilmList(
//           poster_path,
//           original_title,
//           title,
//           genre_ids,
//           release_date,
//           findGenres
//         );
//       }
//     );
//   });
//   return;
// }

formRef.addEventListener('submit', handleSearchFormSubmit);
