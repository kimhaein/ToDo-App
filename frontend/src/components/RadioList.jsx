import React, {useState} from 'react';

function RadioList({item, active, name, onEvent, setCrruntPage}) {
  const [activeVal, setActiveVal] = useState(active)
  return (
    <div className="radioBox">
      {item.map((v) => {
        return (
          <label>
            {v.title}
            <input 
              type="radio" 
              name={name} 
              value={v.value} 
              onChange={(e)=> {
                console.log()
                onEvent(e.target.value)
                setActiveVal(e.target.value)
                setCrruntPage(1)
              }} 
              defaultChecked={v.value===activeVal}/>
          </label>
        )
      })}
    </div>
  )
}

export default RadioList;