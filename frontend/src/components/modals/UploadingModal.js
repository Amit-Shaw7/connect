import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { style } from "../../utils/styles";


const UploadinModal = ({  open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box bgcolor="background.default" sx={style}>
                <Typography color="text.primary" textAlign="center" >Uploading</Typography>
            </Box>
        </Modal>
    )
}

export default UploadinModal;