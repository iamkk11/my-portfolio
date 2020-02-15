import {combineReducers} from "redux";
import {ed,newStartDate,newEndDate,bucket,monthRent,phoneReducer,tokenReducer,nameReducer} from './EdetailsReducer';

export const rootReducer = combineReducers({
  //edetails
  ed,
  newStartDate,
  newEndDate,
  bucket,
  monthRent,
  phoneReducer,
  tokenReducer,
  nameReducer
});

