import { Box } from '@mui/material';
import React from 'react';

const CoverImage = ({ src, fit }) => {
    return (
        <Box component="img"
            loading='lazy'
            src={src ? src : "/assets/logo/LogoLg.png"}
            height="180px"
            width="100%"
            sx={{
                objectFit: `${fit || "contain"}`,
            }}
        />
    )
}

export default CoverImage