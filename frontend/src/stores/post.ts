import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: 1,
  keyword: ''
}

const slice = createSlice({
  name: 'post',
  initialState: { ...initialState },
  reducers: {
    resetPostState: () => {
      return { ...initialState }
    },
    setPostState: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
  }
});

export default slice.reducer;
export const { setPostState, resetPostState } = slice.actions;