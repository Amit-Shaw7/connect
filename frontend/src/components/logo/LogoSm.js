import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const LogoSm = () => {
    return (
        <Link to="/">
            <Box component="img"
                src="/assets/logo/LogoSm.png"
                width="50px"
                sx={{ objectFit: "contain", borderRadius: "5px" }}
            />
        </Link>
    )
}

export default LogoSm;