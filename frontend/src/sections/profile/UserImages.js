import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CoverImage from "../../components/image/CoverImage";
import CustomAvatar from "../../components/CustomAvatar";

const UserImages = ({ user }) => {

    return (
        <>
            <Stack spacing={2}>
                <CoverImage src={user?.cover} fit="cover" />

                <Box
                    sx={{
                        position: "absolute",
                        left: "50px",
                        top: "100px",
                    }}
                >
                    <CustomAvatar user={user} height="150px" width="150px" />
                </Box>
            </Stack>
        </>
    )
}

export default UserImages