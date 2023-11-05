import React, { useEffect, useState } from "react";
import instance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import PostList from "../../components/posts/PostList";
import { limit } from "../../utils/infiniteScrollOptions";
import { useDispatch, useSelector } from "react-redux";
import { clearLikedPostsFeed, setPostsForLikedPostsFeedfn } from "../../store/actions/PostActions";
import { Stack } from "@mui/material";
import { formatErrorMessage } from "../../utils/formatError";

const LikedPostsFeed = ({ user, sortBy }) => {
    const { likedPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();


    // const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const fetchPostsForFeed = async (initial) => {
        const url = `post/likedposts?page=${initial ? initial : page}&limit=${limit}&query=${sortBy}`;
        let response = {};
        try {
            response = await instance.get(url);
        } catch (error) {
            toast.error(formatErrorMessage(error?.response?.data?.msg));
        } finally {
            if (response?.status === 200) {
                if (response?.data?.posts?.docs?.length < limit) {
                    setHasMore(false);
                }
                // setPosts((prev) => [...prev, ...response.data?.posts?.docs]);
                dispatch(setPostsForLikedPostsFeedfn(response.data?.posts?.docs))
                setPage((page) => page + 1);
            }
        }
    };

    const clearPosts = () => {
        setPage(1);
        setHasMore(true);
        dispatch(clearLikedPostsFeed());
    }

    useEffect(() => {
        clearPosts();
        fetchPostsForFeed(1);
        // eslint-disable-next-line
    }, []);

    return (
        <Stack p={1}>
            <PostList fetchMorePosts={fetchPostsForFeed} hasMore={hasMore} user={user} posts={likedPosts} />
        </Stack>
    )
}

export default LikedPostsFeed