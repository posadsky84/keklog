import './duration.css';
import {useState} from "react";
import clockPic from '../../../assets/clock.svg';
import _ from "lodash";
import {useRef, useEffect} from "react";


const Duration = ({id, duration, setDuration}) => {

  const [value, setValue] = useState(duration);
  const [editing, setEditing] = useState(false);

  const inputRef = useRef(null);

  const commitEditing = () => {
    setDuration(id, value);
    setEditing(false);
  }

  const cancelEditing = () => {
    setEditing(false);
    setValue(duration);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef && !inputRef.current?.contains(event.target)) {
        cancelEditing();
      }
    }
    if (editing) {
      document.addEventListener(`mousedown`, handleClickOutside);
      return () => {
        document.removeEventListener(`mousedown`, handleClickOutside);
      }
    }
  }, [editing]);


  return !editing ?
    (
      <div className={value ? "duration" : "duration add-duration"} onClick={() => setEditing(true)}>
        <img src={clockPic} className='clockPic' alt=''/>
        <div className='duration-label'>{value ? _.round(value / 60, 2) + " h" : "..."} </div>
      </div>

    ) : (<div className='duration-input-wrapper' ref={inputRef} >
        <div className='duration-min-label'>(минут)</div>
        <input
          className='duration-input'
          type="number"
          value={value}
          autoFocus
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              commitEditing();
            } else if (e.key === "Escape") {
              cancelEditing();
            }
          }}
        />
        <div className='duration-buttons'>
          <button onClick={commitEditing}>V</button>
          <button onClick={cancelEditing}>X</button>
        </div>

      </div>
    );


}


export default Duration;