import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import categoryService from './categoryService'

const initialState = {
  categories: [],
  category: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  stateCreate: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  message: '',
}

// Get categories
export const getCategories = createAsyncThunk(
  'categories/',
  async (_, thunkAPI) => {
    try {
      const organization = thunkAPI.getState().auth.user.organization
      return await categoryService.getCategories(organization)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get category
export const getCategory = createAsyncThunk(
  'category/',
  async (id, thunkAPI) => {
    try {
      const organization = thunkAPI.getState().auth.user.organization
      return await categoryService.getCategory(organization, id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update category
export const updateCategory = createAsyncThunk(
  'categories/update',
  async (categoryData , thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userAuth.token
      return await categoryService.updateCategory(categoryData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Create new category
export const createCategory = createAsyncThunk(
  'category/create',
  async (categoryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userAuth.token
      return await categoryService.createCategory(categoryData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.stateCreate.isLoading = true
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories = action.payload
        state.stateCreate.isLoading = false
        state.stateCreate.isSuccess = true
        state.stateCreate.message = 'Category created!'
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.stateCreate.isLoading = false
        state.stateCreate.isError = true
        state.stateCreate.message = action.payload
      })

      .addCase(getCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.category = action.payload
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.categories = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(updateCategory.pending, (state) => {
        state.stateCreate.isLoading = true
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.stateCreate.isLoading = false
        state.stateCreate.isSuccess = true
        state.stateCreate.categories = action.payload
        state.stateCreate.message = 'Category updated!'
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.stateCreate.isLoading = false
        state.stateCreate.isError = true
        state.stateCreate.message = action.payload
      })

  },
})

export const { reset } = categorySlice.actions
export default categorySlice.reducer
