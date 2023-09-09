import React, { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import CameraAlt from "@mui/icons-material/CameraAlt";
import { Camera } from "@mui/icons-material";

const UploadAvatar = ({ user, sx }) => {
    const [file, setFile] = useState();
    const handleChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        
        console.log(e.target.files[0]);
    }
    return (
        <Stack alignItems="center" justifyContent="center" sx={{ ...sx }}>
            <Box sx={{ position: "relative", width: ":max-content" }}>
                <Avatar
                    src={file ? file : user?.avatar}
                    sx={{
                        height: "150px",
                        width: "150px",
                        objectFit: "contain"
                    }}
                />

                <label htmlFor="upload-avatar"><Camera color="primary" /></label>
                <TextField sx={{ display: "none" }} id="upload-avatar" name="upload-avatar-btn" type='file' onChange={handleChange} />
            </Box>

        </Stack>
    )
}

export default UploadAvatar;