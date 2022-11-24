import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY = '14f89e95e2687deafc45dced0859c8d0';

const galleryRef = document.querySelector('.gallery');

async function fetchInfo() {
  try {
    const response = await axios.get(
      `${BASE_URL}?api_key=${API_KEY}&sort_by=popularity.desc`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

function murkup() {
  fetchInfo().then(({ results }) =>
    results.map(
      ({ poster_path, original_title, title, genre_ids, release_date }) =>
        galleryRef.insertAdjacentHTML(
          'beforeend',
          `<li>
          <img class = "poster"
            src="https://image.tmdb.org/t/p/original/${poster_path}"
            alt="poster to film ${original_title}"
          />
          <div class ="film-info">
          <span>${title}</span>
           <span>${genre_ids.map(id => id)}</span>
          <span>${release_date}</span>
          </div>
        </li>`
        )
    )
  );
}

murkup();
