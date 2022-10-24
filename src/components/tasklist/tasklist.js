import React from 'react';
import './tasklist.css';
import Score from "./score/score";
import {setScore} from "../../redux/tasklist-reducer";


const Tasklist = (props) => {
  return (
    <>
      <h2 className='ddate-label'>{props.curDdate.getDate()}.{props.curDdate.getMonth() + 1}</h2>
      <div className='task-list'>
        {props.tasks.map(({id, taskname, checked, score}) => (
          <div className='task-item' key={id}>
            <input
              type="checkbox"
              id={`cb${id}`}
              onClick={() => props.toggleTask(id, !checked)}
              checked={checked}
            />
            <label htmlFor={`cb${id}`}>{taskname}</label>
            <Score id={id} score={score} setScore={props.setScore}/>
          </div>
        ))}
      </div>
    </>);
}


//export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);
export default Tasklist;

