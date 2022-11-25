import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function moveButton(row, col, grid, setGrid) {
    console.debug('Moving button ', row, col, grid.assignments[row][col])
    let availableNeighbours = [];
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
        console.debug("neighbourCoordinate = ", neighbourCoordinate)
        if (neighbourCoordinate.row >= 0 && neighbourCoordinate.row < grid.numRows
            && neighbourCoordinate.col >= 0 && neighbourCoordinate.col < grid.numCols) {
            let neighbour = grid.assignments[neighbourCoordinate.row][neighbourCoordinate.col];
            console.debug("neighbour = ", neighbour);
            if (!neighbour.value)
                availableNeighbours.push(neighbour);
        }

    })

    console.log("availableNeighbours = ", availableNeighbours);
    if (availableNeighbours.length > 0) {
        swapNeighbours(row, col, availableNeighbours[0], grid, setGrid);
    }
}

function swapNeighbours(row, col, availableNeighbour, grid, setGrid) {
    let backupValue = grid.assignments[row][col].value;
    grid.assignments[row][col].value = undefined;
    grid.assignments[availableNeighbour.row][availableNeighbour.col].value = backupValue;

    setGrid(grid);
    console.debug('new grid = ', grid);
}

function getButton(grid, setGrid, row, col) {
    let buttonObj;

    try {
        buttonObj = grid.assignments[row][col];
        if (buttonObj.value)
            return <Button onClick={() => moveButton(row, col, grid, setGrid)}>{row},{col} =  {buttonObj.value}</Button>
    } catch (e) {
        console.error(e);
    }
}

function renderColumns(grid, setGrid, rowNumber) {
    return Array(grid.numCols).fill().map(function (v, colNumber) {
        return <td>
            {
                getButton(grid, setGrid, rowNumber, colNumber)
            }
        </td>
    });
}

function renderGrid(grid, setGrid) {
    return Array(grid.numRows).fill().map(function (v, i) {
        return <tr>
            {renderColumns(grid, setGrid, i)}
        </tr>
    })
}

export function NumberGrid(props) {
    const [grid, setGridState] = useState(props.initialGrid);

    const setGrid = (newGrid)=>{
      console.log("Setting new grid state", newGrid);
      setGridState(newGrid);
    }
  
    return renderGrid(grid, setGrid);
}