import React from "react";
import { Provider } from "react-redux";
import Rooter from "./config/Router";
import store from "./config/createStore";

export default function App() {
  return (
    <Provider store={store}>
      <Rooter />
    </Provider>
  );
}
