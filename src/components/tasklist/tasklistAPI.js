import {setTasks, toggleTask} from "../../redux/tasklist-reducer";
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

  loadtasks() {
    axios.get(`http://localhost:4000/tasks?ddate=${this.props.curDdate.getFullYear()}${this.props.curDdate.getMonth() + 1}${this.props.curDdate.getDate()}`)
      .then(response => {
        //this.props.toggleIsFetching(false);
        this.props.setTasks(response.data);
      });
  }


  render() {

    //{this.props.isFetching ? <Preloader /> : null}     можно потом добавить прелоадер

    return <div>

      <Tasklist curDdate={this.props.curDdate}
                tasks={this.props.tasks}
                toggleTask={this.props.toggleTask}
      />

    </div>

  }

}

export default connect(mapStateToProps,{toggleTask,setTasks})(tasklistAPI);


