import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import ApiData from './ApiData';//для пошуку по ID
import LibraryStorage from "./LibraryAPI";
import { roundToTenth } from './roundingNumFunction';
import { spinnerOff } from './spinner';
import renderCardV2 from './renderCardsLibrary';

const refs={
    gallery:            document.querySelector('.gallery'),
    galleryPageID:      "gallery",
    libraryPageID:      "libGallery",
    flag:               false,
    tabsID:             {queue: "queButton", watched: "watchedButton",current: ""},
};

const movie=new ApiData();// для відправки запитів про фільми
const watchedStor=new LibraryStorage("Watched");// для роботи з  local storage
const queueStor=new LibraryStorage("Queue");

refs.gallery = document.querySelector('.gallery');
if(refs.gallery!==null){

    if(refs.gallery.getAttribute("id")===refs.libraryPageID){
        refs.flag=true;
    }

    refs.gallery.addEventListener('click', (e)=>{openModal(e);});

    let idFilm = '';
    function openModal(e){
        e.preventDefault();
        idFilm=e.target.parentElement.getAttribute("href");//підіймаємось на рівень вище, щоб дістати <a>
        //console.log(`id=${idFilm}`);
        //console.log(idFilm);

        if(idFilm!==null&&idFilm!==""){
            if(refs.flag==true){
                if(document.querySelector(`#${refs.tabsID.queue}`).value==true){refs.tabsID.current=refs.tabsID.queue;}
                if(document.querySelector(`#${refs.tabsID.watched}`).value==true){refs.tabsID.current=refs.tabsID.watched;}
            }
                movie.getByID(idFilm)
                .then((result) => {
                    //console.log(result);
                    let watchedBtnStatus={
                        status: "add",
                        text:   "Add to watched",
                    };
                    let queueBtnStatus={
                        status: "add",
                        text:   "Add to queue",
                    };

                    if(queueStor.existsFilmByID(result.id)>=0){
                        queueBtnStatus.status="remove";
                        queueBtnStatus.text="Remove from queue";
                    }
                    if(watchedStor.existsFilmByID(result.id)>=0){
                        watchedBtnStatus.status="remove";
                        watchedBtnStatus.text="Remove from watched";
                    }
                    if(result.poster_path==null){
                        result.poster_path=new URL("../images/library/imagesDef.jpg",import.meta.url);
                    }
                    else{
                        result.poster_path=`https://image.tmdb.org/t/p/original${result.poster_path}`
                    }
                    let markupOneCard = `<div class="modal-cardFilm" id='${result.id}'>
                    <div class="cardFilm__image">
                    <img class="image" width="320" src="https://image.tmdb.org/t/p/original${result.poster_path}" alt="${result.original_title}"/>
                </div>
                <div class="cardFilm__wrapper">
                    <h1 class="cardFilm__name">${result.original_title}</h2>
                    <p class="cardFilm__vote cardFilm__text">
                        Vote / Votes<span class="cardFilm__vote_average">${roundToTenth(result.vote_average)}</span>/<span class="cardFilm__vote_count">${result.vote_count}</span>
                    </p>
                    <p class="cardFilm__popularity cardFilm__text">
                        Popularity<span class="cardFilm___data">${roundToTenth(result.popularity)}</span>
                    </p>
                    <div class="title__wrapper"><p class="cardFilm-title cardFilm__text">
                        Original <br>Title</br></p>
                        <p class="cardFilm__title_data">${result.original_title}</p>
                    </div>
                    <div class="genres">
                        <p class="cardFilm__genre cardFilm__text">
                            Genre 
                        </p>
                        <p class="cardFilm__genreList">${openGenrs(result.genres)}</p>
                    </div>
                    <p class="cardFilm__about">About</p>
                    <p class="cardFilm__description">${result.overview}
                    </p>
                    <div class="cardFilm__listButton">
                    <button class="cardFilm__button" id="watched" data-status="${watchedBtnStatus.status}" name="watched" value="${result.id}">
                            ${watchedBtnStatus.text}
                        </button>
                        <button class="cardFilm__button" id="queue" data-status="${queueBtnStatus.status}" name="queue" value="${result.id}">
                            ${queueBtnStatus.text}
                        </button>
                    </div>
                </div>
                <button type='button' class="modal-close-btn">X</button>
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
                        //console.log(addToQueueBtn.textContent);
                        //console.log(addToQueueBtn.dataset.status);
                        switch(addToQueueBtn.dataset.status){
                            case "add": addToQueueBtn.dataset.status="remove";
                                        addToQueueBtn.textContent="Remove from queue";
                                        queueStor.saveFilmData(result);
                                        reRender(refs.flag,refs.tabsID.queue,queueStor.loadFromStorage());
                            break;
                            case "remove":  addToQueueBtn.dataset.status="add";
                                            addToQueueBtn.textContent="Add to queue";
                                            queueStor.removeFilmByID(result.id);
                                            reRender(refs.flag,refs.tabsID.queue,queueStor.loadFromStorage());
                            break;
                        }
                    }

                    function addToWatched(){
                        //console.log(result);
                        switch(addToWatchedBtn.dataset.status){
                            case "add": addToWatchedBtn.dataset.status="remove";
                                        addToWatchedBtn.textContent="Remove from watched";
                                        watchedStor.saveFilmData(result);
                                        reRender(refs.flag,refs.tabsID.watched,watchedStor.loadFromStorage());
                            break;
                            case "remove":  addToWatchedBtn.dataset.status="add";
                                            addToWatchedBtn.textContent="Add to watched";
                                            watchedStor.removeFilmByID(result.id);
                                            reRender(refs.flag,refs.tabsID.watched,watchedStor.loadFromStorage());
                            break;
                        }
                    }

                
                    spinnerOff();
            //---------END---buttons functions--------------------------------  
                })
                .catch(error => {
                console.error()})
            }
            else{
                //spinnerOff();
                //console.log("else");
            }
        }
    //-----------------------функція для виводу масиву жанрів в строчку--------------------
    function openGenrs(mass){
        return mass.map(gener=>gener.name).join(", ");
    }

    function setBtnStatus(btn,status){
        btn.dataset=status;
    }

//----------------------------------------------------------------------------------
//-------------лишнє----------------------
/*function fetchById() {
    moviesApiService
    .getMovieDetails(idFilm)
    .then(data => {
        return data})
}*/

}

function reRender(flag,tab,movieObjMass){
    const btn=document.querySelector(`#${tab}`);
    let tStatus="no";
    if(btn!==null){
        tStatus=btn.value;
    }
    console.log(`tabStatus=${tStatus}`);
    console.log(`flag=${flag}`);
    if(flag==true && tab===refs.tabsID.current){ 
        document.querySelector(`#${refs.libraryPageID}`).innerHTML=renderCardV2(movieObjMass);
    }
    else{
        
        console.log("error2");
    }
}