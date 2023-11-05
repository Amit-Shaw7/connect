import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import PostList from "../../components/posts/PostList";
import { useDispatch } from "react-redux";
import { fetchFollowersFn, fetchFollowingsFn } from "../../store/actions/UserActions";
import UserList from "../../layouts/mainLayout/UserList";
import { limit } from "../../utils/infiniteScrollOptions";
import instance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { formatErrorMessage } from "../../utils/formatError";

const fetchFollowers = async (dispatch, id, setPosts, setLoading) => {
    const posts = await dispatch(fetchFollowersFn(id, setLoading));
    setPosts(posts);
}
const fetchFollowings = async (dispatch, id, setPosts, setLoading) => {
    const posts = await dispatch(fetchFollowingsFn(id, setLoading));
    setPosts(posts);
};

const MoreInfo = ({ currentTab }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const userId = params.id;
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);


    const fetcUserPosts = async () => {
        const url = `post/all/${userId}?page=${page}`;
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
                setPosts((posts) => [...posts , ...response.data?.posts?.docs]);
                setPage((page) => page + 1);
            }
        }
    }

    useEffect(() => {
        currentTab === "posts" && fetcUserPosts();
        currentTab === "followers" && fetchFollowers(dispatch, params.id, setFollowers, setLoading);
        currentTab === "followings" && fetchFollowings(dispatch, params.id, setFollowings, setLoading);
        // eslint-disable-next-line
    }, [currentTab, dispatch, params.id]);
    return (
        <Stack>
            {currentTab === "posts" && <PostList fetchMorePosts={fetcUserPosts} hasMore={hasMore} posts={posts} />}
            {currentTab === "followings" && <UserList loading={loading} users={followings} type="followings" />}
            {currentTab === "followers" && <UserList loading={loading} users={followers} type="followers" />}
        </Stack>
    )
}

export default MoreInfo