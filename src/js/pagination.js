import Pagination from 'tui-pagination';

const container = document.querySelector('#pagination');
const gallery = document.querySelector('.gallery');

export function createPagination(
  onPageChange,
  apiServiceInstance,
  totalItems = 0
) {
  const options = {
    totalItems,
    itemsPerPage: 20,
    visiblePages: 5,
    page: apiServiceInstance.page,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
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
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination(container, options);

  pagination.on('afterMove', event => {
    gallery.innerHTML = '';
    apiServiceInstance.page = event.page;
    onPageChange();
  });
}

// pagination.on('beforeMove', async event => {
//   currentPage = event.page;
//   gallery.innerHTML = '';
//   const newData = await createMovieCards(currentPage, query);
//   const newList = await createCards(newData.results);
//   gallery.insertAdjacentHTML('beforeend', newList);
// });
