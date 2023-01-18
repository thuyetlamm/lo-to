const { createSlice } = require('@reduxjs/toolkit');

const GlobalState = createSlice({
  name: 'globalState',
  initialState: {
    numberArray : []
  },
  reducers: {
    addNumber(state, action) {
      state.numberArray.push(action.payload);
    },
  },
});

const { reducer, actions } = GlobalState;

export const { addNumber } = actions;
export default reducer;