import React from "react";
import PostList from "../../components/posts/PostList";


const Feed = ({user ,  posts }) => {
    return (
        <PostList user={user} posts={posts} />
    )
}

export default Feed;