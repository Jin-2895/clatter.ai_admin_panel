// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { TabContent, TabPane } from 'reactstrap'


// ** User Components
import UserActivityDetails from './UserActivityDetails'
import UserSubscriptionDetails from './UserSubscriptionDetails'

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserSubscriptionDetails />
          <UserActivityDetails />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
