import Box from "@mui/material/Box";
import React from "react";

const Image = ({ sx, src, height, width, fit, maxHeight }) => {
    return (
        <Box
            component="img"
            loading="lazy"
            src={src}
            height={height}
            width={width}
            maxHeight={maxHeight ? maxHeight : "100%"}
            sx={{
                objectFit: `${fit || ""}`,
                ...sx
            }}
        />
    )
}

export default Image