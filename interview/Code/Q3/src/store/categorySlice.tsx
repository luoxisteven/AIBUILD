import { createSlice } from '@reduxjs/toolkit';

// Slice = Action + Reducer
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    data: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;