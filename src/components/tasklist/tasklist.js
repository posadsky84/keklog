import React from 'react';
import './tasklist.css';
import AddTaskLine from "./addTaskLine/addTaskLine";
import Task from "./task/task";


const Tasklist = (props) => {
  return (
    <>
      <h2 className='ddate-label'>{props.curDdate.getDate()}.{props.curDdate.getMonth() + 1}</h2>
      <div className='task-list'>
        {props.tasks.map(({id, name, checked, score, category}) => (
          <Task key={id}
                id={id}
                name={name}
                checked={checked}
                score={score}
                category={category}
                categories={props.categories}
                setCategory={props.setCategory}
                setScore={props.setScore}
                toggleTask={props.toggleTask}
                deleteTask={props.deleteTask}
          />
        ))}
        <AddTaskLine postNewTask={props.postNewTask} curDdate={props.curDdate} />
      </div>
    </>);
}


export default Tasklist;

