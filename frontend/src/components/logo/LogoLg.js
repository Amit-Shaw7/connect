import React from "react";
import Box  from "@mui/material/Box";
import { Link } from "react-router-dom";

const LogoLg = () => {
    return (
        <Link to="/">
            <Box component="img"
                src="/assets/logo/LogoLg.png"
                width="150px"
                sx={{ objectFit: "contain"}}
            />
        </Link>
    )
}

export default LogoLg;