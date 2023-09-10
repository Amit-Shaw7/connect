import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { style } from "./modalStyle";
import CrossButton from "./CrossButton";
import { UploadAvatar, UploadCover } from "../upload";
import Loader from "../loader/Loader";
import UpdateProfileForm from "./UpdateProfileForm";
import { TextField } from "@mui/material";
import UpdatePostForm from "./UpdatePostForm";

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
                    <Box sx={style}>
                        <CrossButton handleClose={handleClose} />

                        <Typography sx={{ mb: "20px" }} variant='h6'>Update Title</Typography>

                        <UpdatePostForm handleClose={handleClose} post={post} handlePostText={handlePostText}/>
                    </Box>
            }
        </Modal>
    )
}

export default UpdatePostModal;