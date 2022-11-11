import './duration.css';
import {
  useCallback, useState, useRef, useEffect,
} from 'react';
import _ from 'lodash';
import clockPic from '../../../assets/clock.svg';

const Duration = ({ id, duration, setDuration }) => {
  const [value, setValue] = useState(duration);
  const [editing, setEditing] = useState(false);

  const inputRef = useRef(null);

  const commitEditing = () => {
    setDuration(id, value);
    setEditing(false);
  };

  const cancelEditing = useCallback(() => {
    setEditing(false);
    setValue(duration);
  }, [setEditing, setValue, duration]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (inputRef && !inputRef.current?.contains(event.target)) {
        cancelEditing();
      }
    };
    if (editing) {
      document.addEventListener(`mousedown`, handleClickOutside);
      return () => {
        document.removeEventListener(`mousedown`, handleClickOutside);
      };
    }
  }, [editing, cancelEditing]);

  return !editing
    ? (
      <div className={value ? `duration` : `duration add-duration`} onClick={() => setEditing(true)}>
        <img alt="" className="clockPic" src={clockPic} />
        <div className="duration-label">
          {value ? `${_.round(value / 60, 2)} h` : `...`}
          {` `}
        </div>
      </div>

    ) : (
      <div className="duration-input-wrapper" ref={inputRef}>
        <div className="duration-min-label">(минут)</div>
        <input
          autoFocus
          className="duration-input"
          onChange={event => setValue(event.target.value)}
          onKeyDown={e => {
            if (e.key === `Enter`) {
              commitEditing();
            } else if (e.key === `Escape`) {
              cancelEditing();
            }
          }}
          type="number"
          value={value}
        />
        <div className="duration-buttons">
          <button onClick={commitEditing} type="button">V</button>
          <button onClick={cancelEditing} type="button">X</button>
        </div>

      </div>
    );
};

export default Duration;
