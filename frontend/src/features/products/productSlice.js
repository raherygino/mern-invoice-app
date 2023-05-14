import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'


const initialState = {
    products : [],
    product : {},
    createOrUpdate: {
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
    }
}

// Create new product
export const createProduct = createAsyncThunk(
  'product/create',
  async (productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.createProduct(productData, token)
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

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.createOrUpdate.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.createOrUpdate.isLoading = false
                state.createOrUpdate.isSuccess = true
                state.createOrUpdate.message = 'Product created !'
                state.product = action.payload
            }) 
            .addCase(createProduct.rejected, (state, action) => {
                state.createOrUpdate.isLoading = false
                state.createOrUpdate.isError = true
                state.createOrUpdate.message = action.payload
            })
    }
})

export const { reset } = productSlice.actions
export default productSlice.reducer

