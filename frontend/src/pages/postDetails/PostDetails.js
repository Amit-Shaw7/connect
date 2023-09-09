import React, { useEffect } from 'react'
import Post from '../../components/posts/Post'
import CustomContainer from '../../components/customContainer'
import Comments from '../../components/comments/Comments'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCommentsOfPostFn } from '../../store/actions/CommentActions'
import { fetchPostById } from '../../store/actions/PostActions'
import { useState } from 'react'
import AddComment from '../../components/comments/AddComment'
import { Divider } from '@mui/material'
import Loader from '../../components/loader/Loader'

const fetchPost = async (dispatch, postId, setPost) => {
    const post = await dispatch(fetchPostById(postId));
    setPost(post);
}

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
            {post && <Post user={user} post={post} />}
            <Comments postId={params.id}/>
            <Divider sx={{ mt: 4 }} />
            <AddComment postId={post?._id} />
            <Divider />
        </CustomContainer>
    )
}

export default PostDetails;