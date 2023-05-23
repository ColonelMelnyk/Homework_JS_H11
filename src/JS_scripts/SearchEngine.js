import axios from "axios";
import Notiflix from "notiflix";
export default class SearchEngineService {
    constructor() {
      this.searchQuery = '';
      this.page = 1;
      this.totalPages = 0;
      this.PER_PAGE = 40;
    }
    incrementPage(){
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
 