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
import { moveButton, uniqueRandomNumbers, renderGrid, getNumberOfMovesAlert, getNavBar } from './common';

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
            if (!grid.disabled) {
                let newGrid = JSON.parse(JSON.stringify(grid));
                newGrid.disabled = true;
                setGrid(newGrid);
                // Render a completed state
                return <Alert variant='danger'>Time's up !</Alert>;
            }
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
            {getNavBar("Number-Puzzle : React-Redux")}
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

            <Countdown date={grid.startTime + 120000} renderer={renderer} />
            <div>
                <table>
                    <tbody>
                        {renderGrid(grid, setGridState)}
                    </tbody>
                </table>
                {getNumberOfMovesAlert(movesCount)}
            </div>
        </div>
    );
}