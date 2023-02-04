import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import LeftColumnReducer from './leftcolumn-reducer';
import TasklistReducer from './tasklist-reducer';
import createSagaMiddleware from 'redux-saga';
import allReducer from './all-reducer';
import rootSaga from './sagas';

const reducers = combineReducers({
  LeftColumn: LeftColumnReducer,
  Tasklist: TasklistReducer,
  all: allReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(thunkMiddleware, sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
