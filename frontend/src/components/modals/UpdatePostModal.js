import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { style } from "../../utils/styles";
import CrossButton from "../CrossButton";
import Loader from "../Loader";
import UpdatePostForm from "../forms/UpdatePostForm";

const UpdatePostModal = ({ handlePostText , post , open, handleClose }) => {
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
                    <Box bgcolor="background.default" sx={style}>
                        <CrossButton handleClose={handleClose} />

                        <Typography color="text.primary" sx={{ mb: "20px" }} variant='h6'>Update Title</Typography>

                        <UpdatePostForm handleClose={handleClose} post={post} handlePostText={handlePostText}/>
                    </Box>
            }
        </Modal>
    )
}

export default UpdatePostModal;