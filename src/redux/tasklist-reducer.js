import { API } from '../api';
import { setDayActiveActionCreator, setDayEmptyActionCreator } from './leftcolumn-reducer';

const TOGGLE_TASK = `CHECK_TASK`;
const SET_TASKS = `SET_TASKS`;
const SET_SCORE = `SET_SCORE`;
const GET_CATEGORIES = `GET_CATEGORIES`;
const SET_CATEGORY = `SET_CATEGORY`;
const ADD_TASK = `ADD_TASK`;
const DELETE_TASK = `DELETE_TASK`;
const SET_DURATION = `SET_DURATION`;
export const GET_LOCATION = "GET_LOCATION";
const SET_LOCATION = "SET_LOCATION";

const toggleTask = (id, value) => ({ type: TOGGLE_TASK, id, value });
const setScore = (id, score) => ({ type: SET_SCORE, id, score });
const setCategory = (id, category) => ({ type: SET_CATEGORY, id, category });
const addTask = task => ({ type: ADD_TASK, task });
const deleteTask = id => ({ type: DELETE_TASK, id });
const setDuration = (id, duration) => ({ type: SET_DURATION, duration });

const getCategories = categories => ({ type: GET_CATEGORIES, categories });
const setTasks = tasks => ({ type: SET_TASKS, tasks });

export const setLocation = location => ({type: SET_LOCATION, location});
export const getLocation = ddate => ({type: GET_LOCATION, ddate});

export const toggleTaskThunk = (id, value) => async dispatch => {
  const response = await API.toggleTask(id, value);
  if (response.status === 200) {
    dispatch(toggleTask(id, value));
  }
};

export const setScoreThunk = (id, score) => async dispatch => {
  const response = await API.setScore(id, score);
  if (response.status === 200) {
    dispatch(setScore(id, score));
  }
};

export const setDurationThunk = (id, duration) => async dispatch => {
  const response = await API.setDuration(id, duration);
  if (response.status === 200) {
    dispatch(setDuration(id, duration));
  }
};

export const setCategoryThunk = (id, category) => async dispatch => {
  const response = await API.setCategory(id, category);
  if (response.status === 200) {
    dispatch(setCategory(id, category));
  }
};

export const postNewTaskThunk = (ddate, name) => async dispatch => {
  const response = await API.postNewTask(ddate, name);
  if (response.status === 200) {
    dispatch(addTask(response.data));
    dispatch(setDayActiveActionCreator(ddate.getDate()));
  }
};

export const deleteTaskThunk = (id, listLength, ddate) => async dispatch => {
  const response = await API.deleteTask(id);
  if (response.status === 200) {
    dispatch(deleteTask(id));
    if (listLength === 1) {
      dispatch(setDayEmptyActionCreator(ddate.getDate()));
    }
  }
};

export const setTasksThunk = curDdate => async dispatch => {
  const responseTasks = await API.getTasks(curDdate);
  if (responseTasks.status === 200) {
    dispatch(setTasks(responseTasks.data));
    const responseCategories = await API.getCategories();
    if (responseCategories.status === 200) {
      dispatch(getCategories(responseCategories.data));
    }
  }
};

const initialState = {
  Tasks: [],
  Categories: [],
  location: null,
};

const TasklistReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TASK:
      return {
        ...state,
        Tasks: state.Tasks.map(u => (u.id === action.id ? { ...u, checked: action.value } : u)),
      };
    case SET_TASKS:
      return {
        ...state,
        Tasks: action.tasks,
      };
    case SET_SCORE:
      return {
        ...state,
        Tasks: state.Tasks.map(u => (u.id === action.id ? { ...u, score: action.score } : u)),
      };
    case SET_CATEGORY:
      return {
        ...state,
        Tasks: state.Tasks.map(u => (u.id === action.id ? { ...u, category: action.category } : u)),
      };
    case GET_CATEGORIES:
      return {
        ...state,
        Categories: action.categories,
      };
    case ADD_TASK:
      return {
        ...state,
        Tasks: [...state.Tasks, action.task],
      };
    case DELETE_TASK:
      return {
        ...state,
        Tasks: state.Tasks.map(u => (u.id === action.id ? null : u)).filter(item => !!item),
      };
    case SET_DURATION:
      return {
        ...state,
        Tasks: state.Tasks.map(u => (u.id === action.id ? { ...u, duration: action.duration } : u)),
      };
    case SET_LOCATION:
      return {
        ...state,
        location: action.location,
      };
    default:
      return state;
  }
};

export default TasklistReducer;
