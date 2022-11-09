import './pageauth.css';
import React from 'react';
import Preloader from "../../components/common/preloader/preloader";
import {api} from "../../api";


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

  //this.setState({isLoading: true});

  onChangeLogin = (val) => {
    this.setState({login: val});
  }

  onChangePassword = (val) => {
    this.setState({password: val});
  }

  onAuth = async () => {
    this.setState({error: ``});
    this.setState({isLoading: true});
    const response = await api.post(`/login/`,
      {login: this.state.login, password: this.state.password});

    this.setState({isLoading: false});
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      window.location.replace("/");
    } else {
      if (response.status === 401) {
        this.setState({error: `Неверный логин или пароль`});
      } else {
        this.setState({error: `Неизвестная ошибка`});
      }
    }
  }

  render() {

    return (<div className='auth-page'>
        <div className='auth-form'>
          <div className='auth-block'><label className='auth-label' htmlFor='login'>Логин</label><input
            className='auth-input' type="text" id='login' value={this.state.login}
            onChange={() => this.onChangeLogin(event.target.value)}/></div>
          <div className='auth-block'><label className='auth-label' htmlFor='password'>Пароль</label><input
            className='auth-input' type="password" id='password' value={this.state.password}
            onChange={() => this.onChangePassword(event.target.value)}/></div>
          {this.state.error && <div className='error-label'>{this.state.error}</div>}
          <button
            className='auth-button'
            onClick={this.onAuth}
            disabled={this.state.isLoading}
          >
            {this.state.isLoading ? <Preloader/> : 'Вход'}
          </button>
        </div>
      </div>
    );

  }

}


export default PageAuth;