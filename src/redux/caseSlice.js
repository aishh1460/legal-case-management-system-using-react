import { createSlice, nanoid } from '@reduxjs/toolkit';

const loadFromLocal = () => {
  try {
    const raw = localStorage.getItem('cases_v1');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const initialState = {
  list: loadFromLocal(),
};

const persist = (list) => {
  try {
    localStorage.setItem('cases_v1', JSON.stringify(list));
  } catch {}
};

const caseSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    addCase: {
      reducer(state, action) {
        state.list.push(action.payload);
        persist(state.list);
      },
      prepare(data) {
        return {
          payload: {
            id: nanoid(),
            ...data,
          },
        };
      },
    },
    updateCase(state, action) {
      const idx = state.list.findIndex(c => c.id === action.payload.id);
      if (idx !== -1) {
        state.list[idx] = action.payload;
        persist(state.list);
      }
    },
    deleteCase(state, action) {
      state.list = state.list.filter(c => c.id !== action.payload);
      persist(state.list);
    },
    setStatus(state, action) {
      const { id, status } = action.payload;
      const c = state.list.find(x => x.id === id);
      if (c) {
        c.status = status;
        persist(state.list);
      }
    },
  },
});

export const { addCase, updateCase, deleteCase, setStatus } = caseSlice.actions;
export default caseSlice.reducer;
