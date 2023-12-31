import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import EachComment from "./EachComment";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsOfPostFn } from "../../store/actions/CommentActions";
import AddComment from "./AddComment";

const Comments = ({ postId }) => {
    const { comments, loading } = useSelector(state => state.comment);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCommentsOfPostFn(postId));
    }, [dispatch, postId]);

    if (loading) {
        return <Stack height="400px"><Loader /></Stack>
    }

    return (
        <>
            <Stack height="100%" spacing={3} >
                <Divider  />

                {
                    comments && comments.length === 0
                        ?
                        <Typography variant="h6">No comments</Typography>
                        :
                        <Typography variant="h6">Comments</Typography>
                }

                <AddComment postId={postId} />

                <List
                    sx={{
                        height: "max-content",
                        gap: 1,
                    }}
                >
                    {
                        comments && comments?.map((comment) => (
                            <ListItem>
                                <EachComment postId={postId} comment={comment} key={comment?._id} />
                            </ListItem>
                        ))
                    }
                </List>
            </Stack>
        </>
    )
}

export default Comments