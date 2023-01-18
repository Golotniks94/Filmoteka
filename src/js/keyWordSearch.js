import { Notify } from "notiflix/build/notiflix-notify-aio";
import NewApiService from "./apiServis";
import { createMovieCards } from './cardFetc';
import * as pagination from './pagination';

const newApiService = new NewApiService();

const searchForm = document.querySelector('.form-search__icon');
const inputEl = document.querySelector('.form-search__input');

inputEl.addEventListener('click', onSearchFormReset);
searchForm.addEventListener('submit', onSearchFormSubmit);

function onSearchFormReset() {
  if (newApiService.query !== '') {
searchForm.reset();
    return;
  }
}
async function onSearchFormSubmit(e) {
  e.preventDefault();

  newApiService.page = 1;
  newApiService.query = inputEl ? inputEl.value.trim() : '';
  localStorage.setItem('input-value', newApiService.query);

  if (newApiService.query === '') {
    return;
  }

  const results = await newApiService.fetchSearchArticles();
  newApiService.totalResults = results.total_results;
  try {
    createMovieCards(results);

   pagination.reset(results.total_results);

    if (newApiService.totalResults === 0) {
      Notify.failure(
        'Sorry, there are no films matching your search query. Please try again.'
      );
      return;
    }
    if (newApiService.totalResults >= 1) {
      Notify.success(`Hooray! We found ${newApiService.totalResults} films.`);
    }
  } catch (error) {
    console.log(error);
  }
}
