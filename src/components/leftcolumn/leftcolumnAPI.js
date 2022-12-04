import React from 'react';

import './leftcolumn.css';
import { connect } from 'react-redux';
import {
  changeCurDdate,
  changeMonth,
  setDdatesThunk,
} from '../../redux/leftcolumn-reducer';
import LeftColumn from './leftcolumn';

const mapStateToProps = state => ({
  ddates: state.LeftColumn.ddates,
  curDdate: state.LeftColumn.curDdate,
  curMonth: state.LeftColumn.curMonth,
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
    this.props.setDdatesThunk(this.props.curMonth);
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

export default connect(mapStateToProps,
  {
    setDdatesThunk,
    changeCurDdate,
    changeMonth,
  },
)(LeftColumnAPI);
