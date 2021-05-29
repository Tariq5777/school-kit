import { Button, Typography } from "@material-ui/core"

const Transcript = ({data}) => {
    return (
        <div className="modal-dialog">
            <div className="modal">
                <Typography variant="h3">Transcript</Typography>
                <Typography variant="h4">{data.class}</Typography>
                <Typography variant="h4">{data.meet_id}</Typography>
                <Typography variant="h4">{data.date}</Typography>
            </div>
        </div>
    );
}
 
export default Transcript;