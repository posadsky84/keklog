import React from 'react';


import './leftcolumn.css';
import {
  changeCurDdateActionCreator,
  changeMonthActionCreator,
  setDdatesActionCreator
} from "../../redux/leftcolumn-reducer";
import {connect} from "react-redux";
import LeftColumn from "./leftcolumn";
import {api} from "../../api";

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


  componentDidMount() {
    this.loadDdates();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.curMonth !== this.props.curMonth) {
      this.loadDdates();
    }
  }

  loadDdates = async () => {

    const lastMonthDay = new Date(this.props.curMonth.getFullYear(), this.props.curMonth.getMonth()+1, 0);

    const ddateb = `${new Date(this.props.curMonth).getFullYear()}.${new Date(this.props.curMonth).getMonth()+1}.${new Date(this.props.curMonth).getDate()}`;
    const ddatee = `${new Date(lastMonthDay).getFullYear()}.${new Date(lastMonthDay).getMonth()+1}.${new Date(lastMonthDay).getDate()}`;

    const responseDdates = await api.get(`/ddates?ddateb=${ddateb}&ddatee=${ddatee}`);

    this.props.setDdates(responseDdates.data.reduce((res, item) => ({...res, [item.monthday]: {score: item.score}}), {}));
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

