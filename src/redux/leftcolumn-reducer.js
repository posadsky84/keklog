

const CHANGE_CURDDATE = 'CHANGE_CURDDATE';
const SET_DDATES = 'SET_DDATES';
const CHANGE_MONTH = 'CHANGE_MONTH';

export const changeCurDdateActionCreator = (ddate) => ({type: CHANGE_CURDDATE, ddate: ddate});
export const setDdatesActionCreator = (ddates) => ({type: SET_DDATES, ddates});
export const changeMonthActionCreator = (diff) => ({type: CHANGE_MONTH, diff});





const initialState = {
  curDdate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0),
  ddates:  [],
  curMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0)
};

const LeftColumnReducer = (state = initialState, action) => {

  switch (action.type) {
    case CHANGE_CURDDATE:   //пока не расписываем, не знаю как будет работать
      return {
        ...state,
        curDdate: action.ddate
      };
    case SET_DDATES:
      return {
        ...state,
        ddates: action.ddates
      };
    case CHANGE_MONTH:
      return {
        ...state,
        curMonth: new Date(state.curMonth.setMonth(state.curMonth.getMonth() + action.diff)),
      };
    default:
      return state;
  }



}

export default LeftColumnReducer;