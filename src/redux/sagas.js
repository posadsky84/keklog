import { put, takeEvery, all } from 'redux-saga/effects';
import { GET_LOCATIONS, setLocations } from './all-reducer';
import { API as api } from '../api';
import { GET_LOCATION, setLocation } from './tasklist-reducer';

function* workerGetLocations() {
  const locations = yield api.getLocations().then(response => response.data);
  yield put(setLocations(locations));
};

function* watcherGetLocations() {
  yield takeEvery(GET_LOCATIONS, workerGetLocations);
};

function* workerGetLoc(action) {
  const loc = yield api.getLocation(action.ddate).then(response => response.data[0].location);
  yield put(setLocation(loc));
};

function* watcherGetLoc() {
  yield takeEvery(GET_LOCATION, workerGetLoc);
};

export default function* rootSaga() {
  yield all([
    watcherGetLocations(),
    watcherGetLoc(),
  ])
};
