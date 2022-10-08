import ReactDom from "react-dom";
import { Provider } from "react-redux"; //bridge between react and redux
import { createStore, applyMiddleware, compose } from "redux";
import Reducers from "./store/Reducers/Index";
import AppRoute from "./AppRoute";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const EhnaceCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = EhnaceCompose(applyMiddleware(thunk))(createStore);

ReactDom.render(
  <Provider store={store(Reducers)}>
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
