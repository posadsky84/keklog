import React from 'react';
import './tasklist.css';


const Tasklist = (props) => {
  return <div className='tasklist'>
    <div>{props.curDdate.getDate()}.{props.curDdate.getMonth() + 1}</div>
    {props.tasks.map(({id,taskname,checked}) => <div><label><input type="checkbox" onClick={() => props.toggleTask(id)} checked={checked}/>{taskname}</label></div>)}
  </div>;
}

//export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);
export default Tasklist;

