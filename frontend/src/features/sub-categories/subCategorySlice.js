import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import subCategoryService from './subCategoryService'

const initialState = {
  subCategories: [],
  subCategory: {},
  isError: false,
  isSuccess: false,
  isLoadingCreating: false,
  isCreated: false,
  isErrorCreated: false,
  isLoading: false,
  message: '',
}

// Get subcategories
export const getSubCategories = createAsyncThunk(
  'subcategories/',
  async (_, thunkAPI) => {
    try {
      const organization = thunkAPI.getState().auth.user.organization
      return await subCategoryService.getSubCategories(organization)
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

// Get subcategory
export const getSubCategoriesByCategory = createAsyncThunk(
  'subcategories/bycategory',
  async (category, thunkAPI) => {
    try {
      return await subCategoryService.getSubCategoriesByCategory(category)
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

// Update subcategory
export const updateSubCategory = createAsyncThunk(
  'subcategories/update',
  async (subCategoryData , thunkAPI) => {
    try {
      return await subCategoryService.updateSubCategory(subCategoryData)
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

// Create new subcategory
export const createSubCategory = createAsyncThunk(
  'subcategories/create',
  async (categoryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await subCategoryService.createSubCategory(categoryData, token)
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

export const subCategorySlice = createSlice({
  name: 'subcategory',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubCategory.pending, (state) => {
        state.isLoadingCreating = true
        state.isCreated = false
        state.isErrorCreated = null
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.isLoadingCreating = false
        state.isSuccess = true
        if (action.payload.message !== undefined) {
          state.isCreated = false
          state.subCategory = {}
          state.isErrorCreated = true
          state.message = action.payload.message
        } else {
          state.isCreated = true
          state.subCategory = action.payload
          state.isErrorCreated = false
        }
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.isLoadingCreating = false
        state.isError = true
        state.isErrorCreated = true
        state.isCreated = false
        state.message = action.payload
      })

      .addCase(getSubCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.subCategories = action.payload
      })
      .addCase(getSubCategories.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getSubCategoriesByCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSubCategoriesByCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.subCategories = action.payload
      })
      .addCase(getSubCategoriesByCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(updateSubCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.subCategories = action.payload
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

  },
})

export const { reset } = subCategorySlice.actions
export default subCategorySlice.reducer
