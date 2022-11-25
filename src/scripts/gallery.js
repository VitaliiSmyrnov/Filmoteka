import { fetchGenre, fetchRandomFilm } from './fetch';
import { renderFilmList } from './renderFilmList';

import filmGenres from '../data/genres.json';
const { genres } = filmGenres;

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

export function findGenres(genre_ids) {
  return genres
    .filter(({ id }) => genre_ids.includes(id))
    .map(({ name }) => name || 'No genres');
}

// return fetchGenre().then(({ genres }) => {
//   return genres
//     .filter(({ id }) => genre_ids.includes(id))
//     .map(({ name }) => name || 'No genres');
// });
// }
