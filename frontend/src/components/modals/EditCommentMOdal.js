import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { style } from "../../utils/styles";
import CrossButton from "../CrossButton";
import Loader from "../Loader";
import UpdateCommentForm from "../forms/UpdateCommentForm";

const UpdateCommentModal = ({ handleCommentText, comment, open, handleClose }) => {
    const { loading } = useSelector(state => state.user);

    return (
        <Modal
            open={open}
            onClose={handleClose}

        >
            {
                loading
                    ?
                    <Loader />
                    :
                    <Box sx={style}>
                        <CrossButton handleClose={handleClose} />

                        <Typography sx={{ mb: "20px" }} variant='h5'>Update Text</Typography>

                        <UpdateCommentForm handleClose={handleClose} comment={comment} handleCommentText={handleCommentText} />
                    </Box>
            }
        </Modal>
    )
}

export default UpdateCommentModal;