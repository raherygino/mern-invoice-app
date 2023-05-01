import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import organizationService from './organizationService'

const initialState = {
  organization: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get organization
export const getOrganization = createAsyncThunk(
  'organizations/show',
  async (_, thunkAPI) => {
    try {
      const id = thunkAPI.getState().auth.user.organization
      return await organizationService.getOrganization(id)
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

export const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrganization.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrganization.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.organization = action.payload
      })
      .addCase(getOrganization.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = organizationSlice.actions
export default organizationSlice.reducer
