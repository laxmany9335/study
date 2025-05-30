import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducer/index';
import { configureStore } from '@reduxjs/toolkit';
import { Toaster } from 'react-hot-toast';

const store = configureStore({
  reducer: rootReducer,

});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
