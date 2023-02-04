export const GET_LOCATIONS = "GET_LOCATIONS";
const SET_LOCATIONS = "SET_LOCATIONS";
export const setLocations = (locations) => ({ type: SET_LOCATIONS, locations });

const initState = {
  locations: [],
}

const allReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return {...state, locations: action.locations}
    default:
      return state;

  }

};

export default allReducer;
