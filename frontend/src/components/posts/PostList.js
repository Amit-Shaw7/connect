import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Post from "./Post";
import CustomContainer from "../CustomContainer";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader";



const PostList = ({fetchMorePosts , hasMore , editable, user, posts }) => {

    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchMorePosts}
            hasMore={hasMore}
            loader={<Stack my={3} alignItems="center" justifyContent="center"><Loader /></Stack>}
            scrollableTarget="scrollableDiv"
        >
            <Stack spacing={3}>
                {
                    posts?.map((post) => (
                        <Post editable={editable} user={user} key={post?._id} post={post} />
                    ))
                }
            </Stack>
        </InfiniteScroll>
    )
}

export default PostList