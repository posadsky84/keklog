const TOGGLE_TASK = `CHECK_TASK`;
const SET_TASKS = `SET_TASKS`;
const SET_SCORE = `SET_SCORE`;
const GET_CATEGORIES = `GET_CATEGORIES`;
const SET_CATEGORY = `SET_CATEGORY`;
const ADD_TASK = `ADD_TASK`;
const DELETE_TASK = `DELETE_TASK`;
const SET_DURATION = `SET_DURATION`;

export const toggleTask = (id, value) => ({ type: TOGGLE_TASK, id, value });
export const setTasks = tasks => ({ type: SET_TASKS, tasks });
export const setScore = (id, score) => ({ type: SET_SCORE, id, score });
export const getCategories = categories => ({ type: GET_CATEGORIES, categories });
export const setCategory = (id, category) => ({ type: SET_CATEGORY, id, category });
export const addTask = task => ({ type: ADD_TASK, task });
export const deleteTask = id => ({ type: DELETE_TASK, id });
export const setDuration = (id, duration) => ({ type: SET_DURATION, duration });

const initialState = {
  Tasks: [],
  Categories: [],
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
    default:
      return state;
  }
};

export default TasklistReducer;
