import React from 'react';
import './tasklist.css';
import Score from "./score/score";


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
              onClick={() => props.toggleTask(id)}
              checked={checked}
            />
            <label htmlFor={`cb${id}`}>{taskname}</label>
            <Score score={score}/>
          </div>
        ))}
      </div>
    </>);
}


//export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);
export default Tasklist;

