import { configureStore } from '@reduxjs/toolkit';
import caseReducer from './caseSlice';

const store = configureStore({
  reducer: {
    cases: caseReducer,
  },
});

export default store;
