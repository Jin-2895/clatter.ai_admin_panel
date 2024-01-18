// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Reactstrap Imports
import { Row, Col, Label, Card, CardBody, Badge, Progress, Button, Modal, ModalBody, ModalHeader, Spinner, CardHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import withReactContent from 'sweetalert2-react-content'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
import { useDispatch, useSelector } from 'react-redux'
import { cancelSubAction, subAction } from '../../../../redux/subscription/subscriptionAction'
import { useParams } from 'react-router-dom'

const planOptions = [
  { value: 'creator_monthly_plan', label: 'Creator Monthly Plan - $47/month' },
  { value: 'agency_monthly_plan', label: 'Agency Monthly Plan - $197/month' },
  { value: 'company_monthly_plan', label: 'Company Monthly Plan - $497/month' }
]

const MySwal = withReactContent(Swal)

const PlanCard = ({ selectedUser }) => {
  const { id } = useParams()
  // ** State
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [currentPlan, setCurrentPlan] = useState('')
  const { subscriptionLoading, subscriptionError } = useSelector((state) => state.subscription)

  const handleConfirmCancel = () => {
    return MySwal.fire({
      title: '',
      text: 'Are you sure you would like to cancel your subscription?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        dispatch(cancelSubAction(id))
        MySwal.fire({
          icon: 'success',
          title: 'Unsubscribed!',
          text: 'Subscription cancelled successfully.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Unsubscription Cancelled!!',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  useEffect(() => {
    if (selectedUser) {
      if (selectedUser?.planName === 'Creator Monthly Plan') {
        setCurrentPlan({ value: 'creator_monthly_plan', label: "Creator Monthly Plan - $47/month" })
      } else if (selectedUser?.planName === 'Agency Monthly Plan') {
        setCurrentPlan({ value: 'agency_monthly_plan', label: "Agency Monthly Plan - $197/month" })
      } else {
        setCurrentPlan({ value: 'company_monthly_plan', label: "Company Monthly Plan - $497/month" })
      }

    }
  }, [selectedUser])

  const handleUpgradeChange = (value) => {
    if (!value) {
      return
    }
    if (value.value !== "" && value.label) {
      setCurrentPlan({ value: value.value, label: value.label })
    } else {
      setCurrentPlan({ value: value.value, label: value.value })
    }
  }

  const handleUpgrade = () => {
    let body = {
      email: selectedUser.email,
      plan: currentPlan.value
    }
    dispatch(subAction(body))

  }

  return (
    <Fragment>
      <Card className='plan-card border-primary'>
        {subscriptionLoading !== 'idle' ? (
          <CardBody>
            <Spinner
              style={{ width: "2rem", height: "2rem" }}
            />
          </CardBody>
        ) : (
          <>
            {selectedUser?.planName ? (
              <CardBody>
                <div className='d-flex justify-content-between align-items-start'>
                  <div className='d-flex gap-1'>
                    <Badge color='light-primary'>{selectedUser?.planName}</Badge>
                    {selectedUser?.remainingDays === 0 ? <Badge color='danger'>Expired</Badge> : null}
                  </div>

                  <div className='d-flex justify-content-center'>
                    <sup className='h5 pricing-currency text-primary mt-1 mb-0'>$</sup>
                    <span className='fw-bolder display-5 mb-0 text-primary'>{selectedUser?.planAmount}</span>
                    <sub className='pricing-duration font-small-4 ms-25 mt-auto mb-2'>/month</sub>
                  </div>
                </div>
                {selectedUser?.planName && (
                  <ul className='ps-1 mb-2 mt-50'>
                    <li className='mb-50'>Total Credit: {selectedUser?.credit}</li>
                    <li className='mb-50'>Used Credit: {selectedUser?.usedCredit}</li>
                  </ul>
                )}
                {selectedUser?.remainingDays < 0 ? (
                  <Badge color='danger'>Expired</Badge>
                ) : (
                  <>
                    {selectedUser?.remainingDays === 0 ? null : (
                      <div className='d-flex justify-content-between align-items-center fw-bolder mb-50'>
                        <span>{selectedUser?.remainingDays <= 1 ? "Day" : "Days"}</span>
                        <span>{selectedUser?.remainingDays} {selectedUser?.planName === "Free trial" ? "of 3 Days" : "of 30 Days"}</span>
                      </div>
                    )}
                  </>
                )}

                {selectedUser?.planName !== "Free Trial" && (
                  <>
                    <Progress className='mb-50' value={selectedUser?.planName === "Free Trial" ? (((30 - 29) / 30) * 100) : (((30 - selectedUser?.remainingDays) / 30) * 100)} style={{ height: '8px' }} />
                    <span>{selectedUser?.remainingDays} days remaining</span>
                  </>
                )}
                <div className='d-grid w-100 mt-2'>
                  <Button color='primary' onClick={() => setShow(true)}>
                    Upgrade Plan
                  </Button>
                </div>
              </CardBody>
            ) : (
              <>
                <CardHeader>
                  <h6 className='card-title'>Purchase Plan For User</h6>
                </CardHeader>
                <CardBody>
                  <div className='d-grid w-100 mt-2'>
                    <Button color='primary' onClick={() => setShow(true)}>
                      Buy Plan
                    </Button>
                  </div>
                </CardBody>
              </>
            )}
          </>
        )}
      </Card>

      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        {subscriptionLoading !== 'idle' ? null : (
          <ModalBody className='px-5 pb-2'>
            <div className='text-center mb-2'>
              <h1 className='mb-1'>{selectedUser?.planName ? "Upgrade Plan" : "Purchase Plan"}</h1>
              <p>Choose the best plan for user.</p>
            </div>
            <Row className='pt-50'>
              <Col sm={8}>
                <Label className='form-label'>Choose Plan</Label>
                <Select
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={handleUpgradeChange}
                  options={planOptions}
                  theme={selectThemeColors}
                  defaultValue={currentPlan}
                />
              </Col>
              <Col sm={4} className='text-sm-end mt-2'>
                <Button color='primary' onClick={() => handleUpgrade()}>{selectedUser?.planName ? "Upgrade" : "Purchase"}</Button>
              </Col>
            </Row>
          </ModalBody>
        )}

        {selectedUser?.planName && (<hr />)}
        {subscriptionLoading !== 'idle' ? (
          <ModalBody>
            <div className='w-100 h-100 mx-auto d-flex justify-content-center align-content-center'>
              <Spinner
                width="2rem"
                height="2rem"
              />
            </div>
          </ModalBody>
        ) : (
          <>
            {selectedUser?.planName !== "Free Trial" && (
              <>
                {selectedUser?.remainingDays !== 0 && (
                  <>
                    {selectedUser?.remainingDays > 1 && (
                      <ModalBody className='px-5 pb-3'>
                        <h6>User current plan is {selectedUser?.planName}</h6>
                        <div className='d-flex justify-content-between align-items-center flex-wrap'>
                          <div className='d-flex justify-content-center me-1 mb-1'>
                            <sup className='h5 pricing-currency pt-1 text-primary'>$</sup>
                            <h1 className='fw-bolder display-4 mb-0 text-primary me-25'>{selectedUser?.planAmount}</h1>
                            <sub className='pricing-duration font-small-4 mt-auto mb-2'>/month</sub>
                          </div>
                          <Button disabled={selectedUser?.planName === "Free Trial" ? true : false} outline color='danger' className='mb-1' onClick={handleConfirmCancel}>
                            Cancel Subscription
                          </Button>
                        </div>
                      </ModalBody>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Modal>
    </Fragment>
  )
}

export default PlanCard
