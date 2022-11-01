import React, {useEffect, useState, useRef} from "react";
import "./score.css";

const Score = ({id, score, setScore}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [scoreValue, setScoreValue] = useState(score);

  const inputRef = useRef(null);



  const cancelEditing = () => {
    setIsEditing(false);
    setScoreValue(score);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef && !inputRef.current?.contains(event.target)) {
        cancelEditing();
      }
    }
    if (isEditing) {
      document.addEventListener(`mousedown`, handleClickOutside);
      return () => {
        document.removeEventListener(`mousedown`, handleClickOutside);
      }
    }
  }, [isEditing]);





  const commitEditing = () => {
    setScore(id, scoreValue);
    setIsEditing(false);
  }

  const onScoreClick = () => {
    setIsEditing(true);
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