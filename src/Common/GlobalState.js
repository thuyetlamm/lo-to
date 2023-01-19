const { createSlice } = require('@reduxjs/toolkit');

const GlobalState = createSlice({
  name: 'globalState',
  initialState: {
    numberArray : [],
    number : 0
  },
  reducers: {
    addNumber(state, action) {
      state.numberArray.push(action.payload);
    },
    setNumber(state, action) {
      state.number = action.payload;
    }
  },
});

const { reducer, actions } = GlobalState;

export const { addNumber ,setNumber} = actions;
export default reducer;