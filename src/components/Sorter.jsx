import React, {setState} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import * as sortingAlgos from '../algorithms/sortingAlgos';
import './Sorter.css';

const PRIMARY_COLOR = 'turquoise';

const SORTED_COLOR = 'green';

export default class Sorter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const newValues = [];
    for (let i = 0; i <= 300; ++i) {
      newValues.push(randomIntFromInterval(5, 700));
    }
    this.setState({values: newValues}, () => this.resetArrayBarsColor());
  }

  resetArrayBarsColor() {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
    }
  }

  mergeSort() {
    const jsSortedArray = this.state.values.slice().sort((v1, v2) => v1 - v2);
    const mySortedArray = sortingAlgos.mergeSort(this.state.values);
    this.setState({values: mySortedArray}, () => this.colorSortedElements(jsSortedArray));

  }

  colorSortedElements(jsSortedArray) {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < jsSortedArray.length; i++) {
      let height = arrayBars[i].style.height;
      if (jsSortedArray[i] == height.slice(0, -2)) {
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = SORTED_COLOR;
        }, i*2);
      }
    }
  }

  render() {
    return (
      <>
        <div className="array-container">
          <div className="bar">
            <Button onClick={() => this.resetArray()} variant="contained" color="primary">Generate new array</Button>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
              <Button onClick={() => this.mergeSort()}>Merge Sort</Button>
              <Button>Quick Sort</Button>
              <Button>Something else sort</Button>
            </ButtonGroup>
          </div>
          {this.state.values.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                fontSize: "0px"
            }}/>
          ))}
        </div>
      </>
    );
  }
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