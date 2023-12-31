import { MoreVert } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React from 'react'

const MoreVertical = ({ onclickFn, right, top, variant }) => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: top || "10px",
                right: right || "10px"
            }}
        >
            <IconButton size='small' onClick={onclickFn}>
                <MoreVert fontSize='small' color={variant === "dark" ? "black" : "white"} />
            </IconButton>
        </Box>
    )
}

export default MoreVertical