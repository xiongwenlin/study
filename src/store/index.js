import {createStore, applyMiddleware} from 'redux';
// import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

// const createStoreWithMiddleware = applyMiddleware(createStore);
// const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export default function configureStore(initialState = {}) {
  const store =  createStore(rootReducer, initialState);
  return store
}
