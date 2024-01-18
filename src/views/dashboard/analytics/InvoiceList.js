

// ** Reactstrap Imports
import { Card, CardHeader } from 'reactstrap'
import { Table } from "reactstrap"
import moment from 'moment/moment'


const InvoiceList = ({ tableData }) => {
    if (tableData) {
        return (
            <Card>
                <CardHeader>
                    <h4 className='card-title'>Recent Transactions</h4>
                </CardHeader>
                <div style={{
                    overflow: "hidden", width: "100%"
                }}>
                    < div style={{ overflowY: "hidden", overflowX: "auto", maxWidth: "1200px" }}>
                        <Table >
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Name</th>
                                    <th>Plan</th>
                                    <th>Amount</th>
                                    <th>Created At</th>
                                    {/* <th>Expired At</th> */}
                                </tr>
                            </thead>
                            {tableData.map((item, index) => {
                                return (
                                    <tbody key={item.id}>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td className='d-flex flex-column'>
                                                <span className='text-capitalize'>{item?.firstName} {item?.lastName}</span>
                                                <small>{item?.email}</small>
                                            </td>
                                            <td className='text-break'>{item?.planName}</td>
                                            <td>${item?.amount}</td>
                                            <td className='d-flex flex-column'>
                                                <span>{moment(item?.issuedDate).format('DD/MM/YYYY')}</span>
                                                <small>{moment(item?.issuedDate).format('hh:mm A')}</small>
                                            </td>
                                            {/* <td className='d-flex flex-column'>
                                                <span>{moment(item?.endingDate).format('DD/MM/YYYY')}</span>
                                                <small>{moment(item?.endingDate).format('hh:mm A')}</small>
                                            </td> */}
                                        </tr>
                                    </tbody>
                                )
                            })}

                        </Table>
                    </div>
                </div>
            </Card >
        )
    }

}

export default InvoiceList