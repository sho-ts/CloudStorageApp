import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'windowSize',
  initialState: {
    isSmallWindowSize: ''
  },
  reducers: {
    setIsSmallWindowSize: ((state, action) => {
      state.isSmallWindowSize = action.payload;
    })
  },
});

export const { setIsSmallWindowSize } = slice.actions;

export default slice.reducer;