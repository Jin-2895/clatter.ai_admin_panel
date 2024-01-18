// ** React Imports
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Coffee, X } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  CardText,
  CardTitle,
  FormFeedback,
} from 'reactstrap'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/login-v2.svg'
import illustrationsDark from '@src/assets/images/pages/login-v2-dark.svg'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { authAction } from '../../../redux/auth/authAction'
import { getUserData } from '../../../utility/Utils'

const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>You have successfully logged in as an {role} user to Client. Now you can start to explore. Enjoy!</span>
      </div>
    </div>
  )
}

const defaultValues = {
  password: '',
  email: ''
}

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const source = skin === 'dark' ? illustrationsDark : illustrationsLight
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })



  const onSubmit = (data) => {
    let arg = {
      body: {
        email: data.email,
        password: data.password
      },
      navigate
    }
    dispatch(authAction(arg))
    // toast(t => (
    //   <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || ''} />
    // ))
  }

  useEffect(() => {
    const user = getUserData()
    if (user) {
      navigate("/")
    } else {
      return
    }
  }, [])

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <svg width="35" height="35" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M54.698 14.3914L42.6086 2.30198C41.1348 0.82815 39.1336 0 37.0482 0H19.9518C17.8664 0 15.8672 0.82815 14.3914 2.30198L2.30198 14.3914C0.82815 15.8652 0 17.8664 0 19.9518V37.0482C0 39.1336 0.82815 41.1328 2.30198 42.6086L14.3914 54.698C15.8652 56.1719 17.8664 57 19.9518 57H37.0482C39.1336 57 41.1328 56.1719 42.6086 54.698L54.698 42.6086C56.1719 41.1348 57 39.1336 57 37.0482V19.9518C57 17.8664 56.1719 15.8672 54.698 14.3914ZM44.1687 39.4003C44.1687 42.0331 42.0351 44.1667 39.4023 44.1667H17.5997C14.9669 44.1667 12.8333 42.0331 12.8333 39.4003V17.5997C12.8333 14.9669 14.9669 12.8333 17.5997 12.8333H39.4003C42.0331 12.8333 44.1667 14.9669 44.1667 17.5997V39.4003H44.1687Z" fill="url(#paint0_linear_560_112960)" />
            <defs>
              <linearGradient id="paint0_linear_560_112960" x1="15.5055" y1="8.6731" x2="45.0693" y2="53.7808" gradientUnits="userSpaceOnUse">
                <stop stop-color="#54D86A" />
                <stop offset="0.2114" stop-color="#177FFA" />
                <stop offset="0.5987" stop-color="#5A5CD3" />
                <stop offset="1" stop-color="#FE315A" />
              </linearGradient>
            </defs>
          </svg>
          <h2 className='brand-text text-primary ms-1'>Clatter AI</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to Clatter AI! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller
                  id='email'
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='example@clatter.com'
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='login-password'>
                  Password
                </Label>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button type='submit' color='primary' block>
                Sign in
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
