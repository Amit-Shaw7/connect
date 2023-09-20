import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import CrossButton from "../CrossButton";
import Carousel from "../Carousel";
import { storyModalStyle } from "../../utils/styles";

const DispalyStoriesModal = ({ user, idxOfClickedStory, stories, open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box bgcolor="background.default" sx={storyModalStyle}>
                <CrossButton size="large" handleClose={handleClose} />
                <Stack height="100%" alignItems="center" justifyContent="center">
                    <Carousel user={user} idx={idxOfClickedStory} stories={stories} />
                </Stack>
            </Box>
        </Modal>
    )
}

export default DispalyStoriesModal