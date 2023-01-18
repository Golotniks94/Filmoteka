import {roundToTenth} from "./roundingNumFunction";
//=========================render--functions==========================
export default function renderCardV2(info){
    return info.map((info)=>{
    return `<li class="gallery-item">
        <a href="${info.id}" class="movie-link">
            <img class="movie-img" src="https://image.tmdb.org/t/p/original${info.poster_path}"  alt="${info.title}" loading="lazy"/>
            <h2 class="movie-title">${info.original_title}</h2>
            <p class="movie-info">${getObjectGeners(info.genres)} <span>|</span> ${info.release_date.split('-')[0]}<span class="movie-info__vote_average">${roundToTenth(info.vote_average)}</span></p>
        </a>
    </li>`}
).join("");
}

function getObjectGeners(genersObjectMass){
    let result="";
    for(let i=0;i<genersObjectMass.length;i++)
    {
        if(i>=2)
        {
            result+="other"
            return result;
        }
        else if(i==genersObjectMass.length-1)
        {
            result+=genersObjectMass[i].name;
        }
        else
        {
            result+=genersObjectMass[i].name+", ";
        }
        
    }
    return result;
}