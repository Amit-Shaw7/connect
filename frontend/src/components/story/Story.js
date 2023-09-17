import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import Image from '../image/Image'
import CustomAvatar from '../CustomAvatar'

const Story = ({ story }) => {
    return (
        <Stack position="relative" alignItems="center" justifyContent="center" height="180px" width="120px" sx={{ borderRadius:"10px" }}>
            <Image sx={{borderRadius:"10px"}} height="100%" width="100%" fit="cover" src={story?.media} />
            <Typography textAlign="center" fontSize="10px" color={story?.color} sx={{wordWrap:"break-word" , position: "absolute", bottom: "10px" , width: "100%" }}>
                {story?.text}
            </Typography>
        </Stack>
    )
}

export default Story;