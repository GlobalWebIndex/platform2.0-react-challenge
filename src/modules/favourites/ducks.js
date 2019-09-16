const initialSate = {
  isLoading: true,
  favourites: [],
  error: undefined
};

/* Action types */
const FETCH_FAVOURITES = "FETCH_FAVOURITES";
const FETCH_FAVOURITES_SUCCESS = "FETCH_FAVOURITES_SUCCESS";
const FETCH_FAVOURITES_ERROR = "FETCH_FAVOURITES_ERROR";

const UNMARK_AS_FAVOURITE = "UNMARK_AS_FAVOURITE";
const UNMARK_AS_FAVOURITE_SUCCESS = "UNMARK_AS_FAVOURITE_SUCCESS";
const UNMARK_AS_FAVOURITE_ERROR = "UNMARK_AS_FAVOURITE_ERROR";

/* Reducer */
export function reducer(state = initialSate, action) {
  switch (action.type) {
    case FETCH_FAVOURITES_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.variables.error
      };
    }
    case FETCH_FAVOURITES: {
      return {
        ...state,
        isLoading: true
      };
    }
    case FETCH_FAVOURITES_SUCCESS: {
      const { favourites } = action.payload.variables;
      return {
        ...state,
        isLoading: false,
        error: undefined,
        favourites: favourites.map(f => ({
          ...f.image,
          favouriteId: f.id,
          src: f.image.url,
          width: 1,
          height: 1
        }))
      };
    }
    case UNMARK_AS_FAVOURITE_SUCCESS: {
      const { id } = action.payload.variables;
      return {
        ...state,
        isLoading: false,
        error: undefined,
        favourites: state.favourites.filter(
          favourite => favourite.favouriteId !== id
        )
      };
    }
    default: {
      return state;
    }
  }
}

/* Actions */
export function fetchFavourites() {
  return (dispatch, getState, axios) => {
    dispatch({ type: FETCH_FAVOURITES });
    axios
      .get("/v1/favourites", { params: { limit: 10 } })
      .then(response => {
        const payload = {
          variables: {
            favourites: response.data
          }
        };
        dispatch({ type: FETCH_FAVOURITES_SUCCESS, payload });
      })
      .catch(error =>
        dispatch({
          type: FETCH_FAVOURITES_ERROR,
          payload: { variables: { error } }
        })
      );
  };
}

export function unmarkAsFavorite({ favouriteId }) {
  return (dispatch, getState, axios) => {
    dispatch({ type: UNMARK_AS_FAVOURITE });
    axios
      .delete(`/v1/favourites/${favouriteId}`)
      .then(response => {
        dispatch({
          type: UNMARK_AS_FAVOURITE_SUCCESS,
          payload: { variables: { id: favouriteId } }
        });
      })
      .catch(error =>
        dispatch({
          type: UNMARK_AS_FAVOURITE_ERROR,
          payload: { variables: { error } }
        })
      );
  };
}
