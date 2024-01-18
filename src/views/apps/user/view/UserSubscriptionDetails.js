// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Label Images
import xdLabel from '@src/assets/images/icons/brands/xd-label.png'
import vueLabel from '@src/assets/images/icons/brands/vue-label.png'
import htmlLabel from '@src/assets/images/icons/brands/html-label.png'
import reactLabel from '@src/assets/images/icons/brands/react-label.png'
import sketchLabel from '@src/assets/images/icons/brands/sketch-label.png'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { userSubscriptionDetailAction } from '../../../../redux/user/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useParams } from 'react-router-dom'
import moment from 'moment'

export const columns = [
  {
    sortable: true,
    minWidth: '220px',
    name: 'Package',
    selector: row => row.name,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.name}</span>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Price',
    selector: row => {
      return (
        <div>
          ${row.amount}
        </div>
      )
    }
  },
  {
    name: 'Total Credit',
    selector: row => {
      return (
        <div>
          {row.subscriptionCredit}
        </div>
      )
    }
  },
  {
    name: 'Plan Credit',
    selector: row => {
      return (
        <div>
          {row.planCredit}
        </div>
      )
    }
  },
  {
    name: 'Purchase At',
    selector: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{moment(row.subscriptioncreatedAt).format("DD-MM-YYYY")}</span>
            <small>{moment(row.subscriptioncreatedAt).format("hh:mm A")}</small>
          </div>
        </div>

      )
    }
  },
  {
    name: 'Expire At',
    selector: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{moment(row.subscriptionEndingAt).format("DD-MM-YYYY")}</span>
            <small>{moment(row.subscriptionEndingAt).format("hh:mm A")}</small>
          </div>
        </div>

      )
    }
  },


]

const UserSubscriptionDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const { userSubDetailsData, userSubDetailsloading, userSubDetailsError } = useSelector((state) => state.user)
  const { subscriptionData } = useSelector(state => state.subscription)

  useEffect(() => {
    let limit = 4
    dispatch(userSubscriptionDetailAction({ page, limit, id }))
  }, [dispatch, page, id, subscriptionData])

  // ** Function in get data on page change
  const handlePagination = page => {
    setPage(page.selected + 1)
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(userSubDetailsData?.totalSubscriptions / 10))

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
      <CardHeader tag='h4'>Subscription Details</CardHeader>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          responsive
          pagination
          paginationServer
          columns={columns}
          data={userSubDetailsData?.data}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
        />
      </div>
    </Card>
  )
}

export default UserSubscriptionDetails
