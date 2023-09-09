import { Box } from '@mui/material';
import React from 'react';
import useResponsive from '../../hooks/usResponsive';
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

const CustomTextArea = ({ type, fullWidth, query, handleQuery }) => {
    const isDesktop = useResponsive("up" , "md");

    return (
        <Box sx={{
            width: `${fullWidth ? "100%" : "200px"}`
        }}>
            <textarea
                autoCorrect="true"
                className="hide-scrollbar"
                placeholder="What's on your mind"
                name="what's text in your mind"
                rows={isDesktop ? 4 : 2}
                cols="50"
                value={query}
                onChange={handleQuery}
                style={style}
            />
        </Box>
    )
}

export default CustomTextArea;