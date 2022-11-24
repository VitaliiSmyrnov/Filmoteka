import { galleryRef } from './refs';

export function renderFilmList(
  poster_path,
  original_title,
  title,
  genre_ids,
  release_date,
  findGenres
) {
  return galleryRef.insertAdjacentHTML(
    'beforeend',
    `<li>
          <img class = "poster"
            src="https://image.tmdb.org/t/p/original/${poster_path}"
            alt="poster to film ${original_title}"
          />
          <div class ="film-info">
          <span>${title}</span>
           <span>${genre_ids.map(filmId => findGenres(filmId))}</span>
          <span>${release_date}</span>
          </div>
        </li>`
  );
}
