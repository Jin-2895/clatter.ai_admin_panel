// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert, Breadcrumb, BreadcrumbItem, Card, CardBody } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import PlanCard from './PlanCard'
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { singleUserAction } from '../../../../redux/user/userAction'

const UserView = () => {
  const [active, setActive] = useState('1')
  // ** Hooks
  const { id } = useParams()
  // ** Store Vars
  const { singleUserData, singleUserLoading, singleUserError } = useSelector(state => state.user)
  const { statusUserData } = useSelector((state) => state.user)
  const { cancelSubData, subscriptionData } = useSelector((state) => state.subscription)
  const dispatch = useDispatch()
  const [toggleStateOfModal, setToggleStateOfModal] = useState(false)



  // ** Get suer on mount
  useEffect(() => {
    if (id) {
      if (id.includes('&edit=true')) {
        const parts = id.split('&');
        let userID = parts[0];
        setToggleStateOfModal(true)
        dispatch(singleUserAction(userID))
      } else {
        dispatch(singleUserAction(id))
      }

    }
  }, [dispatch, id, cancelSubData, subscriptionData, statusUserData])

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  // return store.selectedUser !== null && store.selectedUser !== undefined ? (
  return id ? (
    <div className='app-user-view'>
      <Card>
        <CardBody>
          <Breadcrumb >
            <BreadcrumbItem><a href="/user">User</a></BreadcrumbItem>
            <BreadcrumbItem active className='fw-bold'>Profile</BreadcrumbItem>
          </Breadcrumb>
        </CardBody>
      </Card>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard toggleStateOfModal={toggleStateOfModal} setToggleStateOfModal={setToggleStateOfModal} selectedUser={singleUserData?.data} loading={singleUserLoading} error={singleUserError} />
          <PlanCard selectedUser={singleUserData?.data} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        {/* User with id: {id} doesn't exist. Check list of all Users: <Link to='/user/list'>Users List</Link> */}
      </div>
    </Alert>
  )
}
export default UserView
