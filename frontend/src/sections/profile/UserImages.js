import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CoverImage from "../../components/image/CoverImage";
import CustomAvatar from "../../components/CustomAvatar";
import useResponsive from "../../hooks/usResponsive";

const UserImages = ({ user }) => {
    const isDesktop = useResponsive("md" , "up");
    return (
        <>
            <Stack spacing={2}>
                <CoverImage src={user?.cover} fit={user?.cover ? "cover" :"contain"} />

                <Box
                    sx={{
                        position: "absolute",
                        left: {lg:"50px" , md: "50px" , sm: "20px" , xs : "10px"},
                        top: "100px",
                    }}
                >
                    <CustomAvatar user={user} height={isDesktop ? "150px" : "120px"} width={isDesktop ? "150px" : "120px"} />
                </Box>
            </Stack>
        </>
    )
}

export default UserImages