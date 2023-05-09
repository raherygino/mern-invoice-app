import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/users/userSlice'
import organizationReducer  from '../features/organization/organizationSlice'
import categoryReducer from '../features/categories/categorySlice'
import subCategorySlice from '../features/sub-categories/subCategorySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    organization: organizationReducer,
    categories: categoryReducer,
    subCategories: subCategorySlice
  },
})
