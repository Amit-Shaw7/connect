import React, { useEffect, useState } from "react";
import PostList from "../../components/posts/PostList";
import instance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { delay } from "../../utils/delay";
import { limit } from "../../utils/infiniteScrollOptions";
import { useDispatch, useSelector } from "react-redux";
import { setPostsForHomeFeedfn } from "../../store/actions/PostActions";

const Feed = ({ user, sortBy }) => {
    // const [posts, setPosts] = useState([]);
    const { feed } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchPostsForFeed = async () => {
        await delay(3000);
        const url = `post/feed?page=${page}&limit=${limit}&query=${sortBy}`;
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
                dispatch(setPostsForHomeFeedfn(response.data?.posts?.docs));
                setPage((page) => page + 1);
            }
        }
    }

    useEffect(() => {
        fetchPostsForFeed();
        // eslint-disable-next-line
    }, [sortBy]);

    return (
        <PostList fetchMorePosts={fetchPostsForFeed} hasMore={hasMore} user={user} posts={feed} />
    )
}

export default Feed;