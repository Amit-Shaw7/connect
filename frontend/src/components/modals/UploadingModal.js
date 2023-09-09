import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { style } from "./modalStyle";


const UploadinModal = ({  open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Typography textAlign="center" >Uploading</Typography>
            </Box>
        </Modal>
    )
}

export default UploadinModal;