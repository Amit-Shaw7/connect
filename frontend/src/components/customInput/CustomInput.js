import React from "react";
import Box from "@mui/material/Box";
import {inputStyle} from "../../utils/styles";
 
const CustomTextInput = ({ fullWidth, query, handleQuery }) => {

    return (
        <Box sx={{
            width: `${fullWidth ? "100%" : "200px"}`
        }}>
            <input
                placeholder="What's on your mind"
                name="what's in your mind"
                type="text"
                style={inputStyle}
                value={query}
                onChange={handleQuery}
            />
        </Box>
    )
}

export default CustomTextInput;