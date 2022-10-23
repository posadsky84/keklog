import {combineReducers, createStore, legacy_createStore} from "redux";
import LeftColumnReducer from "./leftcolumn-reducer";
import TasklistReducer from "./tasklist-reducer";



let reducers = combineReducers({
  LeftColumn: LeftColumnReducer,
  Tasklist: TasklistReducer,
});

let store = createStore(reducers);

export default store;
