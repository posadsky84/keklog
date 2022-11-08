import './pageauth.css';



const PageAuth = () => {


return (<div className='auth-page'>
    <div className='auth-form'>
      <div className='auth-block'><label className='auth-label' htmlFor='login'>Логин</label><input className='auth-input' type="text" id='login'/></div>
      <div className='auth-block'><label className='auth-label' htmlFor='password'>Пароль</label><input className='auth-input' type="password" id='password'/></div>
      <button className='auth-button'>Вход</button>
    </div>
  </div>
);


}


export default PageAuth;