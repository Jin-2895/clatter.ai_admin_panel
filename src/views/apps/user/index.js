// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col, CardBody, CardHeader, Card } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { allUserAction } from '../../../redux/user/userAction'

// ** svgs
import Subscriber from "../../../@core/assets/svgs/Subscriber"
import ActiveUser from "../../../@core/assets/svgs/ActiveUser"

const UsersList = () => {
  const dispatch = useDispatch()
  const { allUserData, allUserDataLoading, allUserDataError } = useSelector(state => state.user)


  useEffect(() => {
    dispatch(allUserAction())
  }, [])

  return (
    <div className='app-user-list'>
      <Card >
        <CardHeader>
          <h4 className='card-title'>User Stats</h4>
        </CardHeader>
        <CardBody>
          <Row>
            {allUserData?.stats?.map((item) => {
              let icon = null;
              if (item.title === "Total Users") {
                icon = <Subscriber size={15} />
              } else if (item.title === "Active Users") {
                icon = <ActiveUser size={15} />
              } else {
                icon = <Subscriber size={15} />
              }

              return (
                <Col lg='4' sm='6'>
                  <StatsHorizontal
                    className="shadow-lg"
                    statTitle={item?.title}
                    icon={icon}
                    renderStats={<h3 className='fw-bolder mb-75'>{item?.count}</h3>}
                  />
                </Col>
              )
            })}
          </Row>
        </CardBody>
      </Card>

      <Table allUserData={allUserData?.data} total={allUserData?.total} url={allUserData?.url} />

    </div>
  )
}

export default UsersList
