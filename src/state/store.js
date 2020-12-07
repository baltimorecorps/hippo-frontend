import {configureStore,getDefaultMiddleware} from 'redux-starter-kit';
import rootReducer from 'state';

const middleware = []

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middleware.push(logger);

}
const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), ...middleware]
});

export default store