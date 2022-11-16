import Cat from 'types';

export enum ActionType {
  Select,
  ToggleFavourite
}

type Action =
  | { type: ActionType.Select; payload: Cat.Image | null }
  | {
      type: ActionType.ToggleFavourite;
      payload: Cat.FavouriteImage;
    };

export type State = {
  selected: Cat.Image | null;
  favourites: Cat.FavouriteImage[];
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.Select:
      return { ...state, selected: action.payload };

    case ActionType.ToggleFavourite:
      let favourites = [...state.favourites];
      const { id } = action.payload;
      const isFavourite = favourites.some((item) => item.id === id);

      if (isFavourite) {
        favourites = favourites.filter((item) => item.id !== id);
      } else {
        favourites.push(action.payload);
      }

      return { ...state, favourites };
  }
}

export default reducer;
