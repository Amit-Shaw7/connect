import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import EachComment from "./EachComment";
import Loader from "../Loader";
import AddComment from "./AddComment";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsOfPostFn } from "../../store/actions/CommentActions";

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
            <Stack height="100%" spacing={3} mx={2} >
                <Divider sx={{ mb: 1 }} />

                {
                    comments && comments.length === 0
                        ?
                        <Typography variant="h6">No comments</Typography>
                        :
                        <Typography variant="h6">Comments</Typography>
                }

                <List
                    sx={{
                        height: "max-content",
                        overflowY: "scroll",
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
            {/* <Stack>
                <AddComment postId={postId} />
            </Stack> */}
        </>
    )
}

export default Comments