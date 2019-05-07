import { combineReducers } from "redux";
import contacts from "./contacts";
import {
  experiencesReducer as experiences,
  tagReducer as tags,
  tagItemReducer as tagItems
} from "./profile";

const rootReducer = combineReducers({
  contacts,
  experiences,
  tags,
  tagItems
});

export default rootReducer;
