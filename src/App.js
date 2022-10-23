
import './App.css';
import Tasklist from "./components/tasklist/tasklistAPI";
import Header from "./components/header/header";
import Leftcolumn from "./components/leftcolumn/leftcolumn";

const App = () => {
  return (
    <div className="app-wrapper">
       <Header />
       <Leftcolumn />
       <Tasklist />
    </div>
  );
}

export default App;
