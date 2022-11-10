import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import PageAuth from './pages/pageauth/pageauth';
import Footer from './components/footer/footer';
import { isAuth } from './helper';
import PageCalendar from './pages/pagecalendar/pagecalendar';
import PageAbout from './pages/pageabout/pageabout';

function App() {
  const isLoggedIn = isAuth();

  return (
    <div className="app-wrapper">
      <Header isLoggedIn={isLoggedIn} />
      {isLoggedIn
        ? (
          <Routes>
            <Route element={<PageCalendar />} path="/" />
            <Route element={<div>admin</div>} path="/admin" />
            <Route element={<PageAbout />} path="/about" />
          </Routes>
        ) : (
          <PageAuth />

        )}
      <Footer />
    </div>
  );
}

export default App;
