import { API } from "../api";

const CHANGE_CURDDATE = `CHANGE_CURDDATE`;
const SET_DDATES = `SET_DDATES`;
const CHANGE_MONTH = `CHANGE_MONTH`;
const SET_DAY_ACTIVE = `SET_DAY_ACTIVE`;
const SET_DAY_EMPTY = `SET_DAY_EMPTY`;

export const changeCurDdate = ddate => ({ type: CHANGE_CURDDATE, ddate });
const setDdates = ddates => ({ type: SET_DDATES, ddates });
export const changeMonth = diff => ({ type: CHANGE_MONTH, diff });
export const setDayActiveActionCreator = day => ({ type: SET_DAY_ACTIVE, day });
export const setDayEmptyActionCreator = day => ({ type: SET_DAY_EMPTY, day });

export const setDdatesThunk = curMonth => async dispatch => {
  const lastMonthDay = new Date(curMonth.getFullYear(), curMonth.getMonth() + 1, 0);
  // eslint-disable-next-line max-len
  const ddateb = `${new Date(curMonth).getFullYear()}.${new Date(curMonth).getMonth() + 1}.${new Date(curMonth).getDate()}`;
  // eslint-disable-next-line max-len
  const ddatee = `${new Date(lastMonthDay).getFullYear()}.${new Date(lastMonthDay).getMonth() + 1}.${new Date(lastMonthDay).getDate()}`;
  const responseDdates = await API.getDdates(ddateb, ddatee);
  dispatch(setDdates(responseDdates.data.reduce((res, item) => ({
    ...res,
    [item.monthday]: { score: item.score },
  }), {})));
};

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
