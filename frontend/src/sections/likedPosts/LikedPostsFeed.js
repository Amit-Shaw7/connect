import React, { useEffect, useState } from "react";
import { delay } from "../../utils/delay";
import instance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import PostList from "../../components/posts/PostList";
import { limit } from "../../utils/infiniteScrollOptions";
import { useDispatch, useSelector } from "react-redux";
import { clearLikedPostsFeed, setPostsForLikedPostsFeedfn } from "../../store/actions/PostActions";

const LikedPostsFeed = ({ user , sortBy}) => {
    const { likedPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();


    // const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const fetchPostsForFeed = async () => {
        await delay(3000);
        const url = `post/likedposts?page=${page}&limit=${limit}&query=${sortBy}`;
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
                dispatch(setPostsForLikedPostsFeedfn(response.data?.posts?.docs))
                setPage((page) => page + 1);
            }
        }
    };

    useEffect(() => {
        dispatch(clearLikedPostsFeed());
        fetchPostsForFeed();
        // eslint-disable-next-line
    }, []);

    return (
        <PostList fetchMorePosts={fetchPostsForFeed} hasMore={hasMore} user={user} posts={likedPosts} />
    )
}

export default LikedPostsFeed