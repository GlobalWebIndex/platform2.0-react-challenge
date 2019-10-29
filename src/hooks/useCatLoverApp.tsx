import { useContext, useEffect } from "react";
import { CatLoverAppContext } from "../CatLoverAppContext";
import catApis from "../helpers/apicalls";
import { removeDublicates } from "../helpers/general";
import { isEmtyOrNullArrary } from "../helpers/general";
import { IState } from "../models";
import * as models from "../models";
import { async } from "q";

const useCatLoverApp = () => {
  const [state, setstate] = useContext(CatLoverAppContext);

  // Get cat details if no exist
  const getCatDetails = async (id: string) => {
    let mdata: any = [];
    let selectedCat = state.catlist.filter((cat: models.IRandomCat) => {
      return cat.id === id;
    });
    // if not in app state call api
    if (!isEmtyOrNullArrary(selectedCat)) {
      await catApis.getCAtById(id).then(data => {
        console.log("CAt DETAILS FROM API", data);
        state.catItemLoaded = true;
        state.selectedCat = data;
        setstate((state: IState) => ({
          ...state,
          selectedCat: data,
          catItemLoaded: true
        }));

        return (mdata = data);
      });
    } else {
      setstate((state: IState) => ({
        ...state,
        selectedCat: selectedCat,
        catItemLoaded: id
      }));
    }
    return mdata;
  };

  const ResetLoaded = () => {
    state.catItemLoaded = false;
    state.selectedCat = [];
  };

  //Loads more cats
  const handleLoadMore = () => {
    let num = state.pageNumber + 1;
    catApis.loadMoreCats(num).then((response: models.IRandomCat[]) => {
      setCatBreedList(response);
    });
  };

  //Sets cat as favorite
  const setCatAsFavorite = async (id: string, cat: models.IRandomCat) => {
    await catApis.setCatAsFavorite(id).then(response => {
      console.log(response);
      setCatFavouriteListNorender(response);
    });
    return "true";
  };

  //Deletes cat from favorites
  const deleteFromFavorites = async (
    id: number,
    cat: models.IRandomCat | any,
    isdetalisComponet: boolean
  ) => {
    await catApis
      .deleteFromFavorites(id)
      .then((response: models.IRandomCat[]) => {
        console.log("deleteFromFavorites", response);
        if (isdetalisComponet) {
          setCatFavouriteListNorender(response);
        } else {
          setCatFavouriteList(response);
          if (cat) {
            setCatBreedList(cat);
          }
        }
      });
  };
  //Gets favoute cat list
  const getCatFavouriteList = () => {
    catApis.getFavouritesList().then((response: models.IRandomCat[]) => {
      setCatFavouriteList(response);
    });
  };
  const setCatFavouriteList = (list: models.IRandomCat[]) => {
    setstate((state: IState) => ({ ...state, favoriteList: list }));
  };
  //Sets favorite list in app state
  const setCatFavouriteListNorender = (list: models.IRandomCat[]) =>
    (state.favoriteList = list);

  const setSelectedBreed = (id: string) => {
    setstate((state: IState) => ({ ...state, selectedBreed: id }));
  };

  const getFavouriteList = () => state.favoriteList;

  const setCatBreedList = (list: models.IRandomCat[]) => {
    let breedList: models.ICatBreed[] = [];
    list.map((listitem: any) => {
      console.log(listitem);
      let breedNotEmtpy = isEmtyOrNullArrary(listitem.breeds);
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
    const filteredCatsList = removeDublicates(previousCatlist);
    const filteredBreedList = removeDublicates(previousCatBreedlist);
    console.log("FILTERD CATS BREED", filteredCatsList);
    console.log("FILTERD BREED", filteredBreedList);
    setstate((state: IState) => ({
      ...state,
      breedsList: filteredBreedList,
      catlist: filteredCatsList,
      dataLoaded: true
    }));
  };

  return {
    getCatDetails,
    handleLoadMore,
    setCatBreedList,
    setSelectedBreed,
    getCatFavouriteList,
    setCatAsFavorite,
    ResetLoaded,
    getFavouriteList,
    deleteFromFavorites,
    catlist: state.catlist,
    selectedBreed: state.selectedBreed,
    selectedCat: state.selectedCat,
    favoriteList: state.favoriteList,
    dataLoaded: state.dataLoaded,
    breedsList: state.breedsList,
    catItemLoaded: state.catItemLoaded
  };
};

export default useCatLoverApp;
