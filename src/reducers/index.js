import { combineReducers } from 'redux';

import desks from './desks';
import showPopup from './showPopup';
import openAddContentPopup from './openAddContentPopup';

const rootReducer = combineReducers({
  showPopup,
  desks,
  openAddContentPopup
})

export default rootReducer;