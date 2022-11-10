import React from 'react';

import './leftcolumn.css';
import { connect } from 'react-redux';
import {
  changeCurDdateActionCreator,
  changeMonthActionCreator,
  setDdatesActionCreator,
} from '../../redux/leftcolumn-reducer';
import LeftColumn from './leftcolumn';
import { api } from '../../api';

const mapStateToProps = state => ({
  ddates: state.LeftColumn.ddates,
  curDdate: state.LeftColumn.curDdate,
  curMonth: state.LeftColumn.curMonth,
});

// избавиться от процедуры когда все заработает
const mapDispatchToProps = dispatch => ({
  changeCurDdate: ddate => {
    dispatch(changeCurDdateActionCreator(ddate));
  },
  setDdates: ddates => {
    dispatch(setDdatesActionCreator(ddates));
  },
  changeMonth: diff => {
    dispatch(changeMonthActionCreator(diff));
  },
});

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
    const lastMonthDay = new Date(this.props.curMonth.getFullYear(), this.props.curMonth.getMonth() + 1, 0);

    // eslint-disable-next-line max-len
    const ddateb = `${new Date(this.props.curMonth).getFullYear()}.${new Date(this.props.curMonth).getMonth() + 1}.${new Date(this.props.curMonth).getDate()}`;
    // eslint-disable-next-line max-len
    const ddatee = `${new Date(lastMonthDay).getFullYear()}.${new Date(lastMonthDay).getMonth() + 1}.${new Date(lastMonthDay).getDate()}`;

    const responseDdates = await api.get(`/ddates?ddateb=${ddateb}&ddatee=${ddatee}`);

    this.props.setDdates(responseDdates.data.reduce((res, item) => ({
      ...res,
      [item.monthday]: { score: item.score },
    }), {}));
  };

  render() {
    return (
      <LeftColumn
        changeCurDdate={this.props.changeCurDdate}
        changeMonth={this.props.changeMonth}
        className={this.props.className}
        curDdate={this.props.curDdate}
        curMonth={this.props.curMonth}
        ddates={this.props.ddates}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftColumnAPI);
