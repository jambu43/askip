import { createStore } from "redux";

const initialState = {};

const appReducer = (state = initialState, action) => {
  return state;
};

const store = createStore(appReducer);

export default store;
