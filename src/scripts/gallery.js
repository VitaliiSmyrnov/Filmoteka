import { fetchGenre, fetchRandomFilm } from './fetch';
import { renderFilmList } from './renderFilmList';

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

export function findGenres(filmId) {
  return fetchGenre().then(({ genres }) =>
    genres.filter(({ id, name }) => {
      if (id === filmId) name;
    })
  );
}
