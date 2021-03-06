import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export default function alerts(state = initialState, action) {
  switch (action.type) {
    case "SET_ALERT":
      return [...state, action.payload];
    case "REMOVE_ALERT":
      return [...state, action.payload];
    default:
      return state;
  }
}
