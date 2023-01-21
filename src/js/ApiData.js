import axios from "axios";
import { spinnerOn } from "./spinner";
export default class ApiData{
    constructor(){
        this.query="";
        this.page=1;
        this.mediaType="movie";
        this.timeWindow="week";
        this.defURL="https://api.themoviedb.org/3";
        this.defKEY="c54d78350d3df927165feb0aabc91c13";
    }

    //=================================================================================================
    async getByID(id){
        console.log(id);
        spinnerOn();
        if(id!==null&&id!==undefined){
            return await this.getData(`${this.defURL}/${this.mediaType}/${id}?api_key=${this.defKEY}&language=en-US`);
        }
        else{
            console.log(`ERROR id=${id}`);
            return false;
        }
    }
    //=================================================================================================
    async getPopularMovies(){
        var res;
        await this.getData(`${this.defURL}/trending/${this.mediaType}/${this.timeWindow}?api_key=${this.defKEY}`).then(result=>{
            console.log(result);
            res=result;
        });
        return res;
    }
    //=================================================================================================
    async getData(query){
        var result={
            data: null,
            status: 'error',
            error: "axios don`t work ",
        };
        await axios.get(query)
        .then(function (response) {
            // обробка успішного запиту
            //console.log(response.data);
            result=response.data;
        })
        .catch(function (error) {
            // обробка помилки
            result={
                data:null,
                status:'error',//помилка виконанння
                error:error,
            };
        })
        .then(function () {
            // виконується завжди
        }); 
        return result;
    }
    //-------------------------------------------------------------------------------------------------
    set Query(newQuery){
        this.query=newQuery;
    }
    //-------------------------------------------------------------------------------------------------
    set Page(pageNum){
        this.page=pageNum;
    }
    //-------------------------------------------------------------------------------------------------
    set MediaType(type){
        this.mediaType=type;
    }
    //-------------------------------------------------------------------------------------------------
    set DefURL(URL){
        this.defURL=URL;
    }
    //-------------------------------------------------------------------------------------------------
    set DefKEY(KEY){
        this.defKEY=KEY;
    }
    //-------------------------------------------------------------------------------------------------
}