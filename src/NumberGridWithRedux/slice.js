import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { moveButton, uniqueRandomNumbers } from '../NumberGrid/common';

let initialGrid = {
    maxNumber: 14,
    numRows: 4,
    numCols: 4,
    assignments: undefined,
    disabled: false,
    startTime: Date.now(),
    movesCount: 0,
};

if (initialGrid.maxNumber < initialGrid.numRows * initialGrid.numCols)
    initialGrid.maxNumber = initialGrid.numRows * initialGrid.numCols;

initialGrid.assignments = uniqueRandomNumbers(initialGrid.maxNumber, initialGrid.numRows * initialGrid.numCols - 1, { numRows: initialGrid.numRows, numCols: initialGrid.numCols });

export const NumberGridSlice = createSlice({
    initialState: { grid: initialGrid },
    name: "number-puzzle",
    reducers: {
        moveButton: (state, action) => {
            //action.payload contains the parameterss
            console.log("moveButtonRedux : action = ", action);
            console.log("Updating grid ...", action.payload);
            state.grid = action.payload;
            state.grid.movesCount++;
        }
    }
})

export const { moveButton: moveButtonRedux } = NumberGridSlice.actions;

export default NumberGridSlice.reducer;