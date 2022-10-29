

const LeftColumn = ({curDdate, changeCurDdate, ddates}) => {

  const curMonth = 9; //переделать на выбор
  const ddlist = [];
  const dd = new Date(2022, curMonth, 1); //откуда-то взять год
  while (dd.getMonth() === curMonth) {
    ddlist.push(new Date(dd));
    dd.setDate(dd.getDate() + 1);
  }


  return (



  <div className='smart-calendar'>
    {ddlist.map((ddate) => {

      let findScore = ddates[ddate.toISOString()] && ddates[ddate.toISOString()].score;

      return +ddate === +curDdate
        ? <div className='ddate curDdate'>{ddate.getDate()}</div>
        : <div className='ddate'
               onClick={() => changeCurDdate(ddate)}>{ddate.getDate()}.... {findScore}</div>;
    })
    }
  </div>
)

}

export default LeftColumn;