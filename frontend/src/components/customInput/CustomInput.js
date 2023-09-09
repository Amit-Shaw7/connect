import { Box } from '@mui/material';
import React from 'react';
const style = {
    padding: "5px 5px",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    // backgroundColor: "red",
    fontSize: "1.1rem",
    width: "95%",
    borderRadius: "5px",
    resize: "none"
}

const CustomTextInput = ({ fullWidth, query, handleQuery }) => {

    return (
        <Box sx={{
            width: `${fullWidth ? "100%" : "200px"}`
        }}>
            <input
                placeholder="What's on your mind"
                name="what's in your mind"
                type="text"
                style={style}
                value={query}
                onChange={handleQuery}
            />
        </Box>
    )
}

export default CustomTextInput;