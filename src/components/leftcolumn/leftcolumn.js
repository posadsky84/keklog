import './leftcolumn.css';
import {changeCurDdateActionCreator} from "../../redux/leftcolumn-reducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
  return {
    ddates: state.LeftColumn.DaysData,
    curDdate: state.LeftColumn.curDdate,
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    changeCurDdate: (ddate) => {dispatch(changeCurDdateActionCreator(ddate))},
  }
};





const LeftColumn = (props) => {
  return <div className='leftcolumn'>
    {props.ddates.map(({ddate}) => {
      return +ddate === +props.curDdate
        ? <div className='curDdate'>{ddate.getDate()}.{ddate.getMonth()+1}</div>
        : <div className='ddate' onClick={() => props.changeCurDdate(ddate)}>{ddate.getDate()}.{ddate.getMonth()+1}</div>;
    })
    }
  </div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftColumn);

