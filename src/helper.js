import _ from 'lodash';
import { NotificationManager } from 'react-notifications';

export const isAuth = () => {
  const token = localStorage.getItem(`token`);
  try {
    const data = JSON.parse(atob(token.split(`.`)[1]));
    return data?.exp * 1000 > +(new Date()); // eslint-disable-line no-unsafe-optional-chaining
  } catch (e) {
    return false;
  }
};

export const logout = () => {
  localStorage.clear();
  window.location.replace(`/`);
};

export const throwIfNetworkError = data => {
  if (_.includes(data?.message, `Network Error`)) {
    NotificationManager.error(`Network Error`, data?.message, 2000);
    throw new Error(`Network Error`);
  }
};
