import renderCardV2 from "./renderCardsLibrary";
import LibraryStorage from "./LibraryAPI";

const refs={
    gallery:    document.querySelector("#libGallery"),
    wathedBTN:  document.querySelector("#watchedButton"),
    queBTN:     document.querySelector("#queButton"),
}

const watchedStor=new LibraryStorage("Watched");
const queueStor=new LibraryStorage("Queue");
const noData=refs.gallery.innerHTML;

if(queueStor.initializationStorage()==true||watchedStor.initializationStorage()===true){
    if(queueStor.initializationStorage()==true){
        refs.gallery.innerHTML=renderCardV2(queueStor.loadFromStorage());
    }
    else{
        refs.gallery.innerHTML=renderCardV2(watchedStor.loadFromStorage());
    }
}



//refs.gallery.innerHTML=noData();

refs.wathedBTN.addEventListener("click",()=>{
    if(watchedStor.initializationStorage()===true){
        refs.gallery.innerHTML=renderCardV2(watchedStor.loadFromStorage());
    }
    else{
        refs.gallery.innerHTML=noData;
    }
    
});
refs.queBTN.addEventListener("click",()=>{
    if(queueStor.initializationStorage()===true){
        refs.gallery.innerHTML=renderCardV2(queueStor.loadFromStorage());
    }
    else{
        refs.gallery.innerHTML=noData;
    }
});
