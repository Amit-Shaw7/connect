import { Box, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import Loader from '../loader/Loader';
import CrossButton from './CrossButton';
import { style } from './modalStyle';
import AddStoryForm from './AddStoryForm';

const AddStoryModal = ({  open, handleClose , type , story }) => {
    const [loading, setLoading] = useState(false);
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

                        <Typography sx={{ mb: "20px" }} variant='h6'>Add Your Story</Typography>

                        <AddStoryForm type={type} story={story} handleClose={handleClose} />
                    </Box>
            }
        </Modal>
    )
}

export default AddStoryModal