import { combineReducers } from "redux";
import images from "./images/reducers";

const rootReducer = combineReducers({
  images,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
