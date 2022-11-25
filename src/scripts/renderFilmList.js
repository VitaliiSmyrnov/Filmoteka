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
    `<li class="gallery-card">
      <img class = "poster"
        src="https://image.tmdb.org/t/p/original/${poster_path}"
        alt="poster to film ${original_title}"
      />
      <div class ="gallery_info">
        <span  class ="gallery_info-title">${title}</span>
        <span class ="gallery_info-genres">${findGenres(genre_ids).map(
          name => name
        )}
        </span>
        <span class ="gallery_info-year">${new Date(
          release_date
        ).getFullYear()}</span>
      </div>
     </li>`
  );
}
