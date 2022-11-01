import React from 'react';
import './tasklist.css';
import Score from "./score/score";
import Category from "./category/category";
import AddTaskLine from "./addTaskLine/addTaskLine";


const Tasklist = (props) => {
  return (
    <>
      <h2 className='ddate-label'>{props.curDdate.getDate()}.{props.curDdate.getMonth() + 1}</h2>
      <div className='task-list'>
        {props.tasks.map(({id, name, checked, score, category}) => (
          <div className='task-item' key={id}>
            <input
              type="checkbox"
              id={`cb${id}`}
              onClick={() => props.toggleTask(id, !checked)}
              checked={checked}
            />
            <label htmlFor={`cb${id}`}>{name}</label>
            <Category taskId={id} categoryId={category} categories={props.categories} setCategory={props.setCategory}/>
            <Score id={id} score={score} setScore={props.setScore}/>
          </div>
        ))}
        <AddTaskLine postNewTask={props.postNewTask} curDdate={props.curDdate}/>
      </div>
    </>);
}


export default Tasklist;

