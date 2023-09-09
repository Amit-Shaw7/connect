import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import PostList from "../../components/posts/PostList";
import { useDispatch } from "react-redux";
import { getUserPostsFn } from "../../store/actions/PostActions";
import { fetchFollowersFn, fetchFollowingsFn } from "../../store/actions/UserActions";
import UserList from "../../layouts/mainLayout/UserList";

const fetchUserPosts = async (dispatch, id, setPosts) => {
    const posts = await dispatch(getUserPostsFn(id));
    setPosts(posts);
}
const fetchFollowers = async (dispatch, id, setPosts) => {
    const posts = await dispatch(fetchFollowersFn(id));
    setPosts(posts);
}
const fetchFollowings = async (dispatch, id, setPosts) => {
    const posts = await dispatch(fetchFollowingsFn(id));
    setPosts(posts);
}

const MoreInfo = ({ currentTab }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);

    useEffect(() => {
        setLoading(true);
        currentTab === "posts" && fetchUserPosts(dispatch, params.id, setPosts);
        currentTab === "followers" && fetchFollowers(dispatch, params.id, setFollowers);
        currentTab === "followings" && fetchFollowings(dispatch, params.id, setFollowings);
        setLoading(false);
    }, [currentTab, dispatch, params.id]);
    return (
        <Stack>
            {currentTab === "posts" && <PostList loading={loading} posts={posts} />}
            {currentTab === "followings" && <UserList loading={loading} users={followings} type="followings" />}
            {currentTab === "followers" && <UserList loading={loading} users={followers} type="followers" />}
        </Stack>
    )
}

export default MoreInfo