import { Loading } from 'notiflix';
import { galleryRef } from './refs';

export async function renderFilmList(
  poster_path,
  backdrop_path,
  original_title,
  title,
  genre_ids,
  release_date,
  vote_average,
  id,
  findGenres
) {
  // Loading.arrows();
  const genreaMarkup = await findGenres(genre_ids).then(data =>
    data.join(', ')
  );
  const poster = `https://image.tmdb.org/t/p/original${
    poster_path || backdrop_path
  }`;
  const defaultImg = './images/gallery/default_img.jpg';
  galleryRef.insertAdjacentHTML(
    'beforeend',
    `<li class="gallery-card" data-modal-open data-id="${id}">
      <img class = "poster"
        src= ${
          poster_path ||
          (backdrop_path !== undefined && poster_path) ||
          backdrop_path !== null
            ? poster
            : defaultImg
        }
        alt="poster to film ${original_title}"
      />
      <div class ="gallery_info">
        <span  class ="gallery_info-title">${title.toUpperCase()}</span>
        <span class ="gallery_info-genres">${
          genreaMarkup.length === 0 ? 'Genre not specified' : genreaMarkup
        }
        </span>
        <span class ="gallery_info-year">${
          release_date !== ''
            ? new Date(release_date).getFullYear()
            : 'Year not specified'
        }</span>
        <span class="gallery_info-rating">${vote_average.toFixed(1)}</span>
      </div>
     </li>`
  );
}
