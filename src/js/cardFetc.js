import NewApiService from './apiServis';

const newApiService = new NewApiService();

const gallery = document.querySelector('.gallery');

export default function createMovieCards(movieList) {
  let other = '';

  for (const movie of movieList) {
    if (movie.genre_ids.length > 3) {
      other = movie.genre_ids.slice(0, 2);
      other[2] = 'Other';
      other = other.join(', ');

      console.log(other);
    }
  }

  const markupMovieList = movieList
    .map(movie => {
      return `
      <a href="" class="movie-link">
        <div class="gallery-card">
          <img class="movie-img" src="https://image.tmdb.org/t/p/original${
            movie.poster_path
          }" width="395" alt="${movie.title}" loading="lazy"/>
          <h2 class="movie-title">${movie.original_title}</h2>
          <p class="movie-info">${movie.genre_ids.join(', ')} <span>|</span> ${
        movie.release_date.split('-')[0]
      }</p>
        </div>
      </a>`;
    })
    .join('');

  gallery.insertAdjacentHTML('afterbegin', markupMovieList);
}

export function fetchMovieList() {
  newApiService.fetchPopularArticles().then(result => {
    newApiService.fetchGenres().then(list => {
      result.map(result => {
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

      createMovieCards(result);
    });
  });
}

export async function fetchAndCreateCardsList() {
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
