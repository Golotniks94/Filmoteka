import renderCardV2 from "./renderCardsLibrary";
import LibraryStorage from "./LibraryAPI";

const refs={
    gallery:    document.querySelector("#libGallery"),
    wathedBTN:  document.querySelector("#watched"),
    queBTN:     document.querySelector("#que"),
}

const watchedStor=new LibraryStorage("Watched");
const queueStor=new LibraryStorage("Queue");

refs.wathedBTN.addEventListener("click",()=>{
    refs.gallery.innerHTML=renderCardV2(watchedStor.loadFromStorage());
});
refs.queBTN.addEventListener("click",()=>{
    refs.gallery.innerHTML=renderCardV2(queueStor.loadFromStorage());
});