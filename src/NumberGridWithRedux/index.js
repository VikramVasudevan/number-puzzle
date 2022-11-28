import { moveButtonRedux } from './slice';
import { useSelector, useDispatch } from 'react-redux';
import { getNumberOfMovesAlert, renderGrid, getNavBar } from '../NumberGrid/common';
import { useCallback } from 'react';

export const getGrid = (state) => state.grid;

export function NumberGridWithRedux() {
    const state = useSelector(getGrid);
    console.log("state = ", state)
    const dispatch = useDispatch();
    const setGrid = useCallback((payload) => dispatch(moveButtonRedux(payload)), []);
    return (
        <div>
            {getNavBar("Number-Puzzle : React-Redux")}
            <table>
                <tbody>
                    {renderGrid(state.grid, setGrid)}
                </tbody>
            </table>
            {getNumberOfMovesAlert(state.grid.movesCount)}
        </div>
    )
}