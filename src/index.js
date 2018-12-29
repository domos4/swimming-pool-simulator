import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./redux/rootReducer";
import registerServiceWorker from "./registerServiceWorker";
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());

function renderRootElement() {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
}

ReactDOM.render(
    renderRootElement(),
    document.getElementById("root")
);

registerServiceWorker();

