import "./monthpicker.css";






const MonthPicker = ({curMonth, changeMonth}) => {

const mnames = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];

return (
  <div className = 'month-picker'>
    <div className="arrow-3" onClick={() => changeMonth(-1)}>
      <svg className="arrow-3-icon arrow-left" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <g fill="none" stroke="#337AB7" stroke-width="1.5" stroke-linejoin="round" stroke-miterlimit="10">
          <path className="arrow-3-icon--arrow" d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
        </g>
      </svg>
    </div>
    <div className="month-label">{mnames[curMonth.getMonth()]} {curMonth.getFullYear()}</div>
    <div className="arrow-3" onClick={() => changeMonth(1)}>
      <svg className="arrow-3-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <g fill="none" stroke="#337AB7" stroke-width="1.5" stroke-linejoin="round" stroke-miterlimit="10">
          <path className="arrow-3-icon--arrow" d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
        </g>
      </svg>
    </div>
  </div>


);


};



export default MonthPicker;



