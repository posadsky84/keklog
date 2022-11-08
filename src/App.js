import './App.css';
import Tasklist from "./components/tasklist/tasklistAPI";
import Header from "./components/header/header";
import Leftcolumn from "./components/leftcolumn/leftcolumnAPI";
import {Route, Routes} from "react-router-dom";
import PageAuth from "./components/pageauth/pageauth";
import Footer from "./components/footer/footer";
import {isAuth} from "./helper";


const App = () => {

  const isLoggedIn = isAuth();

  return (
    <div className="app-wrapper">
      <Header isLoggedIn={isLoggedIn}/>
      {isLoggedIn ?
        (
          <Routes>
            <Route path='/' element={<><Leftcolumn/><Tasklist/></>}/>
            <Route path='/admin' element={<div>admin</div>}/>
            <Route path='/reports' element={<div>reports</div>}/>
          </Routes>
        ) : (
          <PageAuth/>

        )

      }
      <Footer/>
    </div>
  );
}

export default App;
