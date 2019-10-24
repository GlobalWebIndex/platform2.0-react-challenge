import { useContext, useEffect } from "react";
import { CatLoverAppContext } from "../CatLoverAppContext";
import catApis from "../helpers/apicalls";
import { Iappstate } from "../appstore/appState";
import { removeDublicates } from "../helpers/general";
import { isEmtyOrNullArrary } from "../helpers/general"


const useCatLoverApp = () => {
  const [state, setstate]: any = useContext(CatLoverAppContext);

  // Get cat details if no exist
  const getCatDetails = (id: string) => {
    let selectedCat = state.catlist.filter((cat: any) => {
      return cat.id === id;
    });
    // if not in app state call api
    if (!isEmtyOrNullArrary(selectedCat)) {
      catApis.getCAtById(id).then((response: any) => {
        console.log("CAt DETAILS FROM API", response);
        setstate((state: Iappstate) => ({ ...state, selectedCat: [response.data],catIdLoaded:id }));
      })
    } else {
      setstate((state: Iappstate) => ({ ...state, selectedCat: selectedCat,catIdLoaded:id }));
    }
    return selectedCat;
  };

  //Loads more cats
  const handleLoadMore = () => {
    let num = state.pageNumber + 1;
    catApis.loadMoreCats(num).then((response: any) => {
      setCatBreedList(response.data);
    });
  };

  //Sets cat as favorite
  const setCatAsFavorite = (id: string, cat: any) => {
    catApis.setCatAsFavorite(id).then((response: any) => {
      catApis.getFavouritesList().then((response: any) => {
        setCatFavouriteList(response.data);
      });
    });
  }

  //Deletes cat from favorites
  const deleteFromFavorites = (id: number, cat: any) => {
    if(cat){
      setCatBreedList(cat);
    }
    catApis.deleteFromFavorites(id).then((response: any) => {
      console.log(response);
      if (response.status === 200) {
        catApis.getFavouritesList().then((response: any) => {
          setCatFavouriteList(response.data);
        });
      }
    });
  }
  //Gets favoute cat list
  const getCatFavouriteList=()=>{
    catApis.getFavouritesList().then((response: any) => {
      setCatFavouriteList(response.data);
    });
  }

  //Sets favorite list in app state
  const setCatFavouriteList = (list: any) => {
    setstate((state: any) => ({ ...state, favoriteList: list }));
  };
  const setSelectedBreed = (id: any) => {
    setstate((state: any) => ({ ...state, selectedBreed: id }));
  };

  const setCatBreedList = (list: any) => {
    let breedList: any = [];
    let catlist: any = list
    list.map((listitem: any) => {
      if (listitem.breeds) {
        if (listitem.breeds.length > 0) {
          let breedItem = listitem.breeds[0];
          breedList.push(breedItem);
        }
      }
    });
    let previousCatlist: any = state.catlist;
    let previousCatBreedlist: any = state.breedsList;
    previousCatlist.push(...catlist);
    previousCatBreedlist.push(...breedList);
    console.log("No FILTERD CaTS BREED", previousCatlist);
    console.log("No FILTERD BREED", previousCatBreedlist);

    // Rmove dublicates from cat list breed list

    const filteredCatsList = removeDublicates(previousCatlist)
    const filteredBreedList = removeDublicates(previousCatBreedlist)
    console.log("FILTERD CATS BREED", filteredCatsList);
    console.log("FILTERD BREED", filteredBreedList);
    setstate((state: Iappstate) => ({ ...state, breedsList: filteredBreedList, catlist: filteredCatsList, dataLoaded: true, }));
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
