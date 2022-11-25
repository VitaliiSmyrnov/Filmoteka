import { galleryRef } from './refs';

export async function renderFilmList(
  poster_path,
  original_title,
  title,
  genre_ids,
  release_date,
  vote_average,
  findGenres
) {
  const genreaMarkup = await findGenres(genre_ids).then(data => data.join(", "));
  return galleryRef.insertAdjacentHTML(
    'beforeend',
    `<li class="gallery-card">
      <img class = "poster"
        src="https://image.tmdb.org/t/p/original/${poster_path}"
        alt="poster to film ${original_title}"
      />
      <div class ="gallery_info">
        <span  class ="gallery_info-title">${title.toUpperCase()}</span>
        <span class ="gallery_info-genres">${genreaMarkup}
        </span>
        <span class ="gallery_info-year">${new Date(
          release_date
        ).getFullYear()}</span>
        <span class="gallery_info-rating">${vote_average}</span>
      </div>
     </li>`
  );
}
