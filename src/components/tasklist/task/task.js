import './task.css';
import { useState } from 'react';
import Category from '../category/category';
import Score from '../score/score';
import Duration from '../duration/duration';
import Preloader from '../../common/preloader/preloader';

function Task({
  id, name, checked, score, category, duration, categories, setCategory, setScore, setDuration, toggleTask, deleteTask,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const goDeleteTask = taskId => {
    setIsDeleting(true);

    setTimerId(setTimeout(() => {
      deleteTask(taskId);
    }, 3000));
  };

  const cancelDeleting = () => {
    if (timerId) clearTimeout(timerId);
    setIsDeleting(false);
  };

  if (!isDeleting) {
    return (
      <div className="task-item">
        <input
          checked={checked}
          id={`cb${id}`}
          onClick={() => toggleTask(id, !checked)}
          type="checkbox"
        />
        <label htmlFor={`cb${id}`} title={name}>{name}</label>
        <Category
          categories={categories}
          categoryId={category}
          setCategory={setCategory}
          taskId={id}
        />
        <Duration duration={duration} id={id} setDuration={setDuration} />
        <Score id={id} score={score} setScore={setScore} />
        <div className="del-button" onClick={() => goDeleteTask(id)}>
          <div className="del-line-1" />
          <div className="del-line-2" />
        </div>
      </div>
    );
  }
  return (
    <div className="deleting-item">
      <div className="deleting-spinner"><Preloader /></div>
      <div className="del-cancel-button" onClick={cancelDeleting}>Отменить удаление</div>

    </div>
  );
}

export default Task;
