// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'


// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import moment from 'moment/moment'

// ** Renders Client Columns
const renderClient = row => {
  if (row?.avatar?.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />

  } else {
    let fullName = row.firstName + " " + row.lastName
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={fullName || 'John Doe'}
      />
    )
  }
}

const statusObj = {
  active: 'light-success',
  deactivated: 'light-warning',
  inactive: 'light-secondary',
  banned: 'light-danger',
}

export const columns = [
  {
    name: 'User',
    sortable: true,
    minWidth: '260px',
    sortField: 'fullName',
    selector: row => (row.firstName + row.lastName),
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/user/view/${row.id}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder text-capitalize'>{row.firstName} {row.lastName}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Status',
    sortable: true,
    minWidth: '100px',
    sortField: 'userStatus',
    selector: row => row.userStatus,
    cell: row => (
      <Badge className='text-capitalize d-flex flex-column' color={statusObj[row.userStatus]} pill>
        <span className='text-capitalize'>{row.userStatus}</span>
      </Badge>
    )

  },
  {
    name: 'Plan',
    minWidth: '135px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.plan,
    cell: row => <span className='text-capitalize'>{row.plan}</span>
  },
  {
    name: 'Subscription Status',
    minWidth: '140px',
    sortable: true,
    sortField: 'subscription',
    selector: row => row.subscriptionStatus,
    cell: row => (
      <Badge className='text-capitalize d-flex flex-column' color={statusObj[row.subscriptionStatus]} pill>
        <span className='text-capitalize'>{row.subscriptionStatus}</span>
      </Badge>
    )
  },
  {
    name: 'Created At',
    minWidth: '100px',
    sortable: true,
    sortField: 'createdAt',
    selector: row => row.createdAt,
    cell: row => (
      <div className='text-capitalize d-flex flex-column'>
        <span>
          {moment(row.createdAt).format("MM/DD/YY")}
        </span>
        <smal>{moment(row.createdAt).format("hh:mm A")}</smal>
      </div>
    )
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/user/view/${row.id}`}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem tag={Link} to={`/user/view/${row.id}&edit=true`} className='w-100' >
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
