// ** React Imports
import { Coffee, X } from 'react-feather'
import toast from 'react-hot-toast'
import Avatar from '@components/avatar'

const Toasts = ({ name, role, message, error }) => {
  toast((t) => {
    return (
      <div className='d-flex'>
        {name && (
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
          </div>
        )}
        <div className='d-flex flex-column'>
          <div className='d-flex justify-content-between'>
            {name && <h6>{name}</h6>}
            {/* <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} /> */}
          </div>
          {role && (
            <span>You have successfully logged in as an {role} user to Client. Now you can start to explore. Enjoy!</span>
          )}
          {message && (
            <span>{message}</span>
          )}
          {error && (
            <span className='text-danger'>{error}</span>
          )}
        </div>
      </div>
    )
  })
}

export default Toasts
