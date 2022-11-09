import {
  setTasks,
  toggleTask,
  setScore,
  getCategories,
  setCategory,
  addTask,
  deleteTask,
  setDuration
} from "../../redux/tasklist-reducer";
import Tasklist from "./tasklist";
import {connect} from "react-redux";
import React from "react";
import {api} from "../../api";
import {setDayActiveActionCreator, setDayEmptyActionCreator} from "../../redux/leftcolumn-reducer";

let mapStateToProps = (state) => {
  return {
    curDdate: state.LeftColumn.curDdate,
    tasks: state.Tasklist.Tasks,
    categories: state.Tasklist.Categories,
  }
};


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
    const responseTasks = await api.get(`/tasks?ddate=${this.props.curDdate.getFullYear()}.${this.props.curDdate.getMonth() + 1}.${this.props.curDdate.getDate()}`);
    this.props.setTasks(responseTasks.data);

    const responseCategories = await api.get(`/category`);
    this.props.getCategories(responseCategories.data);


  }

  toggleTask = (id, value) => {

    api.put(`/taskchecked/${id}`, {checked: value})
      .then(response => {
        if (response.status === 200) {
          this.props.toggleTask(id, value);
        }
      });
  }

  setScore = (id, score) => {

    api.put(`/taskscore/${id}`, {score: score})
      .then(response => {
        if (response.status === 200) {
          this.props.setScore(id, score);
        }
      });
  }

  setDuration = (id, duration) => {

    api.put(`/taskduration/${id}`, {duration: duration})
      .then(response => {
        if (response.status === 200) {
          this.props.setDuration(id, duration);
        }
      });
  }


  setCategory = async (id, category) => {

    const response = await api.put(`/taskcategory/${id}`, {category: category});
    if (response.status === 200) {
      this.props.setCategory(id, category);
    }
  }

  postNewTask = async (ddate, name) => {
    const response = await api.post(`/newtask/`,
      {ddate: ddate.getFullYear() + '.' + (ddate.getMonth() + 1) + '.' + ddate.getDate(), name});

    if (response.status === 200) {
      this.props.addTask(response.data);
      this.props.setDayActiveActionCreator(ddate.getDate());
    }
  }

  deleteTask = async (id) => {
    const response = await api.delete(`/deletetask/${id}`);

    if (response.status === 200) {
      this.props.deleteTask(id);
      debugger;
      if (this.props.tasks.length === 1) {
        this.props.setDayEmptyActionCreator(this.props.curDdate.getDate());
      }
    }

  }


  render() {

    //{this.props.isFetching ? <Preloader /> : null}     можно потом добавить прелоадер

    return (

      <Tasklist
        className={this.props.className}
        curDdate={this.props.curDdate}
        tasks={this.props.tasks}
        categories={this.props.categories}
        toggleTask={this.toggleTask}
        setScore={this.setScore}
        setDuration={this.setDuration}
        setCategory={this.setCategory}
        postNewTask={this.postNewTask}
        deleteTask={this.deleteTask}
      />
    );

  }

}

export default connect(mapStateToProps,
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
    setDayEmptyActionCreator
  })(tasklistAPI);


