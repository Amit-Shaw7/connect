import React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

const CustomTextInput = ({ fullWidth, query, handleQuery }) => {

    return (
        <Box sx={{
            width: `${fullWidth ? "100%" : "200px"}`
        }}>
            <TextField
                fullWidth
                variant="standard"
                placeholder="What's on your mind"
                name="what's in your mind"
                type="text"
                value={query}
                onChange={handleQuery}
            />
        </Box>
    )
}

export default CustomTextInput;