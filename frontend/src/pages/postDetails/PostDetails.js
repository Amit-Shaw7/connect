import React, { useEffect } from "react";
import Post from "../../components/posts/Post";
import CustomContainer from "../../components/CustomContainer";
import Comments from "../../components/comments/Comments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from "../../store/actions/PostActions";
import { useState } from "react";
import Loader from "../../components/Loader";
import { Stack } from "@mui/material";

const fetchPost = async (dispatch, postId, setPost) => {
    const post = await dispatch(fetchPostById(postId));
    setPost(post);
};


const PostDetails = () => {
    const { user } = useSelector(state => state.user);

    const params = useParams();
    const dispatch = useDispatch();

    const [post, setPost] = useState(null);

    useEffect(() => {
        fetchPost(dispatch, params.id, setPost);
    }, [dispatch, params.id]);

    if (post === null) {
        return <Loader />
    }

    return (
        <CustomContainer>
            <Stack width="100%">
                {post && <Post user={user} post={post} />}
                <Comments postId={params.id} />
            </Stack>
        </CustomContainer>
    )
}

export default PostDetails;