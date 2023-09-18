import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Image from '../image/Image'
import CustomAvatar from '../CustomAvatar'

const Story = ({ openStoryModal, idx, story, user }) => {
    return (
        <Stack
            onClick={() => openStoryModal(idx)}
            position="relative"
            alignItems="center"
            justifyContent="center"
            height="180px"
            width="120px"
            sx={{
                borderRadius: "10px",
                cursor: "pointer",
            }}
        >
            <Image
                sx={{ borderRadius: "10px" }}
                height="100%"
                width="100%"
                fit="cover"
                src={story?.media}
            />
            <Typography
                textAlign="center"
                fontSize="10px"
                color={story?.color}
                sx={{
                    wordWrap: "break-word",
                    position: "absolute",
                    bottom: "10px",
                    width: "100%"
                }}
            >
                {story?.text}
            </Typography>
            <Box
                sx={{
                    position: "absolute",
                    bottom: "10px"
                }}
            >
                <CustomAvatar
                    height="30px"
                    width="30px"
                    user={user ? user : story?.user}
                />
            </Box>
        </Stack>
    )
}

export default Story;