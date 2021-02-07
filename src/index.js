import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import {BrowserRouter } from 'react-router-dom'
import { grey } from '@material-ui/core/colors';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from '../src/Reducer/index.js'
var admin = require("firebase-admin");

var serviceAccount = require("./Secret/newkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary:grey,
  },
});

const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
