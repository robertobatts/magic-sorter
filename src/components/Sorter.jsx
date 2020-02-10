import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import * as sortingAlgos from '../algorithms/sortingAlgos';
import './Sorter.css';

const NEUTRAL_COLOR = 'pink';
const PRIMARY_COLOR = 'mediumblue';
const SECONDARY_COLOR = 'tomato';

const SORTED_COLOR = 'springgreen';

const ANIMATION_SPEED_MS = 2;

const DEFAULT_ARRAY_SIZE = 100;

export default class Sorter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      valuesSize: DEFAULT_ARRAY_SIZE,
      stop: true
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const newValues = [];
    for (let i = 0; i <= this.state.valuesSize; ++i) {
      newValues.push(randomIntFromInterval(5, 700));
    }
    this.setState({stop: true});
    this.setState({values: newValues}, () => this.resetArrayBarsColor());
  }

  resetArrayBarsColor() {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = NEUTRAL_COLOR;
    }
  }

  sort(sortFunction) {
    this.setState({stop: false}, () => sortFunction())
  }

  mergeSort() {
    const jsSortedArray = this.state.values.slice().sort((v1, v2) => v1 - v2);
    const animations = sortingAlgos.getMergeSortAnimations(this.state.values);
    console.log(animations)
    for (let i = 0; i < animations.length && !this.state.stop; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color1 = i % 3 === 0 ? PRIMARY_COLOR : NEUTRAL_COLOR;
        const color2 = i % 3 === 0 ? SECONDARY_COLOR : NEUTRAL_COLOR;
        setTimeout(() => {
          if (!this.state.stop) {
            barOneStyle.backgroundColor = color1;
            barTwoStyle.backgroundColor = color2;
            this.colorElementIfSorted(jsSortedArray[barOneIdx], arrayBars[barOneIdx]);
            this.colorElementIfSorted(jsSortedArray[barTwoIdx], arrayBars[barTwoIdx]);
          }
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          if (!this.state.stop) {
            const [barOneIdx, newValue] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${this.getHeight(newValue)}px`;
            this.colorElementIfSorted(jsSortedArray[barOneIdx], arrayBars[barOneIdx]);
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  colorElementIfSorted(correctValue, element) {
    if (!element) {
      return;
    }
    if (correctValue == element.style.height.slice(0, -2)) {
      setTimeout(() => {
        element.style.backgroundColor = SORTED_COLOR;
      }, 1);
    }
  }

  getHeight(value) {
    return value;
  }

  colorSortedElements(jsSortedArray) {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < jsSortedArray.length; i++) {
      if (jsSortedArray[i] == arrayBars[i].getAttribute('value')) {
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = SORTED_COLOR;
        }, i*ANIMATION_SPEED_MS);
      }
    }
  }

  handleChangeSize(newSize) {
    this.setState({valuesSize: newSize});
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="bar">
            <Button onClick={() => this.resetArray()} variant="contained" color="primary">Generate new array</Button>
            <div className="margin"/>
            <div className="slider">
              <Typography id="discrete-slider" gutterBottom>
                Array Size
              </Typography>
              <Slider
                defaultValue={DEFAULT_ARRAY_SIZE}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                onChange={(event, size) => this.handleChangeSize(size)}
                step={30}
                marks
                min={10}
                max={200}
              />
            </div>
            <div className="margin"/>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
              <Button onClick={() => this.sort(this.mergeSort.bind(this))}>Merge Sort</Button>
              <Button>Quick Sort</Button>
              <Button>Something else sort</Button>
            </ButtonGroup>
          </div>
          <div className="array-container">
            {this.state.values.map((value, idx) => (
              <div
                className="array-bar"
                value={value}
                key={idx}
                style={{
                  backgroundColor: NEUTRAL_COLOR,
                  height: `${this.getHeight(value)}px`,
                  width: `${500/this.state.values.length}px`
              }}/>
            ))}
          </div>
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