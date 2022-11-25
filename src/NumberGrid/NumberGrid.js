import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Countdown from 'react-countdown';
import './NumberGrid.css';

export function uniqueRandomNumbers(max, qty, gridDimensions) {
    const retVal = new Set();
    console.log("retVal.size = ", retVal.size);
    while (retVal.size < qty) {
        retVal.add(Math.floor(Math.random() * max));
    }
    const arr = Array.from(retVal);
    let assignments = [];
    for (var row = 0; row < gridDimensions.numRows; row++) {
        assignments.push([]);
        for (var col = 0; col < gridDimensions.numCols; col++) {
            var obj = {
                row: row,
                col: col,
                value: arr[gridDimensions.numCols * row + (col)]
            };
            assignments[row].push(obj);
        }
    }
    console.log("assignments = ", assignments);
    return assignments;
}

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
            if (typeof neighbour.value == 'undefined')
                availableNeighbours.push(neighbour);
        }

    })

    console.log("availableNeighbours = ", availableNeighbours);
    if (availableNeighbours.length > 0) {
        swapNeighbours(row, col, availableNeighbours[0], grid, setGrid);
    }
}

function swapNeighbours(row, col, availableNeighbour, grid, setGrid) {
    let tempGrid = JSON.parse(JSON.stringify(grid));
    let backupValue = tempGrid.assignments[row][col].value;
    tempGrid.assignments[row][col].value = undefined;
    tempGrid.assignments[availableNeighbour.row][availableNeighbour.col].value = backupValue;

    setGrid(tempGrid);
    console.debug('new grid = ', tempGrid);
}

function getButton(grid, setGrid, row, col) {
    try {
        const currentButtonVal = getCurrentButtonVal(grid, setGrid, row, col);
        const previousButtonVal = getPreviousButtonVal(grid, setGrid, row, col);
        let className = "primary";
        if (row == 0 && col == 0) {

        }
        else if (typeof previousButtonVal == 'undefined' || currentButtonVal < previousButtonVal) {
            className = "danger"
        }
        else className = "success"
        if (typeof currentButtonVal != 'undefined')
            return <Button className="number-button" variant={className} onClick={() => moveButton(row, col, grid, setGrid)} disabled={grid.disabled ? 'disabled' : null}>{currentButtonVal}</Button>
        else
            return <Button className="number-button" variant="secondary" disabled>&nbsp;</Button>
    } catch (e) {
        console.error(e);
    }
}

function getCurrentButtonVal(grid, setGrid, row, col) {
    if (!grid.assignments[row]) return undefined;
    if (typeof grid.assignments[row][col] === 'undefined') return undefined;

    return grid.assignments[row][col].value;
}

function getPreviousButtonVal(grid, setGrid, row, col) {
    if (col > 0) {
        return getCurrentButtonVal(grid, setGrid, row, col - 1);
    } else {
        const previousRow = grid.assignments[row - 1];
        const lastCol = grid.assignments[row - 1]?.length - 1;
        return getCurrentButtonVal(grid, setGrid, row - 1, lastCol);
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
    console.log("Rendering grid")
    return Array(grid.numRows).fill().map(function (v, i) {
        return <tr>
            {renderColumns(grid, setGrid, i)}
        </tr>
    })
}

export function NumberGridTest(props) {
    const [count, setCount] = useState(1);

    useEffect(() => {
        if (count > 5) {
            console.log('Count is more that 5');
        } else {
            console.log('Count is less that 5');
        }
    }, [count]);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <p>{count}</p>

            <Button onClick={handleClick}>
                add
            </Button>
        </div>
    );
}

function getNumberOfMovesAlert(movesCount) {
    let str = `Number of moves = ${movesCount}`
    if (movesCount > 20) {
        return (<Alert variant="danger">{str}</Alert>);
    }
    else if (movesCount > 10) {
        return (<Alert variant="warning">{str}</Alert>);
    }
    else
        return (<Alert variant="success">
            Number of moves - {movesCount}
        </Alert>);
}

export function NumberGrid(props) {
    const [grid, setGrid] = useState(props.initialGrid);
    const [movesCount, setMovesCount] = useState(0);

    const setGridState = (newGrid) => {
        console.log("Setting new grid state", newGrid, movesCount);
        setGrid(newGrid);
        setMovesCount(movesCount + 1);
    }

    const changeGridSize = (changeType, newVal) => {
        let newGrid = JSON.parse(JSON.stringify(grid));
        newVal = parseInt(newVal);
        if (changeType === 'rows')
            newGrid.numRows = newVal;
        else if (changeType === 'cols')
            newGrid.numCols = newVal;

        if (newGrid.maxNumber < newGrid.numRows * newGrid.numCols)
            newGrid.maxNumber = newGrid.numRows * newGrid.numCols;

        newGrid.assignments = uniqueRandomNumbers(newGrid.maxNumber, newGrid.numRows * newGrid.numCols - 1, { numRows: newGrid.numRows, numCols: newGrid.numCols });
        newGrid.startTime = Date.now();
        setMovesCount(0);
        setGrid(newGrid);
    }

    useEffect(() => {
        console.log("Grid updated ...", grid);
    }, [grid])

    useEffect(() => {
        console.log("movesCount updated ...", movesCount);
    }, [movesCount]);

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            let newGrid = JSON.parse(JSON.stringify(grid));
            newGrid.disabled = true;
            setGrid(newGrid);
            // Render a completed state
            return <Alert variant='danger'>Time's up !</Alert>;
        } else {
            // Render a countdown
            const formattedHours = ("" + hours).padStart(2, "0");
            const formattedMinutes = ("" + minutes).padStart(2, "0")
            const formattedSeconds = ("" + seconds).padStart(2, "0")

            const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
            if (hours === 0 && minutes === 0 && seconds < 20)
                return (
                    <Alert variant='danger'>
                        <span>{formattedTime}</span>
                    </Alert>
                )
            else
                return (
                    <Alert variant='primary'>
                        <span>{formattedTime}</span>
                    </Alert>
                )

        }
    };

    return (
        <div>
            <Card className="card-primary">
                <Card.Body>
                    <h2 className="text-primary">
                        Number Slide Puzzle
                    </h2>
                    <h3 className="text-secondary">
                        [{grid.numRows} * {grid.numCols} Grid]
                    </h3>
                    <p className="text-primary">Objective : Sort the number grid in ascending order.</p>
                    <Form.Group className="mb-3" controlId="formGridRows" onChange={e => changeGridSize('rows', e.target.value)}>
                        <Container fluid>
                            <Row>
                                <Col>
                                    <Form.Text className="text-muted">
                                        Grid Rows
                                    </Form.Text>
                                </Col>
                                <Col><Form.Control type="number" placeholder="Grid Rows" value={grid.numRows} /></Col>
                            </Row>
                        </Container>


                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridColumns" onChange={e => changeGridSize('cols', e.target.value)}>
                        <Container fluid>
                            <Row>
                                <Col>
                                    <Form.Text className="text-muted">
                                        Grid Columns
                                    </Form.Text>
                                </Col>
                                <Col><Form.Control type="number" placeholder="Grid Rows" value={grid.numCols} /></Col>
                            </Row>
                        </Container>
                    </Form.Group>
                </Card.Body>
            </Card>

            {getNumberOfMovesAlert(movesCount)}
            <Countdown date={grid.startTime + 120000} renderer={renderer} />
            <div>
                <table>
                    <tbody>
                        {renderGrid(grid, setGridState)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}