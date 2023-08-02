import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createCategory,
  getCategories,
  removeCategory,
  changeCategory,
} from './categories-operations';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export interface Category {
  id?: number;
  userId: number;
  name: string;
}
interface CategoriesState {
  data: Category[];
  isLoading: boolean;
  isError: boolean | string | null | unknown;
}

const initialState: CategoriesState = {
  data: [],
  isLoading: false,
  isError: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    addCategory: (state, { payload }: PayloadAction<Category>) => {
      state.data.push(payload);
    },
    deleteCategory: (state, { payload }: PayloadAction<number>) => {
      state.data = state.data.filter(category => category.id !== payload);
    },
    updateCategory: (state, { payload }: PayloadAction<Category>) => {
      const { id, name } = payload;
      const categoryIndex = state.data.findIndex(category => category.id === id);
      if (categoryIndex !== -1) {
        state.data[categoryIndex].name = name;
      }
    },
    getCategoriesByUserId: (state, { payload }: PayloadAction<Category[]>) => {
      state.data = payload;
    },
  },
  extraReducers: builder => {
    builder
      // get categories
      .addCase(getCategories.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      // create categories
      .addCase(createCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, { payload }: PayloadAction<Category>) => {
        state.data.push(payload);
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      // updateCategory
      .addCase(changeCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(changeCategory.fulfilled, (state, { payload }: PayloadAction<Category>) => {
        const updatedCategory = payload;
        const index = state.data.findIndex(category => category.id === updatedCategory.id);
        if (index !== -1) {
          state.data[index] = updatedCategory;
        }
      })
      .addCase(changeCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      // deleteCategory
      .addCase(removeCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(removeCategory.fulfilled, (state, { payload }) => {
        state.data = state.data.filter(category => category.id !== payload);
      })
      .addCase(removeCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      });
  },
});

const persistConfig = {
  key: 'categories',
  storage,
  whitelist: ['data'], // Add the keys you want to persist for the categories slice
};

const categoryReducer = categoriesSlice.reducer;

const persistedCategoryReducer = persistReducer(persistConfig, categoryReducer);
export const { addCategory, deleteCategory, updateCategory, getCategoriesByUserId } =
  categoriesSlice.actions;
export default persistedCategoryReducer;
