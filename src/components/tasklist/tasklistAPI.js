import { connect } from 'react-redux';
import React from 'react';
import {
  setTasks,
  toggleTask,
  setScore,
  getCategories,
  setCategory,
  addTask,
  deleteTask,
  setDuration,
} from '../../redux/tasklist-reducer';
import Tasklist from './tasklist';
import { api } from '../../api';
import { setDayActiveActionCreator, setDayEmptyActionCreator } from '../../redux/leftcolumn-reducer';
import { throwIfNetworkError } from '../../helper';

const mapStateToProps = state => ({
  curDdate: state.LeftColumn.curDdate,
  tasks: state.Tasklist.Tasks,
  categories: state.Tasklist.Categories,
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

  loadtasks = async () => {
    // eslint-disable-next-line max-len
    try {
      const responseTasks = await api.get(`/tasks?ddate=${this.props.curDdate.getFullYear()}.${this.props.curDdate.getMonth() + 1}.${this.props.curDdate.getDate()}`);
      this.props.setTasks(responseTasks.data);
    } catch (error) {
      throwIfNetworkError(error);
    }

    try {
      const responseCategories = await api.get(`/category`);
      this.props.getCategories(responseCategories.data);
    } catch (error) {
      throwIfNetworkError(error);
    }
  };

  toggleTask = async (id, value) => {
    try {
      const response = await api.put(`/taskchecked/${id}`, { checked: value });
      if (response.status === 200) {
        this.props.toggleTask(id, value);
      }
    } catch (error) {
      throwIfNetworkError(error);
    }
  };

  setScore = async (id, score) => {
    try {
      const response = await api.put(`/taskscore/${id}`, { score });
      if (response.status === 200) {
        this.props.setScore(id, score);
      }
    } catch (error) {
      throwIfNetworkError(error);
    }
  };

  setDuration = async (id, duration) => {
    try {
      const response = await api.put(`/taskduration/${id}`, { duration });
      if (response.status === 200) {
        this.props.setDuration(id, duration);
      }
    } catch (error) {
      throwIfNetworkError(error);
    }
  };

  setCategory = async (id, category) => {
    try {
      const response = await api.put(`/taskcategory/${id}`, { category });
      if (response.status === 200) {
        this.props.setCategory(id, category);
      }
    } catch (error) {
      throwIfNetworkError(error);
    }
  };

  postNewTask = async (ddate, name) => {
    try {
      const response = await api.post(
        `/newtask/`,
        { ddate: `${ddate.getFullYear()}.${ddate.getMonth() + 1}.${ddate.getDate()}`, name },
      );
      if (response.status === 200) {
        this.props.addTask(response.data);
        this.props.setDayActiveActionCreator(ddate.getDate());
      }
    } catch (error) {
      throwIfNetworkError(error);
    }
  };

  deleteTask = async id => {
    try {
      const response = await api.delete(`/deletetask/${id}`);

      if (response.status === 200) {
        this.props.deleteTask(id);
        if (this.props.tasks.length === 1) {
          this.props.setDayEmptyActionCreator(this.props.curDdate.getDate());
        }
      }
    } catch (error) {
      throwIfNetworkError(error);
    }
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
      />
    );
  }
}

export default connect(
  mapStateToProps,
  {
    toggleTask,
    setTasks,
    setScore,
    getCategories,
    setCategory,
    addTask,
    deleteTask,
    setDuration,
    setDayActiveActionCreator,
    setDayEmptyActionCreator,
  },
)(tasklistAPI);
