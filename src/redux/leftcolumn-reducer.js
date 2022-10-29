

const CHANGE_CURDDATE = 'CHANGE_CURDDATE';
const SET_DDATES = 'SET_DDATES';

export const changeCurDdateActionCreator = (ddate) => ({type: CHANGE_CURDDATE, ddate: ddate});
export const setDdatesActionCreator = (ddates) => ({type: SET_DDATES, ddates});





const initialState = {
  curDdate: new Date('2022-10-22'),
  ddates: []
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
    default:
      return state;
  }



}

export default LeftColumnReducer;