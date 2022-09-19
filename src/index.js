import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from './redux/Store';
import './data';
import * as serviceWorker from './serviceWorker';
import Spinner from './views/spinner/Spinner';

import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

ReactDOM.render(
  <Provider store={configureStore()}>
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Web3ReactProvider getLibrary={getLibrary}>
          <App />
        </Web3ReactProvider>
      </BrowserRouter>
    </Suspense>
  </Provider>,
  document.getElementById('root'),
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals