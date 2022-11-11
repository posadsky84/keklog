import React from 'react';
import './tasklist.css';
import AddTaskLine from './addTaskLine/addTaskLine';
import Task from './task/task';

const Tasklist = props => (
  <div className={props.className}>
    <h2 className="ddate-label">
      {props.curDdate.getDate()}
      .
      {props.curDdate.getMonth() + 1}
    </h2>
    <div className="task-list">
      {props.tasks.map(({
        id, name, checked, score, category, duration,
      }) => (
        <Task
          categories={props.categories}
          category={category}
          checked={checked}
          deleteTask={props.deleteTask}
          duration={duration}
          id={id}
          key={id}
          name={name}
          score={score}
          setCategory={props.setCategory}
          setDuration={props.setDuration}
          setScore={props.setScore}
          toggleTask={props.toggleTask}
        />
      ))}
      <AddTaskLine curDdate={props.curDdate} postNewTask={props.postNewTask} />
    </div>
  </div>
);

export default Tasklist;
