import React from 'react'
import { useQuery } from '@apollo/client'
import { useChecklist } from 'react-checklist'

export default ({checkList}) => {
    
    const { handleCheck, isCheckedAll, checkedItems, setCheckedItems } = useChecklist(checkList, {
      key: '_id',
      keyType: 'number',
    });

    const handleReset = () => setCheckedItems(new Set());
  
    console.log(checkedItems);      // Set(0) - handling with Set
    console.log([...checkedItems]); // []     - handling with Array
    
    return (
      <ul style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '20px'}} key={'habit'}>
        {/* <li>
          <input
            type="checkbox"
            onChange={handleCheck}              // 1
            checked={isCheckedAll}              // 2
          />
          <label>Check All</label>
        </li> */}
  
        {checkList.map((v, i) => (
          <li key={i} style={{marginRight: '10px'}}>
            <input
              type="checkbox"
              data-key={v._id}                  // 3
              onChange={handleCheck}            // 4
              checked={checkedItems.has(v._id)} // 5
            />
            <label>{v.label}</label>
          </li>
        ))}
            <li style={{marginRight: '10px'}}>
                <button onClick={handleReset}>
                Reset
                </button>
            </li>
      </ul>
      
    );
  };