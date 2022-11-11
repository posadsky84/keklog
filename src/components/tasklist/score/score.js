import React, {
  useCallback, useEffect, useState, useRef,
} from 'react';
import './score.css';

const Score = ({ id, score, setScore }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [scoreValue, setScoreValue] = useState(score);

  const inputRef = useRef(null);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
    setScoreValue(score);
  }, [setIsEditing, setScoreValue, score]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (inputRef && !inputRef.current?.contains(event.target)) {
        cancelEditing();
      }
    };
    if (isEditing) {
      document.addEventListener(`mousedown`, handleClickOutside);
      return () => {
        document.removeEventListener(`mousedown`, handleClickOutside);
      };
    }
  }, [isEditing, cancelEditing]);

  const commitEditing = () => {
    setScore(id, scoreValue);
    setIsEditing(false);
  };

  const onScoreClick = () => {
    setIsEditing(true);
  };

  return isEditing
    ? (
      <div className="score-input-wrapper" ref={inputRef}>
        <input
          autoFocus
          className="score-input"
          onChange={event => setScoreValue(event.target.value)}
          onKeyDown={e => {
            if (e.key === `Enter`) {
              commitEditing();
            } else if (e.key === `Escape`) {
              cancelEditing();
            }
          }}
          type="number"
          value={scoreValue}
        />
        <div className="score-buttons">
          <button onClick={commitEditing} type="button">V</button>
          <button onClick={cancelEditing} type="button">X</button>
        </div>
      </div>
    ) : (
      <div className="score" onClick={onScoreClick}>
        {score}
      </div>
    );
};

export default Score;
