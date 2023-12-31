import React, { useEffect, useState } from "react";
import PostList from "../../components/posts/PostList";
import instance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { limit } from "../../utils/infiniteScrollOptions";
import { useDispatch, useSelector } from "react-redux";
import { clearSavedPostsFeed, setPostsForSavedPostsFeedfn } from "../../store/actions/PostActions";
import { Stack } from "@mui/material";
import { formatErrorMessage } from "../../utils/formatError";

const SavedPostsFeed = ({ user, sortBy }) => {
    const { savedPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);


    const fetchPostsForFeed = async (initial) => {
        const url = `post/savedposts?page=${initial ? initial : page}&limit=${limit}&query=${sortBy}`;
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
                dispatch(setPostsForSavedPostsFeedfn(response.data?.posts?.docs));
                setPage((page) => page + 1);
            }
        }
    };

    const clearPosts = () => {
        setPage(1);
        setHasMore(true);
        dispatch(clearSavedPostsFeed());
    }

    useEffect(() => {
        clearPosts();
        fetchPostsForFeed(1);
        // eslint-disable-next-line
    }, [sortBy]);

    return (
        <Stack p={1}>
            <PostList fetchMorePosts={fetchPostsForFeed} hasMore={hasMore} user={user} posts={savedPosts} />
        </Stack>
    )
}

export default SavedPostsFeed;