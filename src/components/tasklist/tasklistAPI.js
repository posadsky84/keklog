import {setTasks, toggleTask, setScore} from "../../redux/tasklist-reducer";
import Tasklist from "./tasklist";
import {connect} from "react-redux";
import React from "react";
import axios from "axios";

let mapStateToProps = (state) => {
  return {
    curDdate: state.LeftColumn.curDdate,
    tasks: state.Tasklist.Tasks,
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


  loadtasks = () => {
    axios.get(`http://localhost:4000/tasks?ddate=${this.props.curDdate.getFullYear()}${this.props.curDdate.getMonth() + 1}${this.props.curDdate.getDate()}`)
      .then(response => {
        //this.props.toggleIsFetching(false);
        this.props.setTasks(response.data);
      });
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




  render() {

    //{this.props.isFetching ? <Preloader /> : null}     можно потом добавить прелоадер

    return <div>

      <Tasklist curDdate={this.props.curDdate}
                tasks={this.props.tasks}
                toggleTask={this.toggleTask}
                setScore={this.setScore}
      />

    </div>

  }

}

export default connect(mapStateToProps,{toggleTask, setTasks, setScore})(tasklistAPI);


