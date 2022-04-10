import { ADD_FAVORITE } from "../constants/action-types"

export function addFavorite(payload) {
    return { type: ADD_FAVORITE, payload }
};