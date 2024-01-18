// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

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
    UncontrolledDropdown
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { adminBillingAction } from '../../../redux/subscription/subscriptionAction'
import { columns } from './columns'
import { handlePopState, updateQueryParams } from '../../components/useQueryParams'
import startCsvDownload from '../../components/startCsvDownload'

// ** Table Header
const CustomHeader = ({ store, handlePerPage, rowsPerPage, handleFilter, searchTerm, handleDownloadCSV }) => {
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

                    <div className='d-flex align-items-center table-header-actions'>
                        <UncontrolledDropdown className='me-1'>
                            <DropdownToggle color='secondary' caret outline>
                                <Share className='font-small-4 me-50' />
                                <span className='align-middle'>Export</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className='w-100' onClick={() => handleDownloadCSV()}>
                                    <FileText className='font-small-4 me-50' />
                                    <span className='align-middle'>CSV</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const SubscriptionTable = () => {
    const dispatch = useDispatch()
    // ** States
    const [queryObj, setQueryObj] = useState();
    const [sort, setSort] = useState('desc')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState('id')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [allUserData, setAllUserData] = useState(null)
    const [total, setTotal] = useState(null)
    const [currentRole, setCurrentRole] = useState({ value: '', label: 'All' })
    const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'All' })

    const { adminBillingData } = useSelector(state => state.subscription)

    useEffect(() => {
        if (adminBillingData) {
            setAllUserData(adminBillingData?.data)
            setTotal(adminBillingData?.totalSubscriptions)
        }
    }, [adminBillingData]);

    const handleDownloadCSV = () => {
        let obj = {
            page: currentPage,
            plan: currentPlan.value,
            status: currentRole.value,
            keyword: searchTerm,
            limit: rowsPerPage,
            flag: "getCSVOfSubscriptions"
        }
        let csvObj = {};
        Object.keys(obj).forEach((key) => {
            if (obj[key] !== undefined && obj[key] !== null) {
                csvObj[key] = obj[key]
            }
        });
        dispatch(adminBillingAction(csvObj))
    }

    //** Download CSV if we have button click function called and have URL of CSV */
    useEffect(() => {
        if (adminBillingData?.url !== null && adminBillingData?.url !== undefined) {
            startCsvDownload(adminBillingData?.url)
        }
    }, [adminBillingData])


    //** For Search , filter , query params */
    useEffect(() => {
        let queryObj = {
            page: currentPage,
            plan: currentPlan.value,
            status: currentRole.value,
            keyword: searchTerm,
            limit: rowsPerPage,
        }
        const queryObjWithUpdate = { ...queryObj };
        updateQueryParams(queryObjWithUpdate)

        // Attach the popstate listener when the component mounts
        const popstateCallback = handlePopState(queryObjWithUpdate);
        window.addEventListener('popstate', popstateCallback);
        // Clean up the popstate listener when the component unmounts
        return () => {
            window.removeEventListener('popstate', popstateCallback);
        };
    }, [currentPage, currentPlan, currentRole, searchTerm, rowsPerPage]);


    // ** Get data on mount
    useEffect(() => {
        let timerId; // To debounce the API call
        let obj = {
            page: currentPage,
            plan: currentPlan.value,
            status: currentRole.value,
            keyword: searchTerm,
            limit: rowsPerPage,
        }
        if (searchTerm) {
            timerId = setTimeout(() => {
                dispatch(adminBillingAction(obj))
            }, 1500)
        } else {
            timerId = setTimeout(() => {
                dispatch(adminBillingAction(obj))
            }, 100)
        }
        if (allUserData) {
            timerId = setTimeout(() => {
                dispatch(adminBillingAction(obj))
            }, 1000)
        }
        // Cleanup function to clear the debounce timer and prevent memory leaks
        return () => {
            clearTimeout(timerId);
        };
    }, [dispatch, currentPage, currentPlan, currentRole, rowsPerPage, searchTerm])

    useEffect(() => {
        setCurrentPage(1)
    }, [currentPlan, currentRole, searchTerm])

    // ** User filter options
    const roleOptions = [
        { value: '', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'cancel', label: 'Cancelled' },
        { value: 'expired', label: 'Expired' },
    ]

    const planOptions = [
        { value: '', label: 'All' },
        { value: 'Creator Monthly Plan', label: 'Creator Monthly Plan' },
        { value: 'Agency Monthly Plan', label: 'Agency Monthly Plan' },
        { value: 'Company Monthly Plan', label: 'Company Monthly Plan' },
        { value: 'Free Trial', label: 'Free Trial' }
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
            role: currentRole.value,
            currentPlan: currentPlan.value,
            // q: searchTerm
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

    const handleCurrentRole = (value) => {
        if (!value) {
            return
        }
        if (value.value !== '' && value.label) {
            setCurrentRole({ label: value.label, value: value.value })
        } else {
            setCurrentRole({ label: value.label, value: value.value })
        }
    }

    const handleCurrentPlan = (value) => {
        if (!value) {
            return
        }
        if (value.value !== '' && value.label) {
            setCurrentPlan({ label: value.label, value: value.value })
        } else {
            setCurrentPlan({ label: value.label, value: value.value })
        }

    }

    return (
        <div className='app-user-list'>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Filters</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md='4'>
                            <Label for='role-select'>Subscription Status</Label>
                            <Select
                                isClearable={false}
                                value={currentRole || ''}
                                options={roleOptions}
                                className='react-select'
                                classNamePrefix='select'
                                theme={selectThemeColors}
                                onChange={handleCurrentRole}
                            />
                        </Col>
                        <Col className='my-md-0 my-1' md='4'>
                            <Label for='plan-select'>Plan</Label>
                            <Select
                                theme={selectThemeColors}
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={planOptions}
                                value={currentPlan || ''}
                                onChange={handleCurrentPlan}
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
                                handleDownloadCSV={handleDownloadCSV}
                                store={allUserData}
                                searchTerm={searchTerm}
                                rowsPerPage={rowsPerPage}
                                handleFilter={handleFilter}
                                handlePerPage={handlePerPage}
                            />
                        }
                    />
                </div>
            </Card>

        </div >
    )
}

export default SubscriptionTable
