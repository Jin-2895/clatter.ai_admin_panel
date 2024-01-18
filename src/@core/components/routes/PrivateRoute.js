// ** React Imports
import { Navigate } from 'react-router-dom'
import { Suspense } from 'react'


// ** Spinner Import
import Spinner from '../spinner/Loading-spinner'

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const user = JSON.parse(localStorage.getItem('userData'))

  if (route) {
    let restrictedRoute = false

    if (route.meta) {
      restrictedRoute = route.meta.restricted
    }
    if (!user) {
      return <Navigate to='/login' />
    }
    if (user && user.role === 'superAdmin') {
      return <Navigate to='/' />
    }
    if (user && restrictedRoute && user.role === 'admin') {
      return <Navigate to='/' />
    }
  }

  return <Suspense fallback={<Spinner className='content-loader' />}>{children}</Suspense>
}

export default PrivateRoute
