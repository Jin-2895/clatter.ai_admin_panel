import React, { useState } from 'react'
import SidebarNewAdmin from './Sidebar'
import Table from './Table'

const Admin = () => {
    const [show, setShow] = useState(false)
    const [editAdminProfile, setEditAdminProfile] = useState(false)
    const [adminProfileData, setAdminProfileData] = useState(null)
    const [userID, setUserID] = useState('')

    const toggleSidebar = (row) => {
        if (row) {
            debugger
            setAdminProfileData(row)
        }
        setShow(!show)
    }

    return (
        <div className='app-user-list'>
            <Table toggleSidebar={toggleSidebar} editAdminProfile={editAdminProfile} setEditAdminProfile={setEditAdminProfile} userID={userID} setUserID={setUserID} />
            <SidebarNewAdmin open={show} toggleSidebar={toggleSidebar} editAdminProfile={editAdminProfile} setEditAdminProfile={setEditAdminProfile} adminProfileData={adminProfileData} />
        </div>
    )
}

export default Admin