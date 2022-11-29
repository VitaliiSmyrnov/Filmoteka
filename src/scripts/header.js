import { fetchRandomFilm, fetchSearchFilm } from './fetch';
import { findGenres, render } from './gallery';
import { formRef, galleryRef } from './refs';
import { renderFilmList } from './renderFilmList';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const notifyRef = document.querySelector('.form__search-fail');
const container = document.getElementById('tui-pagination-container');

export let query;

export function handleSearchFormSubmit(e) {
  e.preventDefault();
  query = e.target.elements['search-input'].value.trim();
  galleryRef.innerHTML = '';
  if (!query.length) {
    notFound();
    return;
  }

  const instance_2 = new Pagination(container, {
    totalItems: 500,
    itemsPerPage: 10,
    visiblePages: 5,
    centerAlign: true,
    page: 1,
  });

  instance_2.on('afterMove', async event => {
    let currentPage = event.page;
    const { results } = await fetchSearchFilm(query, currentPage);
    render(results);
  });

  notifyRef.textContent = '';
  fetchSearchFilm(query).then(({ results }) => {
    if (!results.length) {
      notFound();
    }
    render(results);
  });
}

function notFound() {
  notifyRef.textContent =
    'Search result not successful. Enter the correct movie name';
}

formRef.addEventListener('submit', handleSearchFormSubmit);
