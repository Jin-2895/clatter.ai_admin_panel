// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/HorizontalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/horizontal'
import { getUserData } from '../utility/Utils'

const HorizontalLayout = props => {
  const user = getUserData()

  if (user.role === "superAdmin") {
    return (
      <Layout menuData={navigation} {...props}>
        <Outlet />
      </Layout>
    )
  } else {
    const otherItems = navigation.filter(item => item.access !== 'superAdmin');
    return (
      <Layout menuData={otherItems} {...props}>
        <Outlet />
      </Layout>
    )
  }
}

export default HorizontalLayout
