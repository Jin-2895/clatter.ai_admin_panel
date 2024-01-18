// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { userActivityDetailAction } from '../../../../redux/user/userAction'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useParams } from 'react-router-dom'
import moment from 'moment'

export const columns = [
  {
    sortable: true,
    minWidth: '300px',
    name: 'Type',
    selector: row => row.type,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder text-capitalize'>{row.type}</span>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Status',
    selector: row => {
      return (
        <div className='text-capitalize'>
          {row.status}
        </div>
      )
    }
  },
  {
    name: 'Used Credit',
    selector: row => {
      return (
        <div>
          {row.creditsBurned}
        </div>
      )
    }
  },
  {
    name: "Created At",
    selector: row => {
      return (
        <div className='d-flex justify-content-left align-items-center' >
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{moment(row.createdAt).format("DD-MM-YYYY")}</span>
            <small>{moment(row.createdAt).format("hh:mm A")}</small>
          </div>
        </div >
      )
    }
  },
]

const UserActivityDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const { userActDetailsData, userActDetailsLoading, userActDetailsError } = useSelector((state) => state.user)

  useEffect(() => {
    let limit = 4
    dispatch(userActivityDetailAction({ page, limit, id }))
  }, [dispatch, page, id])

  // ** Function in get data on page change
  const handlePagination = page => {
    setPage(page.selected + 1)
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(userActDetailsData?.totalNotifications / 10))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={page !== 0 ? page - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }

  return (
    <Card>
      <CardHeader tag='h4'>Credit Usage Timeline</CardHeader>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          responsive
          pagination
          paginationServer
          columns={columns}
          data={userActDetailsData?.notifications}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
        />
      </div>
    </Card>
  )
}

export default UserActivityDetails
