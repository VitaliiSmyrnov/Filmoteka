import { fetchSearchFilm } from './fetch';
import { render } from './gallery';
import { container, formRef, galleryRef, notifyRef } from './refs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

export async function handleSearchFormSubmit(e) {
  e.preventDefault();
  let query = e.target.elements['search-input'].value.trim();
  galleryRef.innerHTML = '';
  if (!query.length) {
    notifyRef.textContent =
      'Search result not successful. Enter the correct movie name and try again';
    return;
  }

  // notifyRef.textContent = '';
  const response = await fetchSearchFilm(query);
  const { results, total_pages } = response;
  if (!results.length) {
    notifyRef.textContent =
      ' Search result not successful. Enter the correct movie name and try again';
  }
  render(results);

  const instance_2 = new Pagination(container, {
    totalItems: total_pages > 500 ? 500 : total_pages,
    itemsPerPage: 1,
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

formRef.addEventListener('submit', handleSearchFormSubmit);