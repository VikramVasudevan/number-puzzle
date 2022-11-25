import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';

function uniqueRandomNumbers(max, qty) {
  const retVal = new Set();
  console.log("retVal.size = ", retVal.size);
  while (retVal.size < qty) {
    retVal.add(Math.floor(Math.random() * max));
  }
  const arr = Array.from(retVal);
  let assignments = [];
  for (var row = 0; row < 3; row++) {
    assignments.push([]);
    for (var col = 0; col < 3; col++) {
      var obj = {
        row: row,
        col: col,
        value: arr[3 * row + (col)]
      };
      assignments[row].push(obj);
    }
  }
  console.log("assignments = ", assignments);
  return assignments;
}

const grid = {
  numRows: 3,
  numCols: 3,
  assignments: uniqueRandomNumbers(100, 8)
}

console.log("grid = ", grid);

function moveButton(row, col) {
  console.log('Moving button ', row, col, grid.assignments[row][col])
  let neighbours = [];
  let neighbourCoordinates = [
    {
      row: row - 1,
      col: col
    },
    {
      row: row + 1,
      col: col
    }, {
      row: row,
      col: col - 1
    }, {
      row: row,
      col: col + 1
    }
  ];

  neighbourCoordinates.forEach(neighbourCoordinate => {
    console.log("neighbourCoordinate = ", neighbourCoordinate)
    if (neighbourCoordinate.row >= 0 && neighbourCoordinate.row < grid.numRows
      && neighbourCoordinate.col >= 0 && neighbourCoordinate.col < grid.numCols) {
      let neighbour = grid.assignments[neighbourCoordinate.row][neighbourCoordinate.col];
      console.log("neighbour = ", neighbour);
      if (neighbour.value)
        neighbours.push(neighbour);
    }

  })

  console.log("neighbours = ", neighbours);
}

function getButton(row, col) {
  let buttonObj;

  try {
    buttonObj = grid.assignments[row][col];
    if (buttonObj.value)
      return <Button onClick={() => moveButton(row, col)}>{row},{col} =  {buttonObj.value}</Button>
  } catch (e) {
    console.error(e);
  }
}

function getColumns(rowNumber) {
  return Array(3).fill().map(function (v, colNumber) {
    let pos = 3 * (rowNumber) + (colNumber);
    return <td>
      {
        getButton(rowNumber, colNumber)
      }
    </td>
  })
}

function getRows() {
  return Array(3).fill().map(function (v, i) {
    return <tr>
      {getColumns(i)}
    </tr>
  })
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <table>
          <tbody>
            {getRows()}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
