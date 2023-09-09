import { Typography } from '@mui/material'
import React from 'react'

const PostTitle = ({ postText }) => {
    return (
        <Typography
            variant='body2'
            sx={{
                mx:{xs:1}
            }}
        >
            {postText}
        </Typography>
    )
}

export default PostTitle;