import React from "react";
import { Provider } from "react-redux";

import ArtisteScreen from "./screens/ArtisteScreen"

import Rooter from "./config/Router";
import store from "./config/createStore";

export default function App() {
  return (
    
    // <ArtisteScreen />
    <Provider store={store}>
      <Rooter />
    </Provider>
  );
}
