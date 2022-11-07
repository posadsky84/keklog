import './pageauth.css';



const PageAuth = () => {


return (<div className='auth-page'>
    <div className='auth-form'>
      <div className='auth-block'><label htmlFor='login'>Логин</label><input type="text" id='login'/></div>
      <div className='auth-block'><label htmlFor='password'>Пароль</label><input type="password" id='password'/></div>
      <button>ВХОД</button>
    </div>
  </div>
);


}


export default PageAuth;