import React, { useEffect, useState } from "react";
import { delay } from "../../utils/delay";
import PostList from "../../components/posts/PostList";
import instance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { limit } from "../../utils/infiniteScrollOptions";
import { clearMypostsFeed, setPostsForMypostsFeedfn } from "../../store/actions/PostActions";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";

const MyPostsFeed = ({ user, sortBy }) => {
    const { myposts } = useSelector(state => state.post);
    const dispatch = useDispatch();

    // const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchPostsForFeed = async (initial) => {
        await delay(3000);
        const url = `post/explore?page=${initial ? initial : page}&limit=${limit}&query=${sortBy}`;
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
                // setPosts((prev) => [...prev, ...response.data?.posts?.docs]);
                dispatch(setPostsForMypostsFeedfn(response.data?.posts?.docs))
                setPage((page) => page + 1);
            }
        }
    };

    const clearPosts = () => {
        setPage(1);
        setHasMore(true);
        dispatch(clearMypostsFeed());
    };

    useEffect(() => {
        clearPosts();
        fetchPostsForFeed(1);
        // eslint-disable-next-line
    }, []);

    return (
        <Stack p={1}>
            <PostList editable fetchMorePosts={fetchPostsForFeed} hasMore={hasMore} user={user} posts={myposts} />
        </Stack>
    )
}

export default MyPostsFeed