import { Box, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import Loader from '../loader/Loader'
import { storyModalStyle } from './modalStyle'
import CrossButton from './CrossButton'
import Carousel from '../Carousel'

const DispalyStoriesModal = ({ idxOfClickedStory , stories, open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={storyModalStyle}>
                <CrossButton size="large" handleClose={handleClose} />
                <Stack height="100%" alignItems="center" justifyContent="center">
                    <Carousel idx={idxOfClickedStory} stories={stories} />
                </Stack>
            </Box>
        </Modal>
    )
}

export default DispalyStoriesModal