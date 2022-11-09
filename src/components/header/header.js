import React from 'react';
import './header.css';
import {NavLink} from "react-router-dom";
import {logout} from "../../helper";


const Header = ({isLoggedIn}) => {



  return <header className='header'>
    <div className='logo-box'>
      <div className='logo-box-1'>КЕКЛОГ</div>
      <div className='logo-box-2'>мой трекер задач родом из Бишкека</div>
    </div>
    {isLoggedIn &&
      (<>
        <nav className='nav-header'>
          <NavLink
            className={({isActive}) => (isActive ? 'link-header link-header-active' : 'link-header')}
            to='/'
          >
            Календарь
          </NavLink>
          <NavLink
            className={({isActive}) => (isActive ? 'link-header link-header-active' : 'link-header')}
            to='/admin'
          >
            Администрирование
          </NavLink>
          <NavLink
            className={({isActive}) => (isActive ? 'link-header link-header-active' : 'link-header')}
            to='/about'
          >
            Обо мне
          </NavLink>
        </nav>
        <div className='link-header logout' onClick={logout}>Выход</div>
      </>)}
  </header>;
}

export default Header;


