import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CrossButton from "../CrossButton";
import { style } from "../../utils/styles";
import AddStoryForm from "../forms/AddStoryForm";

const AddStoryModal = ({ open, handleClose, type, story }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box bgcolor="background.default" sx={style}>
                <CrossButton handleClose={handleClose} />

                <Typography color="text.primary" sx={{ mb: "20px" }} variant="h6">Add Your Story</Typography>

                <AddStoryForm type={type} story={story} handleClose={handleClose} />
            </Box>
        </Modal>
    )
}

export default AddStoryModal;