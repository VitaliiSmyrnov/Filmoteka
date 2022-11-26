import { Loading } from 'notiflix';
import { galleryRef, modal, openModalBtn } from './refs';

export async function renderFilmList(
  poster_path,
  backdrop_path,
  original_title,
  title,
  genre_ids,
  release_date,
  vote_average,
  findGenres,
  id
) {
  // Loading.arrows();
  const genreaMarkup = await findGenres(genre_ids).then(data =>
    data.join(', ')
  );
  const poster = `https://image.tmdb.org/t/p/original/${
    poster_path || backdrop_path
  }`;
  galleryRef.insertAdjacentHTML(
    'beforeend',
    `<li class="gallery-card" data-modal-open data-id="${id}">
      <img class = "poster"
        src= ${
          poster_path || backdrop_path !== undefined
            ? poster
            : './images/gallery/default_img.jpg'
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
        <span class="gallery_info-rating">${vote_average}</span>
      </div>
     </li>`
  );
  async function handleFilmClick(e) {
    const target = await e.target;
    console.log(target);
    if (target.nodeName !== 'IMG' || target.nodeName !== 'SPAN') {
      return;
    }
    const toggleModal = await modal.classList.toggle('is-hidden');
    console.log(toggleModal);
  }
  galleryRef.addEventListener('click', handleFilmClick);
  // Loading.remove();
}
