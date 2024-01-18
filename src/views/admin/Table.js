// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, MoreVertical, Trash2, Archive, FileText } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Input,
    Label,
    Button,
    CardBody,
    CardTitle,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    Badge
} from 'reactstrap'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
// import { getAdminAction } from '../../redux/createAdmin/adminAction'
import moment from 'moment/moment'
import { deactivateAdminAction, deleteAdminAction, getAdminAction, updateAdminAction } from '../../redux/createAdmin/adminAction'
import { clearGetAdminData } from '../../redux/createAdmin/adminSlice'
import { handlePopState, updateQueryParams } from '../components/useQueryParams'

const MySwal = withReactContent(Swal)

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






// ** Table Header
const CustomHeader = ({ toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
    return (
        <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
            <Row>
                <Col xl='6' className='d-flex align-items-center p-0'>
                    <div className='d-flex align-items-center w-100'>
                        <label htmlFor='rows-per-page'>Show</label>
                        <Input
                            className='mx-50'
                            type='select'
                            id='rows-per-page'
                            value={rowsPerPage}
                            onChange={handlePerPage}
                            style={{ width: '5rem' }}
                        >
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                        </Input>
                        <label htmlFor='rows-per-page'>Entries</label>
                    </div>
                </Col>
                <Col
                    xl='6'
                    className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
                >
                    <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
                        <label className='mb-0' htmlFor='search-invoice'>
                            Search:
                        </label>
                        <Input
                            id='search-invoice'
                            className='ms-50 w-100'
                            type='text'
                            value={searchTerm}
                            onChange={e => handleFilter(e.target.value)}
                        />
                    </div>
                    <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
                        Add New Admin
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

const Table = ({ toggleSidebar, editAdminProfile, setEditAdminProfile, userID, setUserID }) => {
    const dispatch = useDispatch()
    // ** States
    const [sort, setSort] = useState('desc')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState('id')
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [allUserData, setAllUserData] = useState(null)
    const [total, setTotal] = useState(null)
    const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'All', number: 0 })

    const { getAdminData, deleteAdminData, deactivateAdminData, updateAdminData, createAdminData } = useSelector((state) => state.admin)

    useEffect(() => {
        let queryObj = {
            page: currentPage,
            status: currentStatus.value,
            limit: rowsPerPage,
            keyword: searchTerm,
        }
        const queryObjWithUpdate = { ...queryObj };
        if (userID) {
            queryObjWithUpdate.id = userID
        }
        updateQueryParams(queryObjWithUpdate)

        // Attach the popstate listener when the component mounts
        const popstateCallback = handlePopState(queryObjWithUpdate);
        window.addEventListener('popstate', popstateCallback);
        // Clean up the popstate listener when the component unmounts
        return () => {
            window.removeEventListener('popstate', popstateCallback);
        };
    }, [currentPage, rowsPerPage, searchTerm, currentStatus, searchTerm, userID]);

    useEffect(() => {

        if (deleteAdminData || deactivateAdminData || updateAdminData || createAdminData) {
            dispatch(clearGetAdminData)
            let obj = {
                page: currentPage,
                status: currentStatus.value,
                limit: rowsPerPage,
                keyword: searchTerm
            }
            dispatch(getAdminAction(obj))
        }
    }, [deleteAdminData, deactivateAdminData, updateAdminData, createAdminData])

    useEffect(() => {
        if (getAdminData) {
            setAllUserData(getAdminData?.admins)
            setTotal(getAdminData?.totalAdmins)
        }

    }, [getAdminData]);

    // ** Get data on mount
    useEffect(() => {
        let timerId; // To debounce the API call
        let obj = {
            page: currentPage,
            status: currentStatus.value,
            limit: rowsPerPage,
            keyword: searchTerm
        }

        if (searchTerm) {
            timerId = setTimeout(() => {
                dispatch(getAdminAction(obj))
            }, 3000)
        } else {
            timerId = setTimeout(() => {
                dispatch(getAdminAction(obj))
            }, 100)
        }
        if (allUserData) {
            timerId = setTimeout(() => {
                dispatch(getAdminAction(obj))
            }, 1000)
        }
        // Cleanup function to clear the debounce timer and prevent memory leaks
        return () => {
            clearTimeout(timerId);
        };
    }, [dispatch, currentPage, rowsPerPage, searchTerm, currentStatus, searchTerm])

    useEffect(() => {
        setCurrentPage(1)
    }, [currentStatus])

    const statusOptions = [
        { value: '', label: 'All', number: 0 },
        { value: 'active', label: 'Active', number: 1 },
        { value: 'deactivated', label: 'Deactivated', number: 2 },
        { value: 'deleted', label: 'Deleted', number: 3 }
    ]

    // ** Function in get data on page change
    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
    }

    // ** Custom Pagination
    const CustomPagination = () => {
        const count = Number(Math.ceil(total / rowsPerPage))

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={count || 1}
                activeClassName='active'
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
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

    // ** Table data to render
    const dataToRender = () => {
        const filters = {
            status: currentStatus.value,
            limit: rowsPerPage,
            q: searchTerm
        }

        const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k]?.length > 0
        })

        if (allUserData?.length > 0 && !isFiltered) {
            return allUserData
        } else if (allUserData?.length === 0 && isFiltered) {
            return []
        } else {
            return allUserData?.slice(0, rowsPerPage)
        }
    }

    const handleSort = (column, sortDirection) => {
        setSort(sortDirection)
        setSortColumn(column.sortField)
    }

    const handleCurrentStatus = (value) => {
        if (!value) {
            return
        }
        if (value.value !== '' && value.label) {
            setCurrentStatus({ label: value.label, value: value.value })
        } else {
            setCurrentStatus({ label: value.label, value: value.value })
        }

    }

    const columns = [
        {
            name: 'Full Name',
            sortable: true,
            minWidth: '300px',
            sortField: 'fullName',
            selector: row => (row.firstName + row.lastName),
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    {renderClient(row)}
                    <div className='d-flex flex-column'>
                        <div className='user_name text-truncate text-body'>
                            <span className='fw-bolder text-capitalize'>{row.firstName} {row.lastName}</span>
                        </div>
                        <small className='text-truncate text-muted mb-0'>{row.email}</small>
                    </div>
                </div>
            )
        },
        {
            name: 'Status',
            minWidth: '135px',
            sortable: true,
            sortField: 'adminStatus',
            selector: row => row.status,
            cell: row => (
                <Badge className='text-capitalize d-flex flex-column' color={statusObj[row.status]} pill>
                    <span className='text-capitalize'>{row.status}</span>
                </Badge>
            )

        },
        {
            name: 'Role',
            sortable: true,
            minWidth: '130px',
            sortField: 'role',
            selector: row => row.role,
            cell: row => <span className='text-capitalize'>{row.role}</span>

        },
        {
            name: 'Created At',
            minWidth: '140px',
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
                            <CustomDropDownUpdate toggleSidebar={toggleSidebar} row={row} />
                            <CustomDropDownDeactivate row={row} />
                            <CustomDropDownDelete row={row} />
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div >
            )
        }
    ]

    const CustomDropDownUpdate = ({ row, toggleSidebar }) => {
        const dispatch = useDispatch()

        const handleUpdate = () => {
            setEditAdminProfile(!editAdminProfile)
            debugger
            setUserID(row.id)
            dispatch(clearGetAdminData)
            toggleSidebar(row)
        }
        return (
            <DropdownItem
                tag='button'
                className='w-100'
                onClick={handleUpdate}
            >
                <Trash2 size={14} className='me-50' />
                <span className='align-middle'>Update</span>
            </DropdownItem>
        )
    }

    const CustomDropDownDelete = ({ row }) => {
        const dispatch = useDispatch()

        const handleDeleteAdminClick = async () => {
            dispatch(clearGetAdminData)
            return await MySwal.fire({
                title: 'Are you sure?',
                text: "You will be deleting admin!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Delete admin!',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ms-1'
                },
                buttonsStyling: false
            }).then(function (result) {
                if (result.value) {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Admin has been Deleted.',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    })
                    dispatch(deleteAdminAction(row.id))
                } else if (result.dismiss === MySwal.DismissReason.cancel) {
                    MySwal.fire({
                        title: 'Cancelled',
                        text: 'Cancelled Delete :)',
                        icon: 'error',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    })
                }
            })
        }
        return (
            <DropdownItem
                tag="button"
                className='w-100'
                onClick={handleDeleteAdminClick} >
                <Archive size={14} className='me-50' />
                <span className='align-middle'>Delete</span>
            </DropdownItem>
        )
    }

    const CustomDropDownDeactivate = ({ row }) => {
        const dispatch = useDispatch()

        const handleDeactivateAdminClick = async () => {
            let adminStatus = row.status === "active" ? "deactivate" : "active"
            dispatch(clearGetAdminData)
            return await MySwal.fire({
                title: 'Are you sure?',
                text: `You will ${adminStatus} admin!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: `Yes, ${adminStatus} admin!`,
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ms-1'
                },
                buttonsStyling: false
            }).then(function (result) {
                if (result.value) {
                    MySwal.fire({
                        icon: 'success',
                        title: `${adminStatus}d!`,
                        text: `Admin has been ${adminStatus}d.`,
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    })
                    let newStatus = null
                    if (adminStatus === "deactivate") {
                        newStatus = "deactivated"
                    } else {
                        newStatus = "active"
                    }
                    let obj = {
                        id: row.id,
                        status: newStatus
                    }
                    dispatch(deactivateAdminAction(obj))
                } else if (result.dismiss === MySwal.DismissReason.cancel) {
                    MySwal.fire({
                        title: 'Cancelled',
                        text: 'Cancelled De-activating :)',
                        icon: 'error',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    })
                }
            })
        }

        return (
            <DropdownItem
                tag='button'
                className='w-100'
                onClick={handleDeactivateAdminClick}
            >
                <FileText size={14} className='me-50' />
                <span className='align-middle'>{row.status === "active" ? "Deactivate" : "Activate"}</span>
            </DropdownItem>
        )
    }
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Filters</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md='4'>
                            <Label for='status-select'>Admin Status</Label>
                            <Select
                                theme={selectThemeColors}
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={statusOptions}
                                value={currentStatus || ''}
                                onChange={handleCurrentStatus}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card className='overflow-hidden'>
                <div className='react-dataTable'>
                    <DataTable
                        noHeader
                        subHeader
                        sortServer
                        pagination
                        responsive
                        paginationServer
                        columns={columns}
                        onSort={handleSort}
                        sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        paginationComponent={CustomPagination}
                        data={dataToRender()}
                        subHeaderComponent={
                            <CustomHeader
                                searchTerm={searchTerm}
                                rowsPerPage={rowsPerPage}
                                handleFilter={handleFilter}
                                handlePerPage={handlePerPage}
                                toggleSidebar={toggleSidebar}
                            />
                        }
                    />
                </div>
            </Card>
        </Fragment>
    )
}

export default Table
