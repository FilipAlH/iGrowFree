/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useChecklist } from 'react-checklist'
import { QUERY_USER } from '../../utils/queries';
import { UPDATE_HABIT_STATE, DELETE_HABIT_STATE } from '../../utils/mutations';
import Auth from '../../utils/auth';
import ReactDOM from 'react-dom'


export default ({ checkList }) => {
  //function to compare two arrays
  Array.prototype.equals = function (array) {
    if (!array)
      return false;

    if (this.length != array.length)
      return false;

    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] instanceof Array && array[i] instanceof Array) {
        if (!this[i].equals(array[i]))
          return false;
      }
      else if (this[i] != array[i]) {
        return false;
      }
    }
    return true;
  }

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: Auth.getProfile().data.username }
  })

  const user = data.user.checkListHabits || []
  //console.log(user)

  const filteredCheckList = []

  for (let i = 1; i < checkList.length; i++) {
    filteredCheckList.push(checkList[i])
  }
  //console.log(checkList)
  //console.log(filteredCheckList)

  const importedChecklist = []

  user.forEach(habit => {
    importedChecklist.push({ name: habit.Name, state: habit.State })
  });

  console.log(importedChecklist)
  //console.log(checkList[0])

  const { handleCheck, checkedItems, setCheckedItems } = useChecklist(filteredCheckList, {
    key: '_id',
    keyType: 'number',
  });

  let setArray = []

  const handleLoad = () => {
    for (let i = 0; i < importedChecklist.length; i++) {
      if (importedChecklist[i].name === checkList[0]) {
        let userArray = user[i].State
        setArray = []
        for (let i = 0; i < userArray.length; i++) {
          setArray.push(userArray[i][0])
        };

        console.log(importedChecklist[i].name)
        console.log(checkList[0])
        console.log(setArray)
        console.log([...checkedItems])

        if (setArray.equals([...checkedItems])) {
          setArray = []
          console.log('next')
        } else {
          console.log(`set array to ${setArray}`)
          setCheckedItems(new Set(setArray))
        }

      } else {
        console.log('does not exist')
      }

      setArray = []
      console.log(setArray)
    }
  }
  const handleReset = () => setCheckedItems(new Set());

  console.log(checkedItems);      // Set(0) - handling with Set
  console.log([...checkedItems]); // []     - handling with Array

  const [updateHabit, { updateError }] = useMutation(UPDATE_HABIT_STATE);
  const [deleteHabit, { deleteError }] = useMutation(DELETE_HABIT_STATE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const deleteData = await deleteHabit({
        variables: {
          username: Auth.getProfile().data.username,
          habit: checkList[0],
        },
      });

      const updateData = await updateHabit({
        variables: {
          username: Auth.getProfile().data.username,
          habit: checkList[0],
          state: [...checkedItems],
        },
      });

    } catch (err) {
      console.error(err);
    }
  };
  // const [updateState, { updateData, updateLoading, updateError }] = useMutation(UPDATE_HABIT_STATE)
  // if(updateLoading){console.log('loading update')}
  // if(updateError){console.log('error updating')}


  // const handleUpdate = () => {
  //     updateState({ variables: {
  //         username: Auth.getProfile().data.username,
  //         habit: checkList[0],
  //         state: [...checkedItems]
  //     }})
  // }


  return (
    <ul className="px-4 pt-2 pb-2 text-xl text-base" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '20px' }} key={'habit'}>

      {filteredCheckList.map((v, i) => (
        <li key={i} style={{ marginRight: '15px', marginTop: '10px' }}>
          <input
            type="checkbox"
            data-key={v._id}                  // 3
            onChange={handleCheck}            // 4
            checked={checkedItems.has(v._id)} // 5
          />
          <label>{v.label}</label>
        </li>
      ))}
      <li style={{ marginRight: '10px' }}>
        <button className="py-2 px-4 font-medium text-white bg-gray-500 rounded hover:bg-red-400 transition duration-300" onClick={handleReset}>
          Reset
        </button>
      </li>
      <li style={{ marginRight: '10px' }}>
        <button className="Load py-2 px-4 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300" onClick={handleLoad}>
          Load
        </button>
      </li>
      <li style={{ marginRight: '10px' }}>
        <button className="py-2 px-4 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300" onClick={handleFormSubmit}>
          Save Progress!
        </button>
      </li>
    </ul>

  );
};