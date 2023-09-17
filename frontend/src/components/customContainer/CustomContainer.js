import React from 'react';
import { Stack } from "@mui/material";

const CustomContainer = ({ children, sx }) => {
  return (
    <Stack
      sx={{
        width:"100%",
        my: {md:2},
        // px:{md:2 , lg:2},
        px: { xs: 0, sm: 0, md: 1, lg: 2 },
        ...sx
      }}
    >
      {children}
    </Stack>
  )
}

export default CustomContainer