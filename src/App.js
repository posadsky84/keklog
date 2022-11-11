import { NotificationContainer } from 'react-notifications';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import PageAuth from './pages/pageauth/pageauth';
import Footer from './components/footer/footer';
import { isAuth } from './helper';
import PageCalendar from './pages/pagecalendar/pagecalendar';
import PageAbout from './pages/pageabout/pageabout';
import 'react-notifications/lib/notifications.css';
import PageAdmin from "./pages/pageadmin/pageadmin";

const App = () => {
  const isLoggedIn = isAuth();
  return (
    <div className="app-wrapper">
      <Header isLoggedIn={isLoggedIn} />
      <NotificationContainer />
      {isLoggedIn
        ? (
          <Routes>
            <Route element={<PageCalendar />} path="/" />
            <Route element={<PageAdmin />} path="/admin" />
            <Route element={<PageAbout />} path="/about" />
          </Routes>
        ) : (
          <PageAuth />

        )}
      <Footer />
    </div>
  );
};

export default App;
