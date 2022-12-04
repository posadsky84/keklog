import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import LeftColumnReducer from './leftcolumn-reducer';
import TasklistReducer from './tasklist-reducer';

const reducers = combineReducers({
  LeftColumn: LeftColumnReducer,
  Tasklist: TasklistReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
