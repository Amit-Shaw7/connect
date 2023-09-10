import { Divider, List, ListItem, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import EachComment from './EachComment';
import Loader from '../loader/Loader';
import CustomContainer from '../customContainer/CustomContainer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsOfPostFn } from '../../store/actions/CommentActions';
import AddComment from './AddComment';

const Comments = ({ postId }) => {
    const { comments, loading } = useSelector(state => state.comment);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCommentsOfPostFn(postId));
    }, [dispatch, postId]);

    if (loading) {
        return <Stack height="400px"><Loader /></Stack>
    }

    if (comments.length === 0) {
        return <CustomContainer>
            <Typography textAlign="center">No Comments</Typography>
        </CustomContainer>
    }
    return (
        <>
            <Stack spacing={3} mx={2}>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="h6">Comments</Typography>

                <List
                    sx={{
                        height: "400px",
                        overflowY: "scroll",
                        gap: 1
                    }}
                >
                    {
                        comments && comments.map((comment) => (
                            <ListItem>
                                <EachComment postId={postId} comment={comment} key={comment?._id} />
                            </ListItem>
                        ))
                    }
                </List>
            </Stack>
            <Stack p={1}>
                <AddComment postId={postId} />
            </Stack>
        </>
    )
}

export default Comments