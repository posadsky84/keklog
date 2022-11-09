import './task.css';
import Category from "../category/category";
import Score from "../score/score";
import {useState} from "react";
import Duration from "../duration/duration";


const Task = ({id, name, checked, score, category, duration, categories, setCategory, setScore, setDuration, toggleTask, deleteTask}) => {

  const [isDeleting, setIsDeleting] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const goDeleteTask = (id) => {
    setIsDeleting(true);

    setTimerId(setTimeout(() => {
        deleteTask(id);
    }, 5000));
  }

  const cancelDeleting = () => {
    if (timerId) clearTimeout(timerId);
     setIsDeleting(false);
  }


  if (!isDeleting) {
    return (
      <div className='task-item'>
        <input
          type="checkbox"
          id={`cb${id}`}
          onClick={() => toggleTask(id, !checked)}
          checked={checked}
        />
        <label htmlFor={`cb${id}`} title={name}>{name}</label>
        <Category taskId={id} categoryId={category} categories={categories} setCategory={setCategory}/>
        <Duration id={id} duration={duration} setDuration={setDuration}/>
        <Score id={id} score={score} setScore={setScore}/>
        <div className='del-button' onClick={() => goDeleteTask(id)}>
          <div className='del-line-1'/>
          <div className='del-line-2'/>
        </div>
      </div>)
  } else {
    return (<div className='deleting-item'>
      <div className='deleting-spinner'> ( 0 )</div>
      <div className='del-cancel-button' onClick={cancelDeleting}>Отменить удаление</div>


    </div>)
  }


}


export default Task;
