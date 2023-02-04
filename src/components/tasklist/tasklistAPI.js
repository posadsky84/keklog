import { connect, useDispatch } from 'react-redux';
import React from 'react';
import {
  toggleTaskThunk,
  setScoreThunk,
  setCategoryThunk,
  postNewTaskThunk,
  deleteTaskThunk,
  setDurationThunk,
  setTasksThunk,
  getLocation,
} from '../../redux/tasklist-reducer';
import Tasklist from './tasklist';

const mapStateToProps = state => ({
  curDdate: state.LeftColumn.curDdate,
  tasks: state.Tasklist.Tasks,
  categories: state.Tasklist.Categories,
  location: state.Tasklist.location,
  locations: state.all.locations,
});

class tasklistAPI extends React.Component {
  componentDidMount() {
    this.loadtasks();
  }

  componentDidUpdate(prevProps) {
    if (+prevProps.curDdate !== +this.props.curDdate) {
      this.loadtasks();
    }
  }

  loadtasks = () => {
    this.props.setTasksThunk(this.props.curDdate);
    const ddate = `${new Date(this.props.curDdate).getFullYear()}.${new Date(this.props.curDdate).getMonth() + 1}.${new Date(this.props.curDdate).getDate()}`;
    this.props.getLocation(ddate);
  };

  toggleTask = async (id, value) => {
    this.props.toggleTaskThunk(id, value);
  };

  setScore = async (id, score) => {
    this.props.setScoreThunk(id, score);
  };

  setDuration = async (id, duration) => {
    this.props.setDurationThunk(id, duration);
  };

  setCategory = async (id, category) => {
    this.props.setCategoryThunk(id, category);
  };

  postNewTask = async (ddate, name) => {
    this.props.postNewTaskThunk(ddate, name);
  };

  deleteTask = async id => {
    this.props.deleteTaskThunk(id, this.props.tasks.length, this.props.curDdate);
  };

  render() {
    return (
      <Tasklist
        categories={this.props.categories}
        className={this.props.className}
        curDdate={this.props.curDdate}
        deleteTask={this.deleteTask}
        postNewTask={this.postNewTask}
        setCategory={this.setCategory}
        setDuration={this.setDuration}
        setScore={this.setScore}
        tasks={this.props.tasks}
        toggleTask={this.toggleTask}
        location={this.props.location}
        locations={this.props.locations}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  {
    setTasksThunk,
    toggleTaskThunk,
    setScoreThunk,
    setCategoryThunk,
    postNewTaskThunk,
    deleteTaskThunk,
    setDurationThunk,
    getLocation,
  },
)(tasklistAPI);
