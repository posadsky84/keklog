const CHANGE_CURDDATE = `CHANGE_CURDDATE`;
const SET_DDATES = `SET_DDATES`;
const CHANGE_MONTH = `CHANGE_MONTH`;
const SET_DAY_ACTIVE = `SET_DAY_ACTIVE`;
const SET_DAY_EMPTY = `SET_DAY_EMPTY`;

export const changeCurDdateActionCreator = ddate => ({ type: CHANGE_CURDDATE, ddate });
export const setDdatesActionCreator = ddates => ({ type: SET_DDATES, ddates });
export const changeMonthActionCreator = diff => ({ type: CHANGE_MONTH, diff });
export const setDayActiveActionCreator = day => ({ type: SET_DAY_ACTIVE, day });
export const setDayEmptyActionCreator = day => ({ type: SET_DAY_EMPTY, day });

const initialState = {
  curDdate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0),
  ddates: [],
  curMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0),
};

const LeftColumnReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURDDATE:
      return {
        ...state,
        curDdate: action.ddate,
      };
    case SET_DDATES:
      return {
        ...state,
        ddates: action.ddates,
      };
    case CHANGE_MONTH:
      return {
        ...state,
        curMonth: new Date(state.curMonth.setMonth(state.curMonth.getMonth() + action.diff)),
      };
    case SET_DAY_ACTIVE:
      return {
        ...state,
        ddates: { ...state.ddates, [action.day]: { score: 0 } },
      };
    case SET_DAY_EMPTY:
      return {
        ...state,
        ddates: { ...state.ddates, [action.day]: null },
      };
    default:
      return state;
  }
};

export default LeftColumnReducer;
