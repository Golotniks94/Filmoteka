import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import MoviesApiService from './keyWordSearch';



const moviesApiService = new MoviesApiService()

const oneFilmCard = document.querySelector('.gallery')
console.log(oneFilmCard)
oneFilmCard.addEventListener('click', openModal)

let idFilm = ''
function openModal(e){
    e.preventDefault()
    idFilm = e.target
console.log(idFilm)

    fetchById(idFilm)
    .then(({id, original_title, poster_path,overview, genre_ids, vote_average, vote_cont, popularity}) => {
        if(e.target.nodeName !== 'IMG') return

        const markupOneCard = `<div class="modal-cardFilm" id=${id}>
        <div class="cardFilm__image">
        <img class="image" src="https://image.tmdb.org/t/p/original${poster_path}" alt="${title}"/>
    </div>

    <div class="cardFilm__wrapper">
        <h1 class="cardFilm__name">${original_title}</h2>
        <p class="cardFilm__vote cardFilm__text">
            Vote / Votes<span class="cardFilm__vote_average">${vote_average}</span>/<span
                class="cardFilm__vote_count">${vote_cont}</span>
        </p>
        <p class="cardFilm__popularity cardFilm_text">
            Popularity<span class="cardFilm___data">${popularity}</span>
        </p>
        <p class="cardFilm-title cardFilm__text">
            Original Title<span class="cardFilm__title_data">${original_title}</span>
            </p>
        <div class="genres">
            <p class="cardFilm__genre cardFilm__text">
                Genre 
            </p>
            <p class="cardItem__genreList">${genre_ids}</p>

        </div>

        <p class="cardFilm__about">About</p>
        <p class="cardFilm__description">${overview}
        </p>
        <div class="cardFilm__listButton">
        <button class="cardFilm__button">
                Add to watched
            </button>
            <button class="cardFilm__button">
                Add to queue
            </button>
        </div>
    </div>
    <div class="modal-close-btn">Close</div>
</div>`;
        const modal = basicLightbox.create(markupOneCard);
        
        modal.show();
        
        const closeModalBtn = document.querySelector('.modal-close-btn')
        
        closeModalBtn.addEventListener('click', closeModal)
        
        window.addEventListener('keydown', closeHandlerModal)
        
        function closeHandlerModal(e){
            if(e.code === 'Escape'){
                modal.close();
                window.removeEventListener('keydown', closeHandlerModal)
            }
        }
        
        function closeModal(){
        modal.close()
        
        window.removeEventListener('keydown', closeHandlerModal)
        }  
        

        const addToWatchBtn = document.querySelector('click', onAddToWatchBtn)
        const addToQueueBtn = document.querySelector('click', onAddToQueueBtn)
    })
    .catch(error => {
    console.error()})    
}


function fetchById() {
    moviesApiService
    .getMovieDetails(idFilm)
    .then(data => {
        return data})
}