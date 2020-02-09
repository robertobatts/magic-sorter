import React, {useState, useEffect} from 'react';
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
      newValues.push(randomIntFromInterval(5, 1000));
    }
    setValues(newValues);
  }

  return (
    <>
      <div className="array-container">
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