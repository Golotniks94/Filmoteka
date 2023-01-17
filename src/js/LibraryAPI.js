import { load, save, remove } from "./localStorageApi";
export default class LibraryStorage{
    constructor(storageKey){
        this.key=storageKey;
        this.storage="";
    }
    saveFilmData(filmDataObject){
        let boof=new Array();
        if(this.initializationStorage()){
            let x=this.storage.findIndex(elment=>elment.id===filmDataObject.id);
            console.log(x);
            if(x<0){
                this.storage.push(filmDataObject);
                save(this.key,this.storage);
            }
            else{
                return;
            }
        }
        else{
            let x=boof.findIndex(elment=>elment.id===filmDataObject.id);
                console.log(x);
                if(x<0)
                {
                    boof.push(filmDataObject);
                    save(this.key,boof);

                }
                else{
                    return;
                }
        }
    }

    initializationStorage(){
        this.storage=load(this.key);
        if(this.storage!==""&&this.storage!==undefined){
            return true;
        }
        else{
            return false;
        }
    } 

    loadFromStorage(){
        return load(this.key);
    }
}
/*
let boof=new Array();
    //let data={films: boof};
    const storage=load("Watched");
    console.log(storage);
    await idMass.map(id=>{
        
        film.getByID(id).then(res=>{
            //console.log(res);
            if(storage!==undefined){
                let x=storage.findIndex(elment=>elment.id===res.id);
                console.log(x);
                if(x<0)
                {
                    storage.push(res);
                    save("Watched",storage);

                }
                else{
                    return;
                }
            }
            else{
                let x=boof.findIndex(elment=>elment.id===res.id);
                console.log(x);
                if(x<0)
                {
                    boof.push(res);
                    save("Watched",boof);

                }
                else{
                    return;
                }
            }
                
            //return res;
        });
    });*/