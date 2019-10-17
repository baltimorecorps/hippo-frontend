import {combineReducers} from "redux";
import contacts from "./contacts";
import {
  experiencesReducer as experiences,
  tagReducer as tags,
  tagItemReducer as tagItems,
} from "./profile";
import resume from "./resume";

const rootReducer = combineReducers({
  contacts,
  experiences,
  resume,
  tags,
  tagItems,
});

export default rootReducer;
