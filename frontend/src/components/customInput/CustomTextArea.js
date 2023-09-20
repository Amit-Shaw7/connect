import React from "react";
import Box from "@mui/material/Box";
import useResponsive from "../../hooks/usResponsive";
import { inputStyle } from "../../utils/styles";
import { TextField } from "@mui/material";

const CustomTextArea = ({ type, fullWidth, query, handleQuery }) => {
    const isDesktop = useResponsive("up", "md");

    return (
        <Box sx={{
            width: `${fullWidth ? "100%" : "200px"}`
        }}>
            <TextField
                multiline
                // minRows={isDesktop ? 4 : 2}
                sx={{
                    border:"none"
                }}
                fullWidth
                autoCorrect="true"
                className="hide-scrollbar"
                placeholder="What's on your mind"
                name="what's text in your mind"
                rows={isDesktop ? 4 : 2}
                cols="50"
                value={query}
                onChange={handleQuery}
                style={inputStyle}
                // variant="standard"
            />
        </Box>
    )
}

export default CustomTextArea;