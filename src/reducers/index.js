import { combineReducers } from 'redux'
import contacts from './contacts'
import experiences from './profile'

const rootReducer = combineReducers({
  contacts,
  experiences,
})

export default rootReducer;
