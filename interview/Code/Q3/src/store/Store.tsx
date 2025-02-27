import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';


// Redux Store
export const store = configureStore({
  reducer: {
    category: categoryReducer
  }
});

// Define RootState type for useSelector hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;