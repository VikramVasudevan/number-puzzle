import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NumberGrid } from './NumberGrid/NumberGrid';
import { uniqueRandomNumbers, getNavBar } from './NumberGrid/common';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NumberGridWithRedux } from './NumberGridWithRedux';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

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
          {getNavBar("Number-Puzzle using React JS")}
          <Tabs
            defaultActiveKey="home"
            id="tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Home">
              <img src={logo} className="App-logo" alt="logo" />
            </Tab>
            <Tab eventKey="reactvanilla" title="React Vanilla">
              <NumberGrid initialGrid={initialGrid}></NumberGrid>
            </Tab>
            <Tab eventKey="reactredux" title="React Redux">
              <NumberGridWithRedux initialGrid={initialGrid}></NumberGridWithRedux>
            </Tab>
          </Tabs>
        </Container>
      </header>
    </div>
  );
}

export default App;
