import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NumberGrid, uniqueRandomNumbers } from './NumberGrid/NumberGrid';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

let initialGrid = {
  maxNumber: 14,
  numRows: 4,
  numCols: 4,
  assignments: undefined,
  disabled: false,
  startTime: Date.now()
};

if (initialGrid.maxNumber < initialGrid.numRows * initialGrid.numCols)
  initialGrid.maxNumber = initialGrid.numRows * initialGrid.numCols;

initialGrid.assignments = uniqueRandomNumbers(initialGrid.maxNumber, initialGrid.numRows * initialGrid.numCols - 1, { numRows: initialGrid.numRows, numCols: initialGrid.numCols });

console.log("grid = ", initialGrid);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container fluid>
          <Row>
            <Col>
              <img src={logo} className="App-logo" alt="logo" />
            </Col>
            <Col><NumberGrid initialGrid={initialGrid}></NumberGrid></Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
