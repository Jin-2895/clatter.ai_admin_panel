// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './auth/authSlice'
import dashboard from "./dashboard/dashboardSlice"
import user from "./user/userSlice"
import subscription from "./subscription/subscriptionSlice"
import admin from "./createAdmin/adminSlice"

const rootReducer = {
  auth,
  navbar,
  layout,
  dashboard,
  user,
  subscription,
  admin
}

export default rootReducer
