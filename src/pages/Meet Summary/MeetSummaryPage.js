import axios from "axios"
import { useEffect, useState } from "react"
import MeetSummary from "../../components/MeetSummary"
import { isAuthenticated } from '../../helper/auth/authUtils'

const MeetSummaryPage = () => {

    const [meetSummary, setMeetSummary] = useState([]);

    // useEffect(() => {
    //     axios.get("user/attendance/", { headers: { Authorization: `Bearer ${isAuthenticated().token}` } })
    //         .then(res => {
    //             setMeetSummary(res.data)
    //         })
    // }, [])

    return (
        <MeetSummary meetSummary={meetSummary} />
    );
}
 
export default MeetSummaryPage;