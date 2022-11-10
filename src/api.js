import axios from 'axios';
import _ from 'lodash';
import { NotificationManager } from 'react-notifications';
import { logout } from './helper';

export const api = axios.create(
  {
    baseURL: `http://keklog.fun:4000`,
    validateStatus: status => (status >= 200 && status < 500),
    timeout: 15000,
  },
);

api.interceptors.request.use(req => {
  if (!_.includes(req.url, `/login`)) {
    const token = localStorage.getItem(`token`);
    req.headers.Authorization = `${token}`;
  }
  return req;
});

api.interceptors.response.use(res => {
  if (res.status === 401 && !_.includes(res.config.url, `/login`)) {
    logout();
  } else if (res.status !== 200 && !_.includes(res.config.url, `/login`)) {
    NotificationManager.error(res.status, res.statusText, 2000);
  }

  return res;
});
