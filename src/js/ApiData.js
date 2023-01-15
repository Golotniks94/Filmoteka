import axios from "axios";
export default class ApiData{
    constructor(){
        this.query="";
        this.page=1;
        this.mediaType="movie";
        this.timeWindow="week";
        this.defURL="https://api.themoviedb.org/3";
        this.defKEY="c54d78350d3df927165feb0aabc91c13";
    }
    /*//-------------------------------------------------------------------------------------------------
    set query(query){
        this.query=query;
    }
    //-------------------------------------------------------------------------------------------------
    set page(pageNum){
        this.page=pageNum;
    }
    //-------------------------------------------------------------------------------------------------
    set mediaType(type){
        this.mediaType=type;
    }
    //-------------------------------------------------------------------------------------------------
    set defURL(URL){
        this.defURL=URL;
    }
    //-------------------------------------------------------------------------------------------------
    set defKEY(KEY){
        this.defKEY=KEY;
    }*/
    //-------------------------------------------------------------------------------------------------
    //=================================================================================================
    async getByID(id){
        var res;
        await this.getData(`${this.defURL}/${this.mediaType}/${id}?api_key=${this.defKEY}&language=en-US`).then(result=>{
            //console.log(result);
            res=result;
        });
        return res;
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
        var result;
        await axios.get(query)
        .then(function (response) {
            // обробка успішного запиту
            //console.log(response.data);
            result=response.data;
        })
        .catch(function (error) {
            // обробка помилки
            result={
                data:               null,
                status:             'error',//помилка виконанння
                error:              error,
            };
        })
        .then(function () {
            // виконується завжди
        }); 
        return result;
    }
}