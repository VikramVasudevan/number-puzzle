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
  return Array.from(retVal);
}

const grid = {
  numRows: 3,
  numCols: 3,
  randomNumbers: uniqueRandomNumbers(100, 8)
}

console.log("grid = ", grid);

function moveButton(pos) {
  console.log('Moving button ', pos, grid.randomNumbers[pos])
}

function getButton(pos) {
  if(pos < grid.randomNumbers.length)
    return <Button data-pos={pos} onClick={() => moveButton(pos)}>{pos} =  {grid.randomNumbers[pos]}</Button>
}

function getColumns(rowNumber) {
  return Array(3).fill().map(function (v, colNumber) {
    let pos = 3 * (rowNumber ) + (colNumber);
    return <td>
      {
        getButton(pos)
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
