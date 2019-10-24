export interface Iappstate {
  catlist: [];
  actions?: any;
  pageNumber: number;
  selectedCat: [];
  favoriteList:[];
  breedsList:[]
  dataLoaded:boolean
}

let appState: Iappstate = {
  catlist: [],
  pageNumber: 0,
  selectedCat: [],
  favoriteList:[],
  breedsList:[],
  dataLoaded:false
};
export default appState;
