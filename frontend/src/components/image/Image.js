import React from 'react';
import { Box } from '@mui/material';

const Image = ({ src, height, width, fit , maxHeight}) => {
    return (
        <Box component="img"
            loading='lazy'
            src={src}
            height={height}
            width={width}
            maxHeight={maxHeight ? maxHeight : "100%"}
            sx={{
                objectFit: `${fit || "contain"}`,
            }}
        />
    )
}

export default Image