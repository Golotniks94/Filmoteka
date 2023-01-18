import NewApiService from './apiServis';
import createMovieCards  from './cardFetc';
import Notiflix from 'notiflix';
import { spinnerOn, spinnerOff } from './spinner';
import { createPagination } from './pagination';

const refs = {
  myForm: document.querySelector("#myForm"),
  moviesOnInputList: document.querySelector('.gallery'),
  inputEl: document.querySelector('#name-input'),
};

refs.myForm.addEventListener('submit', searchHandler);
const a=new NewApiService();

async function searchHandler(e) {
  spinnerOn();
  e.preventDefault();
  const query = refs.inputEl.value;
  console.log(query);
  if (query === ' ' || query === '') {
    Notiflix.Notify.failure('Please type search and try again.');
    return;
  }
  a.searchQuery=query;
  const data = await a.fetchSearchArticlesPages();
  refs.moviesOnInputList.innerHTML = '';
  if (data.total_results === 0) {
    Notiflix.Notify.failure('There is no such film');
    return;
  } else {
    //console.log(data.results);
    /*const genre = await a.fetchGenres().then(({ genres }) => {
      
      console.log(genres);
      if (data.results) {
        data.results.forEach(movie => {
          const { genre_ids, release_date } = movie;
          genres.forEach(({ name, id }) => {
            if (genre_ids.includes(id)) {
              if (genre_ids.length > 2) {
                genre_ids.splice(2, genre_ids.length - 1, 'Other');
              }
              genre_ids.splice(genre_ids.indexOf(id), 1, name);
            }
            movie.genre_names = genre_ids.join(', ');
            if (movie.release_date) {
              movie.release_date = release_date.slice(0, 4);
            }
          });
        });
      }
    });*/
    //console.log(data.results);
    await createMovieCards(data.results);
    spinnerOff();
    createPagination(a.fetchSearchArticlesPages, a, a.total_results);
  }
}


// import { fetchSearchArticlesPages, fetchGenres } from './apiServis';
// import { createMovieCards } from './cardFetc';
// import Notiflix from 'notiflix';
// import { spinnerOn, spinnerOff } from './spinner';
// const refs = {
//   moviesOnInputList: document.querySelector('.gallery'),
//   inputEl: document.querySelector('.form-search__input'),
// };

// refs.inputEl.addEventListener('submit', searchHandler);

// async function searchHandler(e) {
//   spinnerOn();
//   e.preventDefault();
//   const query = e.currentTarget.elements.searchQuery.value;
//   if (query === ' ' || query === '') {
//     Notiflix.Notify.failure('Please type search and try again.');
//     return;
//   }
//   const data = await fetchSearchArticlesPages(query);
//   refs.moviesOnInputList.innerHTML = '';
//   if (data.total_results === 0) {
//     Notiflix.Notify.failure('There is no such film');
//     return;
//   } else {
//     const genre = await fetchGenres().then(({ genres }) => {
//       if (data.results) {
//         data.results.forEach(movie => {
//           const { genre_ids, release_date } = movie;
//           genres.forEach(({ name, id }) => {
//             if (genre_ids.includes(id)) {
//               if (genre_ids.length > 2) {
//                 genre_ids.splice(2, genre_ids.length - 1, 'Other');
//               }
//               genre_ids.splice(genre_ids.indexOf(id), 1, name);
//             }
//             movie.genre_names = genre_ids.join(', ');
//             if (movie.release_date) {
//               movie.release_date = release_date.slice(0, 4);
//             }
//           });
//         });
//       }
//     });

//     createMovieCards(data.results);
//     spinnerOff();
//   }
// }

// import { Notify } from "notiflix/build/notiflix-notify-aio";
// import NewApiService from "./apiServis";
// import { createMovieCards } from './cardFetc';
// import { pagination } from './pagination';

// const newApiService = new NewApiService();

// const searchForm = document.querySelector('.form-search__icon');
// const inputEl = document.querySelector('.form-search__input');

// inputEl.addEventListener('click', onSearchFormReset);
// searchForm.addEventListener('submit', onSearchFormSubmit);

// function onSearchFormReset() {
//   if (newApiService.query !== '') {
//     refs.searchForm.reset();
//     return;
//   }
// }
// export async function onSearchFormSubmit(e) {
//   e.preventDefault();

//   newApiService.page = 1;
//   newApiService.query = inputEl ? inputEl.value.trim() : '';
//   localStorage.setItem('input-value', newApiService.query);

//   if (newApiService.query === '') {
//     return;
//   }

//   const results = await newApiService.getSearchFilms();
//   newApiService.totalResults = results.total_results;
//   try {
//     createMovieCards(results);

//    pagination.reset(results.total_results);

//     if (newApiService.totalResults === 0) {
//       Notify.failure(
//         'Sorry, there are no films matching your search query. Please try again.'
//       );
//       return;
//     }
//     if (newApiService.totalResults >= 1) {
//       Notify.success(`Hooray! We found ${newApiService.totalResults} films.`);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
