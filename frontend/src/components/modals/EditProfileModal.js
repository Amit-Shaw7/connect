import React from "react";
import {useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { style } from "../../utils/styles";
import CrossButton from "../CrossButton";
import Loader from "../Loader";
import UpdateProfileForm from "../forms/UpdateProfileForm";

const EditProfileModal = ({ user, open, handleClose }) => {
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

                        <Typography color="text.primary" sx={{ mb: "5px" }} variant="h5">Edit Profile</Typography>
                        <UpdateProfileForm loading={loading} user={user}/>
                    </Box>
            }
        </Modal>
    )
}

export default EditProfileModal;