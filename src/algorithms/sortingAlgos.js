export function getMergeSortAnimations(unsortedArray) {
  const animations = [];
  if (unsortedArray.length <= 1) return unsortedArray;
  const auxiliaryArray = unsortedArray.slice();
  mergeSortHelper(unsortedArray, 0, unsortedArray.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([k, i]);
    animations.push([k, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([k, j]);
    animations.push([k, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function mergeSort(unsortedArray) {
  if (unsortedArray.length <= 1) {
    return unsortedArray;
  }
  const middle = Math.floor(unsortedArray.length / 2);
  const left = unsortedArray.slice(0, middle);
  const right = unsortedArray.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(leftArray, rightArray) {
  let resultArray = [];
  let leftIdx = 0, rightIdx = 0;

  while (leftIdx < leftArray.length && rightIdx < rightArray.length) {
    if (leftArray[leftIdx] < rightArray[rightIdx]) {
      resultArray.push(leftArray[leftIdx]);
      leftIdx++;
    } else {
      resultArray.push(rightArray[rightIdx]);
      rightIdx++;
    }
  }
  return resultArray
    .concat(leftArray.slice(leftIdx))
    .concat(rightArray.slice(rightIdx));
}