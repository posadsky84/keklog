import React from 'react';

import './leftcolumn.css';
import {
  changeCurDdateActionCreator,
  changeMonthActionCreator,
  setDdatesActionCreator
} from "../../redux/leftcolumn-reducer";
import {connect} from "react-redux";
import LeftColumn from "./leftcolumn";
import axios from "axios";

let mapStateToProps = (state) => {
  return {
    ddates: state.LeftColumn.ddates,
    curDdate: state.LeftColumn.curDdate,
    curMonth: state.LeftColumn.curMonth,
  }
};

//избавиться от процедуры когда все заработает
let mapDispatchToProps = (dispatch) => {
  return {
    changeCurDdate: (ddate) => {dispatch(changeCurDdateActionCreator(ddate))},
    setDdates: (ddates) => {dispatch(setDdatesActionCreator(ddates))},
    changeMonth: (diff) => {dispatch(changeMonthActionCreator(diff))}
  }
};





class LeftColumnAPI extends React.Component {



  loadDdates = async () => {

    let ddateb = '20221001';
    let ddatee = '20221031';

    const responseDdates = await axios.get(`http://localhost:4000/ddates?ddateb=${ddateb}&ddatee=${ddatee}`);
    this.props.setDdates(responseDdates.data.reduce((res, item) => ({...res, [item.ddate]: {score: item.score}}), {}));



  }

  componentDidMount() {
    this.loadDdates();
  }


  render() {

    return <LeftColumn curDdate={this.props.curDdate}
                       changeCurDdate={this.props.changeCurDdate}
                       ddates={this.props.ddates}
                       curMonth={this.props.curMonth}
                       changeMonth={this.props.changeMonth}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftColumnAPI);

