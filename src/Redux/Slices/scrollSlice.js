import { createSlice } from '@reduxjs/toolkit';

const scrollSlice = createSlice({
  name: 'scroll',
  initialState: {
    shouldScrollToSection: false,
  },
  reducers: {
    setScrollToSection: (state) => {
      state.shouldScrollToSection = true;
    },
  },
});

export const { setScrollToSection } = scrollSlice.actions;
export default scrollSlice.reducer;