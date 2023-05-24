import Notiflix from "notiflix";
import LoadBtn from "./LoadBtn";
import SearchEngineService from "./SearchEngine";
import { onloadImageCard } from "./OperationsMarkup";
 export  const submitBtn = document.querySelector(".search-form");
 export const moreBtn = document.querySelector(".load-more");
 const gallery = document.querySelector(".gallery");
 const newSearchEngineService = new SearchEngineService();
 const loadBtn = new LoadBtn({selector: '.load-more', isHidden: true,});
    searchBtn.addEventListener("submit", onSearch);
    moreBtn.addEventListener("click", onClickMore);
async function onSearch(evt){
   evt.preventDefault();
   gallery.innerHTML =` `;
   loadBtn.hide();
   newSearchEngineService.resetPage();
   newSearchEngineService.query = evt.currentTarget.elements.SearchQuery.value.trim();
   if (newSearchEngineService.query === ``){
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
   }
   try{
     const result = await newSearchEngineService.fetchPictures();
     if(result.hits.length === 0){
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
     }
     else{
      onloadImageCard(result.hits)
      if( result.hits.length < result.totalHits){
         Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
         loadBtn.show();
      }
      if (result.hits.length >= result.totalHits){
         Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
         return;
      }
      loadBtn.show();
     }
   }catch(error){
      Notiflix.Notify.failure("Sorry, an error occured. Please try again.");
   }
}
async function onClickMore(){
   try{
      loadBtn.disable();
      const result = await newSearchEngineService.fetchPictures();
      onloadImageCard(result.hits);
      if (result.hits.length === 0) {
         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
         loadBtn.hide();
         return;
       }
       loadBtn.enable();
       if(result.hits.length < 40 || result.hits.length <= result.totalHits){
         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
         loadMoreBtn.hide();
         return;
       }
   }catch(error){
      Notiflix.Notify.failure("Sorry, an error occured. Please try again.");
   }
}