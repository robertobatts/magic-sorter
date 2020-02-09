import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import * as sortingAlgos from '../algorithms/sortingAlgos';
import './Sorter.css';

const PRIMARY_COLOR = 'turquoise';

export default function Sorter() {

  const [values, setValues] = React.useState([]);

  useEffect(() => {
    resetArray();
    
  }, [])

  const resetArray = () => {
    const newValues = [];
    for (let i = 0; i <= 300; ++i) {
      newValues.push(randomIntFromInterval(5, 700));
    }
    setValues(newValues)
  }

  const mergeSort = () => {
    const jsSortedArray = values.slice().sort((v1, v2) => v1 - v2);
    const mySortedArray = sortingAlgos.mergeSort(values);

    console.log(arraysAreEqual(jsSortedArray, mySortedArray));
  }

  return (
    <>
      <div className="array-container">
        <div className="bar">
          <Button onClick={() => resetArray()} variant="contained" color="primary">Generate new array</Button>
          <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Button onClick={() => mergeSort()}>Merge Sort</Button>
            <Button>Quick Sort</Button>
            <Button>Something else sort</Button>
          </ButtonGroup>
        </div>
        {values.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
          }}/>
        ))}
      </div>
    </>
  );
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}