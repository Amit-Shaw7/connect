import { MoreVert } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React from 'react'

const MoreVertical = ({onclickFn}) => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: "10px",
                right: "10px"
            }}
        >
            <IconButton onClick={onclickFn}>
                <MoreVert />
            </IconButton>
        </Box>
    )
}

export default MoreVertical