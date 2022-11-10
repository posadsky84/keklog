import axios from 'axios';
import _ from 'lodash';

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
