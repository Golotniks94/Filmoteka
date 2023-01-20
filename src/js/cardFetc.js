import NewApiService from './apiServis';
import { createPagination } from './pagination';
import { spinnerOff, spinnerOn } from './spinner';

const newApiService = new NewApiService();

const gallery = document.querySelector('#gallery');

export default function createMovieCards(movieList) {
  const markupMovieList = movieList
    .map(movie => {
      let other = '';

      if (movie.genre_ids.length <= 3) {
        other = movie.genre_ids.slice(0, 3).join(', ');
      }
      if (movie.genre_ids.length > 3) {
        other = movie.genre_ids.slice(0, 2);
        other[2] = 'Other';
        other = other.join(', ');
      }

      return `
     <li class="gallery-item">
      <a href="${movie.id}" class="movie-link">
          <img class="movie-img" src="https://image.tmdb.org/t/p/original${
            movie.poster_path
          }"  alt="${movie.title}" loading="lazy"/>
          <h2 class="movie-title">${movie.original_title}</h2>
          <p class="movie-info">${other} <span>|</span> ${
        movie.release_date.split('-')[0]
      }   </p>
      </a>
     </li>`;
    })
    .join('');

  gallery.insertAdjacentHTML('afterbegin', markupMovieList);
}

export function fetchMovieList() {
  newApiService.fetchPopularArticles().then(({ results, total_results }) => {
    newApiService.fetchGenres().then(list => { if(gallery!==null){
      results.map(result => {
        let x = result.genre_ids.map(id => {
          for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
              id = list[i].name;
              return id;
            }
          }
        
        });
        result.genre_ids = x;
      });
      spinnerOff();
      createMovieCards(results);
      createPagination(fetchMovieList, newApiService, total_results);
    }
    spinnerOff();
    });
  });
}


export async function fetchAndCreateCardsList() {
  spinnerOn();
  try {
    const cardList = await fetchMovieList(createMovieCards);
  } catch (error) {
    console.log(error);
  }
}

fetchAndCreateCardsList();

// function fetchMovieList() {
//   newApiService
//     .insertGenresToMovieObj()
//     .then(createMovieCards)
//     .catch(err => console.log(err));
// }
