import './pageauth.css';
import React from 'react';
import Preloader from '../../components/common/preloader/preloader';
import { API } from '../../api';
import { throwIfNetworkError } from '../../helper';

class PageAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      login: null,
      password: null,
      error: ``,
    };
  }

  onChangeLogin = val => {
    this.setState({ login: val });
  };

  onChangePassword = val => {
    this.setState({ password: val });
  };

  onAuth = async () => {
    this.setState({ error: `` });
    if (!this.state.login || !this.state.password) {
      this.setState({ error: `Нужно ввести логин и пароль` });
      return;
    }
    this.setState({ isLoading: true });

    try {
      const response = await API.auth(this.state.login, this.state.password);
      this.setState({ isLoading: false });
      if (response.status === 200) {
        localStorage.setItem(`token`, response.data.token);
        window.location.replace(`/`);
      } else if (response.status === 401) {
        this.setState({ error: `Неверный логин или пароль` });
      } else {
        this.setState({ error: `Неизвестная ошибка` });
      }
    } catch (error) {
      this.setState({ error: `` });
      this.setState({ isLoading: false });
      throwIfNetworkError(error);
    }
  };

  render() {
    return (
      <div className="auth-page">
        <div className="auth-form">
          <div className="auth-block">
            <label className="auth-label" htmlFor="login">Логин</label>
            <input
              className="auth-input"
              id="login"
              onChange={event => this.onChangeLogin(event.target.value)}
              onKeyDown={e => {
                if (e.key === `Enter`) {
                  this.onAuth();
                }
              }}
              type="text"
              value={this.state.login}
            />
          </div>
          <div className="auth-block">
            <label className="auth-label" htmlFor="password">Пароль</label>
            <input
              className="auth-input"
              id="password"
              onChange={event => this.onChangePassword(event.target.value)}
              onKeyDown={e => {
                if (e.key === `Enter`) {
                  this.onAuth();
                }
              }}
              type="password"
              value={this.state.password}
            />
          </div>
          {this.state.error && <div className="error-label">{this.state.error}</div>}
          <button
            className="auth-button"
            disabled={this.state.isLoading}
            onClick={this.onAuth}
            type="button"
          >
            {this.state.isLoading ? <Preloader /> : `Вход`}
          </button>
        </div>
      </div>
    );
  }
}

export default PageAuth;
