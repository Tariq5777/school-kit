import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Attendance from '../../components/Attendance'
import { isAuthenticated } from '../../helper/auth/authUtils'

const AttendanceDisplayPage = () => {

    const [attendance, setAttendance] = useState([])

    useEffect(() => {
        axios.get("user/attendance/", { headers: { Authorization: `Bearer ${isAuthenticated().token}` } })
            .then(res => {
                setAttendance(res.data)
            })
    }, [])      


    return (
        <div>
            <Attendance attendance={attendance} />
        </div>
    )


}

export default AttendanceDisplayPage
