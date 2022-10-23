

const CHANGE_CURDDATE = 'CHANGE_CURDDATE';

export const changeCurDdateActionCreator = (ddate) => ({type: CHANGE_CURDDATE, ddate: ddate});





const initialState = {
  curDdate: new Date('2022-10-22'),
  DaysData:
    [
      {ddate: new Date('2022-10-22')},
      {ddate: new Date('2022-10-21')},
      {ddate: new Date('2022-10-20')},
    ]
};

const LeftColumnReducer = (state = initialState, action) => {

  switch (action.type) {
    case CHANGE_CURDDATE:   //пока не расписываем, не знаю как будет работать
      return {
        ...state,
        curDdate: action.ddate
      };
    default:
      return state;
  }




}

export default LeftColumnReducer;