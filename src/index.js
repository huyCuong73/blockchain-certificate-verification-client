import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Web3ReactProvider } from "@web3-react/core";
import Header from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './redux/reducers';
import mySaga from './redux/sagas';
const { ethers } = require("ethers");

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(mySaga)

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store = {store}>
        <Web3ReactProvider getLibrary={getLibrary}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Web3ReactProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
