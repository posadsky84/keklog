import './pagecalendar.css';
import Leftcolumn from '../../components/leftcolumn/leftcolumnAPI';
import Tasklist from '../../components/tasklist/tasklistAPI';

const PageCalendar = () => (
  <div className="page-calendar">
    <Leftcolumn className="left-column" />
    <Tasklist className="task-list-wrapper" />
  </div>
);

export default PageCalendar;
