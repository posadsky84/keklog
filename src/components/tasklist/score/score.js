import React, {useState, useRef} from "react";
import "./score.css";

const Score = ({score}) => {

  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef(null);
  const handleClickOutside = (event) => {
    if (!inputRef?.current?.contains(event.target)) {
      setIsEditing(false);
      document.removeEventListener(`mousedown`, handleClickOutside);
    }
  }

  const onScoreClick = () => {
    setIsEditing(true);
    document.addEventListener(`mousedown`, handleClickOutside);
  }

  return isEditing
    ? (
      <div className='score-input'>
        <input type="number" ref={inputRef}/>
      </div>
    ) : (
      <div className='score' onClick={onScoreClick}>
        {score}
      </div>
    );

}

export default Score;