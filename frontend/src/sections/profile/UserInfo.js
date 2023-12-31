import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Work from "@mui/icons-material/Work";
import Button from "@mui/material/Button";

const UserInfo = ({ currentTab, user, setCurrentTab }) => {

    return (
        <Stack
            spacing={2}
            sx={{
                mx: { lg: "50px", md: "50px", sm: "20px", xs: "10px" }
            }}
        >
            <Box>
                <Typography
                    variant='h5'
                    fontWeight="600"
                >
                    {user?.name}
                </Typography>
                <Typography
                    variant='body1'
                    color="gray"

                >
                    {user?.username}
                </Typography>
            </Box>
            <Typography
                variant='body1'
            >
                {user?.bio}
            </Typography>

            <Link sx={{ width: "max-content" }} target='_blank' href={user?.website}>{user?.website}</Link>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px"
                }}
            >
                <Work color='primary' />
                <Typography
                    variant='body1'
                >
                    Joined August 04 2023
                </Typography>
            </Box>

            <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Button
                    onClick={() => setCurrentTab("posts")}
                    sx={{
                        color: currentTab === "posts" ? "pallete.primary" : "gray",
                        textTransform: "capitalize"
                    }}
                >
                    {user?.posts?.length} Posts
                </Button>

                <Button
                    onClick={() => setCurrentTab("followers")}
                    sx={{
                        color: currentTab === "followers" ? "pallete.primary" : "gray",
                        textTransform: "capitalize"
                    }}
                >
                    {user?.followers?.length} Followers
                </Button>

                <Button
                    onClick={() => setCurrentTab("followings")}
                    sx={{
                        color: currentTab === "followings" ? "pallete.primary" : "gray",
                        textTransform: "capitalize"
                    }}
                >
                    {user?.followings?.length} Following
                </Button>
            </Stack>
        </Stack>
    )
}

export default UserInfo;