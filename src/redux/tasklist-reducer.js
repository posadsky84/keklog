

const TOGGLE_TASK = 'CHECK_TASK';
const SET_TASKS = 'SET_TASKS';
const SET_SCORE = 'SET_SCORE';

export const toggleTask = (id, value) => ({type: TOGGLE_TASK, id: id, value: value});
export const setTasks = (tasks) => ({type: SET_TASKS, tasks: tasks});
export const setScore = (id, score) => ({type: SET_SCORE, id: id, score: score});




const initialState = {

  Tasks:
    []
};

const TasklistReducer = (state = initialState, action) => {



  switch (action.type) {
    case TOGGLE_TASK:
      return {
        ...state,
        Tasks: state.Tasks.map(u => u.id === action.id ? {...u, checked: action.value} : u)
      };
     case SET_TASKS:
      return {
        ...state,
        Tasks: action.tasks
      };
    case SET_SCORE:
      return {
        ...state,
        Tasks: state.Tasks.map(u => u.id === action.id ? {...u, score: action.score} : u)
      };
    default:
      return state;
  }




}

export default TasklistReducer;