import axios from "axios";
import Notiflix from "notiflix";
import { submitBtn, moreBtn } from ".";
export default class SearchEngineService {
    constructor() {
        this.page = 1;
        this.totalPages = 0;
        this.searchQuery = '';
   
    }
    async fetchPictures(){
        const axiosSettings = {
            method: "GET",
            url: "https://pixabay.com/api",
            params: {
                key: "36691330-f06414af311b17804c7b2f1b7",
                q: `${this.searchQuery}`,
                orientation: "horizontal",
                page: `${this.page}`,
                per_page: `40`,
                image_type: "photo",
                safesearch: true,
                
            },
        };
        try{
            const response = await axios(axiosSettings);
            this.updatePage();
            return response.data;
          
        } catch{
            console.log("Error!")
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            moreBth.classList.add('is-hidden');
        }
        
    }
    updatePage(){
        this.page +=1;
    }
    resetPage(){
        this.page = 1;
    }
    resetHits(){
        this.endOfHits = false;
    }
    setTotal(total){
        return (this.totalPages = total);
    }
    getQuery(){
        return this.searchQuery;
    }
    setQuery(newQuery){
        return (this.searchQuery = newQuery);
    }
}
 