import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
const Question = ({title, info}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <article className='question'>
      <header>
        <h4>{title}</h4>
        <button className='btn' onClick={()=>setShowInfo(!showInfo)}>
          {showInfo ? <AiOutlineMinus/> : <AiOutlinePlus/>}
        </button>
      </header>
      { showInfo && <p>{info}</p>}
      {/* showInfo가 true일때만 display info하기 */}
    </article>

  )
};

export default Question;
