import { Close } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React from 'react'
import { crossButtonStyle } from './modalStyle'

const CrossButton = ({ size , handleClose }) => {
    return (
        <Box
            onClick={handleClose}
            sx={crossButtonStyle}
        >
            <IconButton>
                <Close fontSize={size || 'small'} />
            </IconButton>
        </Box>
    )
}

export default CrossButton