import { AsyncStorage } from "react-native";
import { persistStore, persistReducer } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["navigation", "auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export let persistor = persistStore(store);
