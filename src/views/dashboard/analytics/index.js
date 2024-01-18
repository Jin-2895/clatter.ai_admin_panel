// ** Reactstrap Imports
import { Row, Col, CardHeader, CardBody, Card, Label } from 'reactstrap'
import Select from 'react-select'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import { User, UserCheck, UserPlus, UserX } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { dashAction } from '../../../redux/dashboard/dashboardAction'
import InvoiceList from './InvoiceList'

// ** SVGs
import Subscriber from "../../../@core/assets/svgs/Subscriber"
import Registered from "../../../@core/assets/svgs/Registered"
import Sales from "../../../@core/assets/svgs/Sales"
import ActiveUser from "../../../@core/assets/svgs/ActiveUser"
import CompanyPlan from "../../../@core/assets/svgs/CompanyPlan"
import AgencyPlan from "../../../@core/assets/svgs/AgencyPlan"
import CreatorPlan from "../../../@core/assets/svgs/CreatorPlan"


// ** Utils
import { selectThemeColors } from '@utils'
import moment from 'moment'

const AnalyticsDashboard = () => {
  const dispatch = useDispatch()
  const [currentFilter, setCurrentFilter] = useState({ value: 'packagesSoldAll', label: 'All' })
  const { dashboardData, dashboardLoading, dashBoardError } = useSelector(state => state.dashboard)

  useEffect(() => {
    dispatch(dashAction())
  }, [])


  const filterOptions = [
    { value: 'packagesSoldAll', label: 'All' },
    { value: 'packagesSoldToday', label: 'Today' },
    { value: 'packagesSoldMonthly', label: 'Monthly' },
  ]

  const handleCurrentFilter = (value) => {
    if (!value) {
      return
    }
    if (value.value !== '' && value.label) {
      setCurrentFilter({ value: value.value, label: value.label })
    } else {
      setCurrentFilter({ value: value.value, label: value.value })
    }
  }

  return (
    <div id='dashboard-analytics'>
      <Card>
        <CardHeader>

          <div className='d-flex justify-content-between w-100'>
            <h4 className='card-title'>Daily Stats</h4>
            <h4 className='card-title'>
              {moment().format("DD-MMMM-YYYY")}
            </h4>
          </div>
        </CardHeader>

        <CardBody>
          <Row className='match-height'>
            {dashboardData ?
              dashboardData?.dailyStats?.map((item) => {
                let icon = null;
                if (item.title === "Subscribers") {
                  icon = <Subscriber size={15} />
                } else if (item.title === "Signup") {
                  icon = <Registered size={15} />
                } else if (item.title === "Sales") {
                  icon = <Sales size={15} />
                } else {
                  icon = <ActiveUser size={15} />
                }
                return (
                  <Col lg='3' sm='6' key={item.title}>
                    <StatsHorizontal
                      className="shadow-lg"
                      statTitle={item?.title}
                      icon={icon}
                      renderStats={<h3 className='fw-bolder mb-75'>{item?.title === "Sales" ? `$${item?.count}` : item?.count}</h3>}
                    />
                  </Col>
                )
              }) : null}

          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <div className='d-flex justify-content-between w-100'>
            <h4 className='card-title'>Monthly Stats</h4>
            <h4>
              {moment().format("MMMM-YYYY")}
            </h4>
          </div>
        </CardHeader>

        <CardBody>
          <Row className='match-height'>
            {dashboardData ?
              dashboardData?.monthlyStats?.map((item) => {
                let icon = null;
                if (item.title === "Subscribers") {
                  icon = <Subscriber size={15} />
                } else if (item.title === "Signup") {
                  icon = <Registered size={15} />
                } else if (item.title === "Sales") {
                  icon = <Sales size={15} />
                } else {
                  icon = <ActiveUser size={15} />
                }
                return (
                  <Col lg='3' sm='6' key={item.title}>
                    <StatsHorizontal
                      className="shadow-lg"
                      statTitle={item?.title}
                      icon={icon}
                      renderStats={<h3 className='fw-bolder mb-75'>{item?.title === "Sales" ? `$${item?.count}` : item?.count}</h3>}
                    />
                  </Col>
                )
              }) : null}

          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <div className='d-flex justify-content-between w-100'>
            <h4 className='card-title'>Plans Sold</h4>
            <div className='d-flex gap-1'>
              <Select
                isClearable={false}
                value={currentFilter || ''}
                options={filterOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                onChange={handleCurrentFilter}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {currentFilter.value === "packagesSoldAll" && (
            <Row className='match-height'>
              {dashboardData?.packagesSoldAll?.map((item) => {
                let icon = null;
                if (item.name === "Creator Monthly Plan") {
                  icon = <CreatorPlan size={15} />
                } else if (item.name === "Agency Monthly Plan") {
                  icon = <AgencyPlan size={15} />
                } else if (item.name === "Company Monthly Plan") {
                  icon = <CompanyPlan size={15} />
                }
                return (
                  <>
                    {item.name !== "Free Trial" && (
                      <Col lg='4' sm='6' key={item.id}>
                        <StatsHorizontal
                          className="shadow-lg"
                          statTitle={item.name}
                          icon={icon}
                          renderStats={
                            <h3 className='fw-bolder mb-75 d-flex flex-column'>
                              <span>{item.totalPlanSold}</span>
                            </h3>
                          }
                        />
                      </Col>
                    )}
                  </>
                )
              })}

            </Row>
          )}
          {currentFilter.value === "packagesSoldToday" && (
            <Row className='match-height'>
              {dashboardData?.packagesSoldToday?.map((item) => {
                let icon = null;
                if (item.name === "Creator Monthly Plan") {
                  icon = <CreatorPlan size={15} />
                } else if (item.name === "Agency Monthly Plan") {
                  icon = <AgencyPlan size={15} />
                } else if (item.name === "Company Monthly Plan") {
                  icon = <CompanyPlan size={15} />
                }
                return (
                  <>
                    {item.name !== "Free Trial" && (
                      <Col lg='4' sm='6' key={item.id}>
                        <StatsHorizontal
                          className="shadow-lg"
                          statTitle={item.name}
                          icon={icon}
                          renderStats={
                            <h3 className='fw-bolder mb-75 d-flex flex-column'>
                              <span>{item.totalPlanSold}</span>
                            </h3>
                          }
                        />
                      </Col>
                    )}
                  </>
                )
              })}

            </Row>
          )}
          {currentFilter.value === "packagesSoldMonthly" && (
            <Row className='match-height'>
              {dashboardData?.packagesSoldMonthly?.map((item) => {
                let icon = null;
                if (item.name === "Creator Monthly Plan") {
                  icon = <CreatorPlan size={15} />
                } else if (item.name === "Agency Monthly Plan") {
                  icon = <AgencyPlan size={15} />
                } else if (item.name === "Company Monthly Plan") {
                  icon = <CompanyPlan size={15} />
                }
                return (
                  <>
                    {item.name !== "Free Trial" && (
                      <Col lg='4' sm='6' key={item.id}>
                        <StatsHorizontal
                          className="shadow-lg"
                          statTitle={item.name}
                          icon={icon}
                          renderStats={
                            <h3 className='fw-bolder mb-75 d-flex flex-column'>
                              <span>{item.totalPlanSold}</span>
                            </h3>
                          }
                        />
                      </Col>
                    )}
                  </>
                )
              })}

            </Row>
          )}
        </CardBody>
      </Card>

      <Row>
        <Col xxl='10' xl='12' lg='12' sm='12'>
          <InvoiceList tableData={dashboardData?.data.latestSubs} />
        </Col>
      </Row>
    </div >
  )
}

export default AnalyticsDashboard
