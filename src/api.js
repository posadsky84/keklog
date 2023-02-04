import axios from 'axios';
import _ from 'lodash';
import { NotificationManager } from 'react-notifications';
import { logout } from './helper';
import { backURL } from './misc';

const instance = axios.create(
  {
    baseURL: backURL,
    validateStatus: status => (status >= 200 && status < 500),
    timeout: 15000,
  },
);

instance.interceptors.request.use(req => {
  if (!_.includes(req.url, `/login`)) {
    const token = localStorage.getItem(`token`);
    req.headers.Authorization = `${token}`;
  }
  return req;
});

instance.interceptors.response.use(res => {
  if (res.status === 401 && !_.includes(res.config.url, `/login`)) {
    logout();
  } else if (res.status !== 200 && !_.includes(res.config.url, `/login`)) {
    NotificationManager.error(res.status, res.statusText, 2000);
  }

  return res;
});

export const API = {
  auth(login, password) {
    return instance.post(
      `/login/`,
      { login, password },
    );
  },
  getTasks(curDdate) {
    // eslint-disable-next-line max-len
    return instance.get(`/tasks?ddate=${curDdate.getFullYear()}.${curDdate.getMonth() + 1}.${curDdate.getDate()}`);
  },
  getCategories() {
    return instance.get(`/category`);
  },
  getLocations() {
    return instance.get(`/locations`);
  },
  getDdates(ddateb, ddatee) {
    return instance.get(`/ddates?ddateb=${ddateb}&ddatee=${ddatee}`);
  },
  getLocation(ddate) {
    return instance.get(`/location?ddate=${ddate}`);
  },
  toggleTask(id, checked) {
    return instance.put(`/taskchecked/${id}`, { checked })
  },
  setScore(id, score) {
    return instance.put(`/taskscore/${id}`, { score })
  },
  setDuration(id, duration) {
    return instance.put(`/taskduration/${id}`, { duration })
  },
  setCategory(id, category) {
    return instance.put(`/taskcategory/${id}`, { category })
  },
  postNewTask(ddate, name) {
    return instance.post(
      `/newtask/`,
      { ddate: `${ddate.getFullYear()}.${ddate.getMonth() + 1}.${ddate.getDate()}`, name },
    );
  },
  deleteTask(id) {
    return instance.delete(`/deletetask/${id}`);
  },

};
