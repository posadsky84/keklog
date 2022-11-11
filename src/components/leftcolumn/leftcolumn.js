import _ from 'lodash';
import MonthPicker from './monthpicker/monthpicker';

const LeftColumn = ({
  className, curDdate, changeCurDdate, ddates, curMonth, changeMonth,
}) => {
  let skipDays = curMonth.getDay();
  if (skipDays === 0) {
    skipDays = 6;
  } else {
    skipDays -= 1;
  }

  const ddlist = [];
  const dd = new Date(curMonth);
  while (dd.getMonth() === curMonth.getMonth()) {
    ddlist.push(new Date(dd));
    dd.setDate(dd.getDate() + 1);
  }

  return (

    <div className={className}>
      <MonthPicker changeMonth={changeMonth} curMonth={curMonth} />
      <div className="smart-calendar">
        {_.times(skipDays, () => <div className="ddate" />)}
        {ddlist.map(ddate => {
          const findDdate = ddates[ddate.getDate()];

          return +ddate === +curDdate
            ? <div className={`ddate curDdate ${findDdate ? `exist-ddate` : ``}`} key={ddate}>{ddate.getDate()}</div>
            : (
              <div
                className={`ddate ${findDdate ? `exist-ddate` : ``}`}
                key={ddate}
                onClick={() => changeCurDdate(ddate)}
              >
                {ddate.getDate()}
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default LeftColumn;
