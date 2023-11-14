import React, { useEffect, useState } from "react";
import PostList from "../../components/posts/PostList";
import instance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { limit } from "../../utils/infiniteScrollOptions";
import { useDispatch, useSelector } from "react-redux";
import { clearHomeFeed, setPostsForHomeFeedfn } from "../../store/actions/PostActions";
import { formatErrorMessage } from "../../utils/formatError";

const Feed = ({ user, sortBy }) => {
    const { feed } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchPostsForFeed = async (initial) => {
        const url = `post/feed?page=${initial ? initial : page}&limit=${limit}&query=${sortBy}`;
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
                dispatch(setPostsForHomeFeedfn(response.data?.posts?.docs));
                setPage((page) => page + 1);
            }
        }
    };

    const clearPosts = () => {
        setPage(1);
        setHasMore(true);
        dispatch(clearHomeFeed());
    }

    useEffect(() => {
        clearPosts();
        fetchPostsForFeed(1);
        // eslint-disable-next-line
    }, [sortBy]);

    return (
        <PostList fetchMorePosts={fetchPostsForFeed} hasMore={hasMore} user={user} posts={feed} />
    )
}

export default Feed;