import { CircularProgress } from "@mui/material";
import Stack from "@mui/material/Stack";
import React from "react"

const Loader = () => {
    return (
        <Stack 
            height="100%"
            width="100%"
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgress />
        </Stack>
    )
}

export default Loader