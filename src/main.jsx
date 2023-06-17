import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux";
import store from "./Redux/store";
import { Helmet } from 'react-helmet';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Helmet>
      <link
        rel="icon"
        href={localStorage.getItem('token') ? 'src/assets/logos/favicon.ico' : 'src/assets/logos/favicon_blue.ico'}
      />
    </Helmet>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
