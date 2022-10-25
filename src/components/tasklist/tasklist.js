import React from 'react';
import './tasklist.css';
import Score from "./score/score";
import Category from "./category/category";


const Tasklist = (props) => {
  return (
    <>
      <h2 className='ddate-label'>{props.curDdate.getDate()}.{props.curDdate.getMonth() + 1}</h2>
      <div className='task-list'>
        {props.tasks.map(({id, taskname, checked, score, category}) => (
          <div className='task-item' key={id}>
            <input
              type="checkbox"
              id={`cb${id}`}
              onClick={() => props.toggleTask(id, !checked)}
              checked={checked}
            />
            <label htmlFor={`cb${id}`}>{taskname}</label>
            <Category taskId={id} categoryId={category} categories={props.categories} setCategory={props.setCategory}/>
            <Score id={id} score={score} setScore={props.setScore}/>
          </div>
        ))}
      </div>
    </>);
}


export default Tasklist;

