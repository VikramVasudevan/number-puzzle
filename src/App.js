import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { NumberGrid, NumberGridTest } from './NumberGrid/NumberGrid';

function uniqueRandomNumbers(max, qty) {
  const retVal = new Set();
  console.log("retVal.size = ", retVal.size);
  while (retVal.size < qty) {
    retVal.add(Math.floor(Math.random() * max));
  }
  const arr = Array.from(retVal);
  let assignments = [];
  for (var row = 0; row < initialGrid.numRows; row++) {
    assignments.push([]);
    for (var col = 0; col < initialGrid.numCols; col++) {
      var obj = {
        row: row,
        col: col,
        value: arr[initialGrid.numCols * row + (col)]
      };
      assignments[row].push(obj);
    }
  }
  console.log("assignments = ", assignments);
  return assignments;
}

let initialGrid = {
  numRows: 4,
  numCols: 4,
  assignments: undefined
};

initialGrid.assignments = uniqueRandomNumbers(100, initialGrid.numRows * initialGrid.numCols - 1);

console.log("grid = ", initialGrid);

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <table>
          <tbody>
            <NumberGrid initialGrid={initialGrid}></NumberGrid>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
