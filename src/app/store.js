import { configureStore } from '@reduxjs/toolkit';
import NumberGridSlice  from '../NumberGridWithRedux/slice';

export const store = configureStore({
    reducer: {
        grid: NumberGridSlice,
    },
});
