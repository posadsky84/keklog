

const TOGGLE_TASK = 'CHECK_TASK';
const SET_TASKS = 'SET_TASKS';

export const toggleTask = (id) => ({type: TOGGLE_TASK, id: id});
export const setTasks = (tasks) => ({type: SET_TASKS, tasks: tasks});




const initialState = {

  Tasks:
    []
};

const TasklistReducer = (state = initialState, action) => {

  debugger;

  switch (action.type) {
    case TOGGLE_TASK:
      return {
        ...state,
        Tasks: state.Tasks.map(u => u.id === action.id ? {...u, checked: !u.checked} : u)
      };
     case SET_TASKS:
      return {
        ...state,
        Tasks: action.tasks
      };
    default:
      return state;
  }




}

export default TasklistReducer;