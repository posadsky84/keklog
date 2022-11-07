import {
  setTasks,
  toggleTask,
  setScore,
  getCategories,
  setCategory,
  addTask,
  deleteTask, setDuration
} from "../../redux/tasklist-reducer";
import Tasklist from "./tasklist";
import {connect} from "react-redux";
import React from "react";
import axios from "axios";

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
    const responseTasks = await axios.get(`http://localhost:4000/tasks?ddate=${this.props.curDdate.getFullYear()}.${this.props.curDdate.getMonth() + 1}.${this.props.curDdate.getDate()}`);
    this.props.setTasks(responseTasks.data);

    const responseCategories = await axios.get(`http://localhost:4000/category`);
    this.props.getCategories(responseCategories.data);


  }

  toggleTask = (id, value) => {

    axios.put(`http://localhost:4000/taskchecked/${id}`, {checked: value})
      .then(response => {
        if (response.status === 200) {
          this.props.toggleTask(id, value);
        }
      });
  }

  setScore = (id, score) => {

    axios.put(`http://localhost:4000/taskscore/${id}`, {score: score})
      .then(response => {
        if (response.status === 200) {
          this.props.setScore(id, score);
        }
      });
  }

  setDuration = (id, duration) => {

    axios.put(`http://localhost:4000/taskduration/${id}`, {duration: duration})
      .then(response => {
        if (response.status === 200) {
          this.props.setDuration(id, duration);
        }
      });
  }


  setCategory = async (id, category) => {

    const response = await axios.put(`http://localhost:4000/taskcategory/${id}`, {category: category});
    if (response.status === 200) {
      this.props.setCategory(id, category);
    }
  }

  postNewTask = async (ddate, name) => {
    const response = await axios.post(`http://localhost:4000/newtask/`,
      {ddate: ddate.getFullYear()+'.'+(ddate.getMonth()+1)+'.'+ddate.getDate(), name});

    if (response.status === 200) {
      this.props.addTask(response.data);
    }
  }

  deleteTask = async (id) => {
    const response = await axios.delete(`http://localhost:4000/deletetask/${id}`);

    if (response.status === 200) {
      this.props.deleteTask(id);
    }

  }



  render() {

    //{this.props.isFetching ? <Preloader /> : null}     можно потом добавить прелоадер

    return <div>

      <Tasklist curDdate={this.props.curDdate}
                tasks={this.props.tasks}
                categories={this.props.categories}
                toggleTask={this.toggleTask}
                setScore={this.setScore}
                setDuration={this.setDuration}
                setCategory={this.setCategory}
                postNewTask={this.postNewTask}
                deleteTask={this.deleteTask}
      />

    </div>

  }

}

export default connect(mapStateToProps,
  {toggleTask,
    setTasks,
    setScore,
    getCategories,
    setCategory,
    addTask,
    deleteTask,
    setDuration
  })(tasklistAPI);


