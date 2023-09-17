import { Avatar, Button, Fab, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Image from '../image/Image'
import CustomAvatar from '../CustomAvatar'
import { Add } from '@mui/icons-material'
import AddStoryModal from '../modals/AddStoryModal'

const AddStory = ({ user }) => {
    const [openStoryModal, setOpenStoryModal] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const openAddStoryModal = () => {
        setOpenStoryModal(true);
    }
    const closeAddStoryModal = () => {
        setOpenStoryModal(false);
    }

    return (
        <>
            <Stack position="relative" alignItems="center" justifyContent="center" height="180px" width="120px" sx={{
                borderRadius: "10px", backgroundColor: "lightgray"
            }}>
                <CustomAvatar height="100px" width="100px" user={user} />

                <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    variant="contained"
                    type='button'
                    sx={{
                        position: "absolute",
                        bottom: "5px",
                        right: "5px"
                    }}
                    onClick={openAddStoryModal}
                >
                    <Add />
                </Fab>
            </Stack>
            <AddStoryModal open={openStoryModal} handleClose={closeAddStoryModal} />
        </>
    )
}

export default AddStory;