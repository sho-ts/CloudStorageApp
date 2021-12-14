import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'flash',
  initialState: {
    message: '',
    active: false,
    type: 0
  },
  reducers: {
    setFlash: ((state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.active = true;
    }),
    hidden: ((state) => {
      state.message = '';
      state.active = false;
      state.type = 0;
    })
  },
});

export const { setFlash, hidden } = slice.actions;

export default slice.reducer;