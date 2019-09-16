const initialSate = {
  isInitialized: false,
  isLoading: true,
  cats: [],
  selectCatId: undefined,
  error: undefined
};

/* Action types */
const FETCH_CATS = "FETCH_CATS";
const FETCH_CATS_SUCCESS = "FETCH_CATS_SUCCESS";
const FETCH_CATS_ERROR = "FETCH_CATS_ERROR";

const FETCH_CAT = "FETCH_CAT";
const FETCH_CAT_SUCCESS = "FETCH_CAT_SUCCESS";
const FETCH_CAT_ERROR = "FETCH_CAT_ERROR";

const MARK_AS_FAVOURITE = "MARK_AS_FAVOURITE";
const MARK_AS_FAVOURITE_SUCCESS = "MARK_AS_FAVOURITE_SUCCESS";
const MARK_AS_FAVOURITE_ERROR = "MARK_AS_FAVOURITE_ERROR";

const SELECT_CAT = "SELECT_CAT";

/* Reducer */
export function reducer(state = initialSate, action) {
  switch (action.type) {
    case (FETCH_CATS, FETCH_CAT): {
      return {
        ...state,
        isLoading: true,
        selectedCat: undefined
      };
    }
    case MARK_AS_FAVOURITE: {
      return {
        ...state,
        isLoading: true,
        selectedCat: undefined,
        error: undefined
      };
    }
    case MARK_AS_FAVOURITE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isInitialized: true,
        error: undefined
      };
    }
    case FETCH_CATS_SUCCESS: {
      const { cats } = action.payload.variables;
      return {
        ...state,
        isLoading: false,
        isInitialized: true,
        error: undefined,
        cats: cats.map(cat => ({ ...cat, src: cat.url }))
      };
    }
    case (FETCH_CATS_ERROR, FETCH_CAT_ERROR): {
      return {
        ...state,
        isLoading: false,
        error: action.payload.variables.error
      };
    }
    case FETCH_CAT_SUCCESS: {
      const { cat } = action.payload.variables;
      return {
        ...state,
        isLoading: false,
        error: undefined,
        selectedCat: { ...cat, src: cat.url }
      };
    }
    case SELECT_CAT: {
      return {
        ...state,
        selectedCat: action.payload.variables.cat
      };
    }
    default: {
      return state;
    }
  }
}

/* Actions */
export function fetchCats() {
  return (dispatch, getState, axios) => {
    dispatch({ type: FETCH_CATS });
    axios
      .get("/v1/images/search", { params: { limit: 10 } })
      .then(response => {
        const payload = {
          variables: {
            cats: response.data
          }
        };
        dispatch({ type: FETCH_CATS_SUCCESS, payload });
      })
      .catch(error =>
        dispatch({ type: FETCH_CATS_ERROR, payload: { variables: { error } } })
      );
  };
}

export function fetchCatsIfNeeded() {
  return (dispatch, getState) => {
    const state = getState().searchReducer;
    if (!state.isInitialized) {
      return dispatch(fetchCats());
    }
  };
}

export function selectCat(cat) {
  return { type: SELECT_CAT, payload: { variables: { cat } } };
}

export function selectCatById(id) {
  return (dispatch, getState, axios) => {
    dispatch({ type: FETCH_CAT });
    axios
      .get(`/v1/images/${id}`)
      .then(response => {
        const payload = {
          variables: {
            cat: response.data
          }
        };
        dispatch({ type: FETCH_CAT_SUCCESS, payload });
      })
      .catch(error =>
        dispatch({ type: FETCH_CAT_ERROR, payload: { variables: { error } } })
      );
  };
}

export function markAsFavorite() {
  return (dispatch, getState, axios) => {
    const state = getState().searchReducer;
    dispatch({ type: MARK_AS_FAVOURITE });
    axios
      .post("/v1/favourites", { image_id: state.selectedCat.id })
      .then(response => {
        dispatch({ type: MARK_AS_FAVOURITE_SUCCESS });
      })
      .catch(error =>
        dispatch({
          type: MARK_AS_FAVOURITE_ERROR,
          payload: { variables: { error } }
        })
      );
  };
}
