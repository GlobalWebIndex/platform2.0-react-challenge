const initialSate = {
  isInitialized: false,
  isLoading: true,
  breeds: [],
  cats: [],
  selectedBreedId: undefined,
  error: undefined
};

/* Action types */
const FETCH_BREEDS = "FETCH_BREEDS";
const FETCH_BREEDS_SUCCESS = "FETCH_BREEDS_SUCCESS";
const FETCH_BREEDS_ERROR = "FETCH_BREEDS_ERROR";

const FETCH_CATS_PER_BREED = "FETCH_CATS_PER_BREED";
const FETCH_CATS_PER_BREED_SUCCESS = "FETCH_CATS_PER_BREED_SUCCESS";
const FETCH_CATS_PER_BREED_ERROR = "FETCH_CATS_PER_BREED_ERROR";

/* Reducer */
export function reducer(state = initialSate, action) {
  switch (action.type) {
    case FETCH_BREEDS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.variables.error
      };
    }
    case FETCH_BREEDS: {
      return {
        ...state,
        isLoading: true,
        isInitialized: true
      };
    }
    case FETCH_BREEDS_SUCCESS: {
      const { breeds } = action.payload.variables;
      return {
        ...state,
        isLoading: false,
        error: undefined,
        breeds: breeds.map(breed => ({ ...breed, src: breed.url }))
      };
    }
    case FETCH_CATS_PER_BREED: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        cats: [],
        selectedBreedId: action.payload.variables.breedId
      };
    }
    case FETCH_CATS_PER_BREED_SUCCESS: {
      const { cats } = action.payload.variables;
      return {
        ...state,
        isLoading: false,
        error: undefined,
        cats: cats.map(cat => ({ ...cat, src: cat.url }))
      };
    }
    default: {
      return state;
    }
  }
}

/* Actions */
export function fetchBreeds() {
  return (dispatch, getState, axios) => {
    dispatch({ type: FETCH_BREEDS });
    axios
      .get("/v1/breeds", {})
      .then(response => {
        const payload = {
          variables: {
            breeds: response.data
          }
        };
        dispatch({ type: FETCH_BREEDS_SUCCESS, payload });
      })
      .catch(error =>
        dispatch({
          type: FETCH_BREEDS_ERROR,
          payload: { variables: { error } }
        })
      );
  };
}

export function fetchBreedsIfNeeded() {
  return (dispatch, getState) => {
    const state = getState().breedsReducer;
    if (!state.isInitialized) {
      return dispatch(fetchBreeds());
    }
  };
}

export function selectBreed(breedId) {
  return (dispatch, getState, axios) => {
    dispatch({
      type: FETCH_CATS_PER_BREED,
      payload: { variables: { breedId } }
    });
    axios
      .get("/v1/images/search", { params: { limit: 10, breed_id: breedId } })
      .then(response => {
        const payload = {
          variables: {
            cats: response.data
          }
        };
        dispatch({ type: FETCH_CATS_PER_BREED_SUCCESS, payload });
      })
      .catch(error =>
        dispatch({
          type: FETCH_CATS_PER_BREED_ERROR,
          payload: { variables: { error } }
        })
      );
  };
}
