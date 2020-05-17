import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Rooter from "./config/Router";
import moment from "./config/moment";
import { store, persistor } from "./store/createStore";
console.disableYellowBox = true;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Rooter />
      </PersistGate>
    </Provider>
  );
}
