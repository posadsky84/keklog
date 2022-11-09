import './App.css';
import Tasklist from "./components/tasklist/tasklistAPI";
import Header from "./components/header/header";
import Leftcolumn from "./components/leftcolumn/leftcolumnAPI";
import {Route, Routes} from "react-router-dom";
import PageAuth from "./pages/pageauth/pageauth";
import Footer from "./components/footer/footer";
import {isAuth} from "./helper";
import PageCalendar from "./pages/pagecalendar/pagecalendar";
import PageAbout from "./pages/pageabout/pageabout";


const App = () => {

  const isLoggedIn = isAuth();

  return (
    <div className="app-wrapper">
      <Header isLoggedIn={isLoggedIn}/>
      {isLoggedIn ?
        (
          <Routes>
            <Route path='/' element={<PageCalendar />}/>
            <Route path='/admin' element={<div>admin</div>}/>
            <Route path='/about' element={<PageAbout />}/>
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
