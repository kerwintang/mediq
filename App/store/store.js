import { createStore, combineReducers, applyMiddleware } from 'redux'
import rootReducer from ".";

let store = createStore(rootReducer);

export default store;