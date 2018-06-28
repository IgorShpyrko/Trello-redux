import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import './index.css';
import Popup from './Components/Popup/Popup';
import Table from './Components/Table/Table';
import desks from './reducers/desks';
import showPopup from './reducers/showPopup';
import openAddContentPopup from './reducers/openAddContentPopup';

const rootReducer = combineReducers({
  showPopup,
  desks,
  openAddContentPopup
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <Popup />
      <Table />
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
);
