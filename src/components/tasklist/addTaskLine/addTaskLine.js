import React, { useEffect, useRef, useState } from 'react';
import './addTaskLine.css';

const AddTaskLine = props => {
  const [isEditing, setIsEditing] = useState(false);
  const [addTaskValue, setAddTaskValue] = useState(``);

  const addTaskLineRef = useRef(null);

  const onTaskLineClick = () => {
    setIsEditing(true);
  };

  // А будет ли здесь cancelEditing вообще?
  const cancelEditing = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (addTaskLineRef && !addTaskLineRef.current?.contains(event.target)) {
        cancelEditing();
      }
    };
    if (isEditing) {
      document.addEventListener(`mousedown`, handleClickOutside);
      return () => {
        document.removeEventListener(`mousedown`, handleClickOutside);
      };
    }
  }, [isEditing]);

  useEffect(() => {
    setAddTaskValue(``);
  }, [props.curDdate, setAddTaskValue]);

  return (
    <div>
      {!isEditing
        ? (
          <div className="add-task-line" onClick={onTaskLineClick}>
            <div className="plus">+</div>
            <div className="add-task-button">Создать задачу</div>
          </div>
        )
        : (
          <div className="add-task-line editing-add-task-line" ref={addTaskLineRef}>
            <input
              autoFocus
              className="task-input"
              onChange={event => setAddTaskValue(event.target.value)}
              onKeyDown={e => {
                if (e.key === `Enter`) {
                  props.postNewTask(props.curDdate, addTaskValue);
                  cancelEditing();
                  setAddTaskValue(``);
                } else if (e.key === `Escape`) {
                  cancelEditing();
                  setAddTaskValue(``);
                }
              }}
              type="text"
              value={addTaskValue}
            />
          </div>
        )}
    </div>
  );
};

export default AddTaskLine;
