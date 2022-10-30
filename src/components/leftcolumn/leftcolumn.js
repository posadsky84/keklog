import MonthPicker from "./monthpicker/monthpicker";
import _ from "lodash";


const LeftColumn = ({curDdate, changeCurDdate, ddates, curMonth, changeMonth}) => {

  let skipDays = curMonth.getDay();
  skipDays === 0 ? skipDays = 6 : skipDays--;


  const ddlist = [];
  const dd = new Date(curMonth);
  while (dd.getMonth() === curMonth.getMonth()) {
    ddlist.push(new Date(dd));
    dd.setDate(dd.getDate() + 1);
  }



  return (

    <div>
      <MonthPicker curMonth={curMonth} changeMonth={changeMonth}/>
      <div className='smart-calendar'>
        {_.times(skipDays, () => <div className='ddate'></div>)}
        {ddlist.map((ddate) => {




          let findDdate = ddates[ddate.toISOString()];
          let findScore = findDdate && ddates[ddate.toISOString()].score;

          return +ddate === +curDdate
            ? <div className={`ddate curDdate ${findDdate ? `exist-ddate` : ``}`}>{ddate.getDate()}</div>
            : <div className={`ddate ${findDdate ? `exist-ddate` : ``}`}
                   onClick={() => changeCurDdate(ddate)}>{ddate.getDate()}</div>;
        })
        }
      </div>
    </div>
  )

}

export default LeftColumn;