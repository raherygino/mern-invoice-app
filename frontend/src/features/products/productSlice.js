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
    },
    get : {
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
    },
    show : {
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
      const token = thunkAPI.getState().auth.userAuth.token
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

// Create get products
export const getProducts = createAsyncThunk(
  'product/get',
  async (_, thunkAPI) => {
    try {
      const organization = thunkAPI.getState().auth.userAuth.organization
      return await productService.getProducts(organization)
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

// Create get product
export const getProduct = createAsyncThunk(
  'product/show',
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id)
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

            .addCase(getProducts.pending, (state) => {
                state.get.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.get.isLoading = false
                state.get.isSuccess = true
                state.products = action.payload
            }) 
            .addCase(getProducts.rejected, (state, action) => {
                state.get.isLoading = false
                state.get.isError = true
                state.get.message = action.payload
            })

            .addCase(getProduct.pending, (state) => {
                state.show.isLoading = true
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.show.isLoading = false
                state.show.isSuccess = true
                state.product = action.payload
            }) 
            .addCase(getProduct.rejected, (state, action) => {
                state.show.isLoading = false
                state.show.isError = true
                state.show.message = action.payload
            })
    }
})

export const { reset } = productSlice.actions
export default productSlice.reducer

