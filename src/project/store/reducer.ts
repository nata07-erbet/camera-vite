import { createReducer } from "@reduxjs/toolkit";
import { action } from './action.ts'
import {  initialState } from './state.ts';


const reducer = createReducer(initialState, (builder) => {
  builder.addCase(action, (state) => state)
});

export { reducer }
