import { createContext, useEffect, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import reducer from "./reducer";
import { dark, eclipse, light, rainbow, coal, purple } from "./theme";

const hundredCatsURL =
  "https://api.thecatapi.com/v1/images/search?limit=100&page=100&order=DESC";
const breedsURL = "https://api.thecatapi.com/v1/breeds";

const AppContext = createContext();

const initialState = {
  catList: [],
  breedList: [],
  favoritesList: [],
  suggestedList: [],
  isLoading: false,
  error: false,
  imagesAmount: 10,
  showCatsModal: false,
  showBreedsModal: false,
  showFavoritesModal: false,
  showThemesModal: false,
  selected: null,
  breedId: null,
  favoriteId: null,
  theme: light,
  themes: [dark, light, rainbow, coal, purple, eclipse],
};

export const AppContextProvider = ({ children }) => {
  let navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCloseFavoriteModal = () => {
    dispatch({ type: "close-favorite-modal" });
  };

  const handleRemoveFromFavorites = () => {
    dispatch({ type: "remove-from-favorites" });
  };

  const handleFavoritesItemClick = (id) => {
    dispatch({ type: "favorite-item-click", payload: id });
  };

  const handleBreedImageClick = (item) => {
    dispatch({ type: "breed-modal-image-click", payload: item });

    navigate("/");
  };

  const handleThemesClick = () => {
    dispatch({ type: "open-themes-modal" });
  };

  const handleBreedClick = (item) => {
    const id = item.id;
    dispatch({ type: "breed-selected-from-breed-view", payload: id });
  };

  const handleBreedClickFromModal = (id) => {
    dispatch({ type: "breed-selected-from-modal", payload: id });

    navigate("/breeds");
  };

  const handleAddingToFavorites = (item) => {
    const ids = state.favoritesList.map((item) => item.id);

    if (!ids.includes(state.selected.id)) {
      dispatch({ type: "add-to-favorites", payload: state.selected });
      item.current.textContent = "Added to Favorites";
    } else {
      alert("Already in favorites");
    }
  };

  const handleThemeChange = (value) => {
    dispatch({ type: "change-theme", payload: value });
  };

  const handleLoadMoreClick = () => {
    dispatch({ type: "loadMore" });
  };

  const handleCatImageClick = (id) => {
    dispatch({ type: "open-cats-modal", payload: id });
  };

  const handleCloseCatsModal = () => {
    dispatch({ type: "close-cats-modal" });
  };

  const handleRefreshSuggestions = () => {
    dispatch({ type: "refresh-suggestions" });
  };

  const handleBreedModalClose = () => {
    dispatch({ type: "close-breed-modal" });
  };

  const asyncDispatchCats = (url) => {
    dispatch({ type: "loading" });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "fulfilled-cats", payload: data });
      })
      .catch((error) => dispatch({ type: "error-fetching" }));
  };

  const asyncDispatchBreeds = (url) => {
    dispatch({ type: "loading" });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "fulfilled-breeds", payload: data });
      })
      .catch((error) => dispatch({ type: "error-fetching" }));
  };

  useEffect(() => {
    asyncDispatchCats(hundredCatsURL);
    asyncDispatchBreeds(breedsURL);
  }, []);

  const value = {
    state,
    handleCatImageClick,
    handleLoadMoreClick,
    handleCloseCatsModal,
    handleAddingToFavorites,
    handleBreedClickFromModal,
    handleBreedClick,
    handleBreedImageClick,
    handleFavoritesItemClick,
    handleRemoveFromFavorites,
    handleCloseFavoriteModal,
    handleRefreshSuggestions,
    handleBreedModalClose,
    handleThemesClick,
    handleThemeChange,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
