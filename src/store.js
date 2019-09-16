import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Axios from "axios";

import rootReducer from "./redux/rootReducer";

const API_KEY = process.env.REACT_APP_API_KEY;

const api = Axios.create({
  baseURL: "https://api.thecatapi.com",
  timeout: 4000,
  headers: { "x-api-key": API_KEY }
});

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    applyMiddleware(thunk.withExtraArgument(api))
  );
}
