import { Box, Fab, InputLabel, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Camera, CameraAlt, } from '@mui/icons-material';
import { Image } from '../image';

const UploadCover = ({ user, sx }) => {
    const [file, setFile] = useState();

    const handleChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files[0]);
    }
    return (
        <Stack minWidth="300px" sx={{ ...sx }}>
            <Box sx={{ position: "relative", width: "100%" }}>
                <Image
                    src={file ? file : user?.cover}
                    height="150px"
                    width="550px"
                    fit="cover"
                />

                <label htmlFor="upload-cover"><Camera /></label>
                <TextField sx={{ display: "none" }} id="upload-cover" name="upload-cover-btn" type='file' onChange={handleChange} />
            </Box>

        </Stack>
    )
}

export default UploadCover;