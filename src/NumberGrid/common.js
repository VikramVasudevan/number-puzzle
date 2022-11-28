import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { NumberGrid } from './NumberGrid';

export function moveButton(row, col, grid, setGrid) {
    console.log('Moving button ', row, col, grid.assignments[row][col])
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
    const sorted = checkIfNumbersAreSorted(tempGrid);
    console.log('sorted  = ', sorted);
    if (sorted) {
        // Game Over disable grid
        tempGrid.disabled = true;
    }

    if (setGrid) {
        console.log("Calling setGrid for", tempGrid);
        setGrid(tempGrid);
    }
    console.debug('new grid = ', tempGrid);
}

function checkIfNumbersAreSorted(grid) {
    let sorted = false;
    let prevCell = -1;
    grid.assignments.forEach(row => {
        row.forEach(col => {
            if (col.value < prevCell) {
                sorted &= false;
            } else
                sorted &= true;
        })
    })
    return sorted;
}

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


function getButton(grid, setGrid, row, col) {
    try {
        const currentButtonVal = getCurrentButtonVal(grid, setGrid, row, col);
        const previousButtonVal = getPreviousButtonVal(grid, setGrid, row, col);
        let className = "primary";
        if (row === 0 && col === 0) {

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
        const lastCol = previousRow?.length - 1;
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

export function getNumberOfMovesAlert(movesCount) {
    let str = `Number of moves = ${movesCount}`
    if (movesCount > 20) {
        return (<span className="text-danger">{str}</span>);
    }
    else if (movesCount > 10) {
        return (<span className="text-warning">{str}</span>);
    }
    else
        return (<span className="text-success">{str}</span>);
}

export function renderGrid(grid, setGrid) {
    console.log("Rendering grid")
    return Array(grid.numRows).fill().map(function (v, i) {
        return <tr>
            {renderColumns(grid, setGrid, i)}
        </tr>
    })
}


export function getNavBar(title) {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Number-Puzzle : React-Redux</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export function getTabs() {
    return (
        <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="home" title="Home">
                Home
            </Tab>
            <Tab eventKey="profile" title="Profile">
                Profile
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
                Contact
            </Tab>
        </Tabs>
    );
}