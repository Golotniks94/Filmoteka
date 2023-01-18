import renderCardV2 from "./renderCardsLibrary";
import LibraryStorage from "./LibraryAPI";

const refs={
    gallery:    document.querySelector("#libGallery"),
    wathedBTN:  document.querySelector("#watchedButton"),
    queBTN:     document.querySelector("#queButton"),
    activeClass: "header-lib__btn--current",
}

const watchedStor=new LibraryStorage("Watched");
const queueStor=new LibraryStorage("Queue");
const noData=refs.gallery.innerHTML;


removeClass(refs.queBTN,refs.activeClass);
removeClass(refs.wathedBTN,refs.activeClass);

//console.log(refs.queBTN.classList.contains("header-lib__btn--current"));
//console.log(refs.wathedBTN.classList.contains("header-lib__btn--current"));

if(queueStor.initializationStorage()==true||watchedStor.initializationStorage()===true){
    if(queueStor.initializationStorage()==true){
        refs.gallery.innerHTML=renderCardV2(queueStor.loadFromStorage());
        addClass(refs.queBTN,refs.activeClass);
    }
    else{
        refs.gallery.innerHTML=renderCardV2(watchedStor.loadFromStorage());
        addClass(refs.wathedBTN,refs.activeClass);
    }
}
else{
    
}
//console.log(refs.queBTN.classList.contains("header-lib__btn--current"));
//console.log(refs.wathedBTN.classList.contains("header-lib__btn--current"));

//refs.gallery.innerHTML=noData();

refs.wathedBTN.addEventListener("click",()=>{
    if(watchedStor.initializationStorage()===true){
        refs.gallery.innerHTML=renderCardV2(watchedStor.loadFromStorage());
        addClass(refs.wathedBTN,refs.activeClass);
        removeClass(refs.queBTN,refs.activeClass);
    }
    else{
        refs.gallery.innerHTML=noData;
        addClass(refs.wathedBTN,refs.activeClass);
        removeClass(refs.queBTN,refs.activeClass);
    }
    
});
refs.queBTN.addEventListener("click",()=>{
    if(queueStor.initializationStorage()===true){
        refs.gallery.innerHTML=renderCardV2(queueStor.loadFromStorage());
        addClass(refs.queBTN,refs.activeClass);
        removeClass(refs.wathedBTN,refs.activeClass);
    }
    else{
        refs.gallery.innerHTML=noData;
        addClass(refs.queBTN,refs.activeClass);
        removeClass(refs.wathedBTN,refs.activeClass);
    }
});

function removeClass(element,class_Name){
    if(element.classList.contains(class_Name)){
        element.classList.remove(class_Name);
        return true;
    }
    return false;
    
}
function addClass(element,class_Name){
    if(!element.classList.contains(class_Name)){
        element.classList.add(class_Name);
        return true;
    }
    return false;
}