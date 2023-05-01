import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/users/userSlice'
import organizationReducer  from '../features/organization/organizationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    organization: organizationReducer
  },
})
