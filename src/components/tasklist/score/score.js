import React, {useState, useRef} from "react";
import "./score.css";

const Score = ({id, score, setScore}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [scoreValue, setScoreValue] = useState(score);

  const inputRef = useRef(null);

  const cancelEditing = () => {
    setIsEditing(false);
    setScoreValue(score);
    document.removeEventListener(`mousedown`, handleClickOutside);
  }

  const commitEditing = () => {
    setScore(id, scoreValue);
    setIsEditing(false);
    document.removeEventListener(`mousedown`, handleClickOutside);
  }

  const handleClickOutside = (event) => {
    if (!inputRef?.current?.contains(event.target)) {
      cancelEditing();
    }
  }

  const onScoreClick = () => {
    setIsEditing(true);
    document.addEventListener(`mousedown`, handleClickOutside);
  }

  return isEditing
    ? (
      <div className='score-input-wrapper' ref={inputRef} >
        <input
          className='score-input'
          type="number"
          value={scoreValue}
          onChange={(event) => setScoreValue(event.target.value)}
        />
        <div className='score-buttons'>
          <button onClick={commitEditing}>V</button>
          <button onClick={cancelEditing}>X</button>
        </div>
      </div>
    ) : (
      <div className='score' onClick={onScoreClick}>
        {score}
      </div>
    );

}

export default Score;