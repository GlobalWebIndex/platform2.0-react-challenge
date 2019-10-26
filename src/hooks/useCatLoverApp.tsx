import { useContext, useEffect } from "react";
import { CatLoverAppContext } from "../CatLoverAppContext";
import catApis from "../helpers/apicalls";
import { removeDublicates } from "../helpers/general";
import { isEmtyOrNullArrary } from "../helpers/general"
import  {IState} from '../models'
import * as models from '../models'



const useCatLoverApp = () => {
  const [state, setstate]= useContext(CatLoverAppContext);

  // Get cat details if no exist
  const getCatDetails = (id: string) => {
    let selectedCat = state.catlist.filter((cat: models.IRandomCat) => {
      return cat.id === id;
    });
    // if not in app state call api
    if (!isEmtyOrNullArrary(selectedCat)) {
      catApis.getCAtById(id).then((response: models.IRandomCat) => {
        console.log("CAt DETAILS FROM API", response);
        setstate((state: IState) => ({ ...state, selectedCat: [response],catIdLoaded:id }));
      })
    } else {
      setstate((state: IState) => ({ ...state, selectedCat: selectedCat,catIdLoaded:id }));
    }
    return selectedCat;
  };

  //Loads more cats
  const handleLoadMore = () => {
    let num = state.pageNumber + 1;
    catApis.loadMoreCats(num).then((response: models.IRandomCat[]) => {
      setCatBreedList(response);
    });
  };

  //Sets cat as favorite
  const setCatAsFavorite = (id: string, cat: models.IRandomCat) => {
    catApis.setCatAsFavorite(id).then(() => {
      catApis.getFavouritesList().then((response: models.IRandomCat[]) => {
        console.log("getFavouritesList",response)
        setCatFavouriteList(response);
      });
    });
  }

  //Deletes cat from favorites
  const deleteFromFavorites = (id: number, cat:  models.IRandomCat|any) => {
    if(cat){
      setCatBreedList(cat);
    }
    catApis.deleteFromFavorites(id).then((response: models.IServerResponse) => {
      console.log("deleteFromFavorites",response);
      if (response.message === "SUCCESS") {
        catApis.getFavouritesList().then((response: models.IRandomCat[]) => {
          setCatFavouriteList(response);
        });
      }
    });
  }
  //Gets favoute cat list
  const getCatFavouriteList=()=>{
    catApis.getFavouritesList().then((response: models.IRandomCat[]) => {
      setCatFavouriteList(response);
    });
  }

  //Sets favorite list in app state
  const setCatFavouriteList = (list: models.IRandomCat[]) => {
    setstate((state: IState) => ({ ...state, favoriteList: list }));
  };
  const setSelectedBreed = (id: string) => {
    setstate((state: IState) => ({ ...state, selectedBreed: id }));
  };

  const setCatBreedList = (list:models.IRandomCat[]) => {
    let breedList: models.ICatBreed[] = [];
    list.map((listitem: any) => {
      console.log(listitem)
      let breedNotEmtpy = isEmtyOrNullArrary(listitem.breeds)
      if (breedNotEmtpy) {
          breedList.push(listitem.breeds);
      }
    });
    let previousCatlist: models.IRandomCat[] = state.catlist;
    let previousCatBreedlist: models.ICatBreed[] = state.breedsList;
    previousCatlist.push(...list);
    previousCatBreedlist.push(...breedList);
    console.log("No FILTERD CaTS BREED", previousCatlist);
    console.log("No FILTERD BREED", previousCatBreedlist);
    const filteredCatsList = removeDublicates(previousCatlist)
    const filteredBreedList = removeDublicates(previousCatBreedlist)
    console.log("FILTERD CATS BREED", filteredCatsList);
    console.log("FILTERD BREED", filteredBreedList);
    setstate((state: IState) => ({ ...state, breedsList: filteredBreedList,catlist: filteredCatsList, dataLoaded: true, }));
  };

  return {
    getCatDetails,
    handleLoadMore,
    setCatBreedList,
    setSelectedBreed,
    getCatFavouriteList,
    setCatAsFavorite,
    deleteFromFavorites,
    catlist: state.catlist,
    selectedBreed: state.selectedBreed,
    selectedCat: state.selectedCat,
    favoriteList: state.favoriteList,
    dataLoaded: state.dataLoaded,
    breedsList: state.breedsList,
    catIdLoaded:state.catIdLoaded
  };
};

export default useCatLoverApp;
