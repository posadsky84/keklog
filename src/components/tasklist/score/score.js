import React, {useState} from "react";
import "./score.css";

const Score = ({score}) => {

  const [isEditing, setIsEditing] = useState(false);

  return isEditing
    ? (
      <div className='score-input'>
        <input type="number"/>
      </div>
    ) : (
      <div className='score' onClick={() => setIsEditing(true)}>
        {score}
      </div>
    );

}

export default Score;