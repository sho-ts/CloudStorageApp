import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'search',
  initialState: {
    keyword: ''
  },
  reducers: {
    setSearchKeyword: ((state, action) => {
      state.keyword = action.payload;
    })
  },
});

export const { setSearchKeyword } = slice.actions;

export default slice.reducer;