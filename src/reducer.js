const reducer = (state, action) => {
  if (action.type === "loading") {
    return { ...state, isLoading: true, error: false };
  }
  if (action.type === "error-fetching") {
    return { ...state, error: true, isLoading: false };
  }
  if (action.type === "fulfilled-cats") {
    return { ...state, catList: action.payload, isLoading: false };
  }
  if (action.type === "fulfilled-breeds") {
    return {
      ...state,
      breedList: action.payload,
      suggestedList: action.payload.sort(() => 0.5 - Math.random()).slice(0, 5),
    };
  }
  if (action.type === "loadMore") {
    return { ...state, imagesAmount: state.imagesAmount + 10 };
  }
  if (action.type === "open-cats-modal") {
    const item = state.catList.find((item) => item.id === action.payload);
    return { ...state, selected: item, showCatsModal: true };
  }
  if (action.type === "close-cats-modal") {
    return { ...state, showCatsModal: false };
  }
  if (action.type === "close-breed-modal") {
    return { ...state, showBreedsModal: false };
  }
  if (action.type === "add-to-favorites") {
    return {
      ...state,
      favoritesList: [...state.favoritesList, action.payload],
    };
  }
  if (action.type === "breed-selected-from-modal") {
    return {
      ...state,
      breedId: action.payload,
      showCatsModal: false,
      showBreedsModal: true,
    };
  }
  if (action.type === "breed-selected-from-breed-view") {
    return { ...state, breedId: action.payload, showBreedsModal: true };
  }
  if (action.type === "breed-modal-image-click") {
    return {
      ...state,
      showBreedsModal: false,
      selected: action.payload,
      showCatsModal: true,
    };
  }
  if (action.type === "favorite-item-click") {
    return { ...state, favoriteId: action.payload, showFavoritesModal: true };
  }
  if (action.type === "remove-from-favorites") {
    return {
      ...state,
      favoritesList: state.favoritesList.filter(
        (item) => item.id !== state.favoriteId
      ),
      favoriteId: null,
      showFavoritesModal: false,
    };
  }
  if (action.type === "close-favorite-modal") {
    return { ...state, showFavoritesModal: false };
  }
  if (action.type === "refresh-suggestions") {
    return {
      ...state,
      suggestedList: state.breedList
        .sort(() => 0.5 - Math.random())
        .slice(0, 5),
    };
  }
  if (action.type === "open-themes-modal") {
    return { ...state, showThemesModal: true };
  }
  if (action.type === "change-theme") {
    return {
      ...state,
      theme: state.themes.find((theme) => theme.name === action.payload),
      showThemesModal: false,
    };
  }
  return state;
};

export default reducer;
