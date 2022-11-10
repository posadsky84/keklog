import './pagecalendar.css';
import Leftcolumn from '../../components/leftcolumn/leftcolumnAPI';
import Tasklist from '../../components/tasklist/tasklistAPI';

function PageCalendar() {
  return (
    <div className="page-calendar">
      <Leftcolumn className="left-column" />
      <Tasklist className="task-list-wrapper" />
    </div>
  );
}

export default PageCalendar;
