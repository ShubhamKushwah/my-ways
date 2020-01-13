import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import player from './player/reducer'

const configureStore = () => {
  const rootReducer = combineReducers({
    player
  });

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));
  return store;
};

export default configureStore;
