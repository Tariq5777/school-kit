import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Timetable from '../../components/Timetable'
import { isAuthenticated } from '../../helper/auth/authUtils';

const TimeTablePage = () => {

    const [timetable, setTimetable] = useState({});

    const schedule = [
        "8:00 - 9:00",
        "9:00 - 10:00",
        "10:00 - 11:00",
        "11:00-12:00",
        "12:00-1:00",
        "1:00-2:00",
        "2:00-3:00",
        "3:00-4:00",
    ];

    useEffect(() => {
        axios.get("extra/timetable/", { headers: { Authorization: `Bearer ${isAuthenticated().token}` } })
            .then(res => {
                setTimetable(res.data.timetable)
            })
    }, [])

    document.title = "TimeTable"

    return (
        <div>
            <Timetable timetable={timetable} schedule={schedule} />

        </div>
    )
}

export default TimeTablePage
