import React, { useState } from "react"
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import CustomAvatar from "../CustomAvatar";
import Add from "@mui/icons-material/Add";
import AddStoryModal from "../modals/AddStoryModal";

const AddStory = ({ user }) => {
    const [openStoryModal, setOpenStoryModal] = useState(false);

    const openAddStoryModal = () => {
        setOpenStoryModal(true);
    }
    const closeAddStoryModal = () => {
        setOpenStoryModal(false);
    }

    return (
        <>
            <Stack
                position="relative"
                bgcolor="action.disabledBackground"
                alignItems="center"
                justifyContent="center"
                height="180px"
                width="120px"
                // border="1px solid lightgrey"
                sx={{
                    borderRadius: "10px",
                    // border:"1px solid pallete.divider"
                }}>
                <CustomAvatar
                    height="100px"
                    width="100px"
                    user={user}
                />

                <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    variant="contained"
                    type="button"
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
            <AddStoryModal
                open={openStoryModal}
                handleClose={closeAddStoryModal}
            />
        </>
    )
}

export default AddStory;