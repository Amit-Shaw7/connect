import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import PostList from "../../components/posts/PostList";
import { useDispatch } from "react-redux";
import { getUserPostsFn } from "../../store/actions/PostActions";
import { fetchFollowersFn, fetchFollowingsFn } from "../../store/actions/UserActions";
import UserList from "../../layouts/mainLayout/UserList";

const fetchUserPosts = async (dispatch, id, setPosts , setLoading) => {
    const posts = await dispatch(getUserPostsFn(id , setLoading));
    setPosts(posts);
}
const fetchFollowers = async (dispatch, id, setPosts , setLoading) => {
    const posts = await dispatch(fetchFollowersFn(id , setLoading));
    setPosts(posts);
}
const fetchFollowings = async (dispatch, id, setPosts , setLoading) => {
    const posts = await dispatch(fetchFollowingsFn(id , setLoading));
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
        currentTab === "posts" && fetchUserPosts(dispatch, params.id, setPosts , setLoading);
        currentTab === "followers" && fetchFollowers(dispatch, params.id, setFollowers , setLoading);
        currentTab === "followings" && fetchFollowings(dispatch, params.id, setFollowings , setLoading);
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