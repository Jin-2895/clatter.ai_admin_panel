// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '@utils'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/not-authorized.svg'
import illustrationsDark from '@src/assets/images/pages/not-authorized-dark.svg'

// ** Styles
import '@styles/base/pages/page-misc.scss'

const NotAuthorized = () => {
  // ** Hooks
  const { skin } = useSkin()

  // ** Vars
  const user = getUserData()

  const source = skin === 'dark' ? illustrationsDark : illustrationsLight

  return (
    <div className='misc-wrapper'>
      <Link className='brand-logo' to='/'>
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
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>You are not authorized! 🔐</h2>
          <Button
            tag={Link}
            color='primary'
            className='btn-sm-block mb-1'
            to={user ? getHomeRouteForLoggedInUser(user.role) : '/'}
          >
            Back to Home
          </Button>
          <img className='img-fluid' src={source} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
