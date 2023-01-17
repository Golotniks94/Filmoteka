import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import MoviesApiService from './keyWordSearch';
import ApiData from './ApiData';//для пошуку по ID
import LibraryStorage from "./LibraryAPI";
//import { result } from 'lodash';


//const moviesApiService = new MoviesApiService();
const movie=new ApiData();// для відправки запитів про фільми
const watchedStor=new LibraryStorage("Watched");// для роботи з  local storage
const queueStor=new LibraryStorage("Queue");

const oneFilmCard = document.querySelector('.gallery');
oneFilmCard.addEventListener('click', (e)=>{openModal(e);});

let idFilm = '';
function openModal(e){
    e.preventDefault();
    idFilm=e.target.parentElement.getAttribute("href");//підіймаємось на рівень вище, щоб дістати <a>
    console.log(idFilm);

movie.getByID(idFilm)
    .then((result) => {
        //console.log(result);
        let markupOneCard = `<div class="modal-cardFilm" id='${result.id}'>
        <div class="cardFilm__image">
        <img class="image" src="https://image.tmdb.org/t/p/original${result.poster_path}" alt="${result.original_title}"/>
    </div>
    <div class="cardFilm__wrapper">
        <h1 class="cardFilm__name">${result.original_title}</h2>
        <p class="cardFilm__vote cardFilm__text">
            Vote / Votes<span class="cardFilm__vote_average">${result.vote_average}</span>/<span class="cardFilm__vote_count">${result.vote_count}</span>
        </p>
        <p class="cardFilm__popularity cardFilm_text">
            Popularity<span class="cardFilm___data">${result.popularity}</span>
        </p>
        <p class="cardFilm-title cardFilm__text">
            Original Title<span class="cardFilm__title_data">${result.original_title}</span>
            </p>
        <div class="genres">
            <p class="cardFilm__genre cardFilm__text">
                Genre 
            </p>
            <p class="cardItem__genreList">${openGenrs(result.genres)}</p>
        </div>
        <p class="cardFilm__about">About</p>
        <p class="cardFilm__description">${result.overview}
        </p>
        <div class="cardFilm__listButton">
        <button class="cardFilm__button" id="watched" name="watched" value="${result}">
                Add to watched
            </button>
            <button class="cardFilm__button" id="queue" name="queue" value="${result}">
                Add to queue
            </button>
        </div>
    </div>
    <div class="modal-close-btn">Close</div>
</div>`;
        //console.log(markupOneCard);
        const modal = basicLightbox.create(markupOneCard);
        
        modal.show();
        
        const closeModalBtn = document.querySelector('.modal-close-btn');



        const addToWatchedBtn=document.querySelector("#watched");
        const addToQueueBtn= document.querySelector("#queue");

        addToWatchedBtn.onclick=addToWatched;
        addToQueueBtn.onclick=addToQueue;

        closeModalBtn.addEventListener('click', closeModal);
        
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
//------------buttons functions--------------------------------        
        function addToQueue(){
            console.log(result);
            queueStor.saveFilmData(result)
            addToQueueBtn.setAttribute("disabled","disabled");
        }

        function addToWatched(){
            console.log(result);
            watchedStor.saveFilmData(result)
            addToWatchedBtn.setAttribute("disabled","disabled");
        }
//---------END---buttons functions--------------------------------  
    })
    .catch(error => {
    console.error()})
}
//-----------------------функція для виводу масиву жанрів в строчку--------------------
function openGenrs(mass){
    return mass.map(gener=>gener.name).join(", ");
}

//----------------------------------------------------------------------------------
//-------------лишнє----------------------
/*function fetchById() {
    moviesApiService
    .getMovieDetails(idFilm)
    .then(data => {
        return data})
}*/