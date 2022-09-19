import { combineReducers } from 'redux';
import CustomizerReducer from './customizer/CustomizerReducer';
import linksReducer from './links/LinkReducer';

const RootReducers = combineReducers({
  CustomizerReducer,
  linksReducer,
});

export default RootReducers;
