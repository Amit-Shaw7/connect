import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Post from "./Post";
import CustomContainer from "../customContainer/CustomContainer";


const PostList = ({ editable , user, posts }) => {

    if (posts?.length <= 0) {
        return <CustomContainer>
            <Typography textAlign="center">No posts</Typography>
        </CustomContainer>
    }

    return (
        <Stack spacing={3} p={1}>
            {
                posts?.map((post) => (
                    <Post editable={editable} user={user} key={post?._id} post={post} />
                ))
            }
        </Stack>
    )
}

export default PostList