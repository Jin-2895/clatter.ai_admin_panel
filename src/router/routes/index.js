// ** React Imports
import { Fragment } from 'react'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import HorizontalLayout from '@src/layouts/HorizontalLayout'
import LayoutWrapper from '@src/@core/layouts/components/layout-wrapper'

// ** Route Components
import PublicRoute from '@components/routes/PublicRoute'
import PrivateRoute from '@components/routes/PrivateRoute'

// ** Utils
import { isObjEmpty } from '@utils'
import { Navigate } from 'react-router-dom'
import { lazy } from 'react'
import { getUserData } from '../../utility/Utils'

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = '%s - Clatter Admin'

// ** Default Route
const DefaultRoute = '/dashboard'

// ** Import lazy route
const DashboardAnalytics = lazy(() => import('../../views/dashboard/analytics'))
const UsersList = lazy(() => import('../../views/apps/user'))
const UserView = lazy(() => import('../../views/apps/user/view'))
const SubscriptionTable = lazy(() => import("../../views/sales/subscription"))
const TransactionTable = lazy(() => import("../../views/sales/transaction"))
const Admin = lazy(() => import("../../views/admin"))

// ** Merge Routes
const Routes = [
  {
    index: true,
    path: '/',
    element: <Navigate to={DefaultRoute} />
  },
  {
    index: true,
    path: '/dashboard',
    element: <DashboardAnalytics />,
    access: 'admin'
  },
  {
    index: true,
    element: <UsersList />,
    path: '/user',
    protected: true,
    access: 'admin'
  },
  {
    index: true,
    path: '/sales/transaction',
    element: <TransactionTable />,
    protected: true,
    access: 'admin'
  },
  {
    index: true,
    path: '/sales/subscription',
    element: <SubscriptionTable />,
    protected: true,
    access: 'admin'
  },
  {
    index: true,
    path: '/user/view',
    element: <Navigate to='/user/view/1' />,
    protected: true,
    access: 'admin'
  },
  {
    index: true,
    element: <UserView />,
    path: '/user/view/:id',
    protected: true,
    access: 'admin'
  },
  {
    index: true,
    path: '/admin',
    element: <Admin />,
    protected: true,
    access: 'superAdmin'
  },
]

const getRouteMeta = route => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const user = getUserData()
  const LayoutRoutes = []
  if (user?.role === "superAdmin") {
    Routes.filter(route => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      ) {
        let RouteTag = PublicRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
              LayoutWrapper
              : Fragment;

          if (route.protected) {
            route.element = (
              <Wrapper {...(isBlank === true ? getRouteMeta(route) : {})}>
                <RouteTag route={route}>{route.element}</RouteTag>
              </Wrapper>
            );
          } else {
            route.element = (
              <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
                {route.element}
              </Wrapper>
            );
          }
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })

  } else {
    const otherRoutes = Routes.filter(item => item.access !== 'superAdmin');
    otherRoutes.filter(route => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      ) {
        let RouteTag = PublicRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
              LayoutWrapper
              : Fragment;

          if (route.protected) {
            route.element = (
              <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
                <RouteTag route={route}>{route.element}</RouteTag>
              </Wrapper>
            );
          } else {
            route.element = (
              <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
                {route.element}
              </Wrapper>
            );
          }
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }

  return LayoutRoutes
}

const getRoutes = (layout) => {
  const defaultLayout = layout || 'vertical'
  const layouts = ['vertical', 'horizontal', 'blank']

  const AllRoutes = []

  layouts.forEach(layoutItem => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }
