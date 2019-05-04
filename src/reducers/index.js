import { combineReducers } from 'redux'
import contacts from './contacts'
import profile from './profile'

const rootReducer = combineReducers({
  contacts,
  profile,
})

export default rootReducer;
