import React, { useState,useEffect } from 'react';
import catApis from "./helpers/apicalls";
import {removeDublicates}from "./helpers/general";
import {IState} from "./models"
import {AxiosResponse} from "axios"
import {isEmtyOrNullArrary} from  ".//helpers/general"
// import {ITenRandomCats,ICatFavouriteList,ICatFavouriteListItem} from "./models"
import * as models from './models'






const initialState:IState ={
  catlist: [],
  pageNumber: 0,
  selectedCat: [],
  selectedBreed: "no",
  favoriteList:[],
  dataLoaded:false,
  catIdLoaded:"",
  breedsList:[],
  
}



const CatLoverAppContext=React.createContext<IState|any>(initialState);
const CatLoverAppProvider =({children}:JSX.ElementChildrenAttribute):JSX.Element=>{
  const [state, setState] = useState<IState>(initialState)
  
  // Get data from apis fon first load
  useEffect(() => {
      catApis.getTenRandomCats().then((response: models.IRandomCat[]) => {
        console.log("getTenRandomCats",response)
        setCatBreedList(response);
      });
      catApis.getFavouritesList().then((response: models.ICatFavouriteListItem[])=> {
        console.log("getFavouritesList",response)
        setCatFavouriteList(response);
      });
    }, []);
    

    const setCatFavouriteList = (list:models.ICatFavouriteListItem[]) => {
      let previousCatlist = state.favoriteList;
      previousCatlist.push(...list);
      setState((state) => ({ ...state, favoriteList: previousCatlist }));
    };
    const setCatBreedList = (list:models.IRandomCat[]) => {
      let breedList: models.ICatBreed[] = [];
      list.map((listitem:any) => {
        console.log(listitem)
        let breedNotEmtpy = isEmtyOrNullArrary(listitem.breeds)
        if (breedNotEmtpy) {
            breedList.push(listitem.breeds[0]);
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
      setState((state: IState) => ({ ...state, breedsList: filteredBreedList,catlist: filteredCatsList, dataLoaded: true, }));
    };


    return (
        <CatLoverAppContext.Provider value={[state, setState]}>
          {console.log('APP STATE',state)}
          {children}
        </CatLoverAppContext.Provider>
      );
}
export {CatLoverAppContext,CatLoverAppProvider}