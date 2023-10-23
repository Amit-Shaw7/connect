import React, { useEffect, useState } from "react";
import PostList from "../../components/posts/PostList";
import instance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { delay } from "../../utils/delay";
import { limit } from "../../utils/infiniteScrollOptions";
import { useDispatch, useSelector } from "react-redux";
import { clearExploreFeed, setPostsForExploreFeedfn } from "../../store/actions/PostActions";
import { Stack } from "@mui/material";

const ExploreFeed = ({ user, sortBy }) => {
    const { posts } = useSelector(state => state.post);
    const dispatch = useDispatch();

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchPostsForFeed = async (initial) => {
        await delay(3000);
        const url = `post/explore?page=${initial ? initial : page}&limit=${limit}&query=${sortBy?.toLowerCase()}`;
        let response = {};
        try {
            response = await instance.get(url);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        } finally {
            if (response?.status === 200) {
                if (response?.data?.posts?.docs?.length < limit) {
                    setHasMore(false);
                }
                dispatch(setPostsForExploreFeedfn(response.data?.posts?.docs))
                setPage((page) => page + 1);
            }
        }
    }

    const clearPosts = () => {
        setPage(1);
        setHasMore(true);
        dispatch(clearExploreFeed());
    }

    useEffect(() => {
        clearPosts();
        fetchPostsForFeed(1);
        // eslint-disable-next-line
    }, [sortBy]);

    return (
        <Stack p={1}>
            <PostList fetchMorePosts={fetchPostsForFeed} hasMore={hasMore} user={user} posts={posts} />
        </Stack>
    )
}

export default ExploreFeed;