import { fetchSearchFilm } from './fetch';
import { render } from './gallery';
import { container, formRef, galleryRef, notifyRef } from './refs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

export function handleSearchFormSubmit(e) {
  e.preventDefault();
  let query = e.target.elements['search-input'].value.trim();
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
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip dots">...</span>' +
        '</a>',
    },
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
