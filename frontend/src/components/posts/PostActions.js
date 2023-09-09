import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Share from "@mui/icons-material/Share";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CommentOutlined from "@mui/icons-material/CommentOutlined";
import Comment from "@mui/icons-material/Comment";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import Bookmark from "@mui/icons-material/Bookmark";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { likePostFn, savePostFn } from "../../store/actions/PostActions";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Send, SendOutlined } from "@mui/icons-material";

const PostActions = ({ user, post }) => {
    const { likes, savedBy, _id, comments } = post;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [likesCount, setLikesCount] = useState(likes?.length);

    const [postLiked, setPostLiked] = useState(likes?.includes(user?._id));
    const [postSaved, setPostSaved] = useState(savedBy?.includes(user?._id));

    const savePost = () => {
        const done = dispatch(savePostFn(post?._id));
        if (done) {
            setPostSaved(!postSaved);
        }
    }
    const likePost = () => {
        const done = dispatch(likePostFn(post?._id, user?._id));
        if (done) {
            setPostLiked(true);
            setLikesCount(likesCount + 1);
        }
    }
    const unlikePost = () => {
        const done = dispatch(likePostFn(post?._id, user?._id));
        if (done) {
            setPostLiked(false);
            if (likesCount > 0) {
                setLikesCount(likesCount - 1);
            }
        }
    }

    const goToPostDetailsPage = () => {
        navigate(`/post/${_id}`)
    }

    const copyLinkToClipboard = async () => {
        await navigator.clipboard.writeText(window.location.href + "post/" + post?._id);
        toast.success("Link Copied");
    }

    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            px={1}
        >
            <Stack flexDirection="row" alignItems="center" gap={2}>
                <Stack
                    flexDirection="row"
                    alignItems="center"
                >
                    {postLiked ?
                        <Favorite sx={{cursor: "pointer"}} onClick={unlikePost} fontSize="small" color="error" />
                        :
                        <FavoriteBorder sx={{cursor: "pointer"}} onClick={likePost} fontSize="small" color="error" />
                    }
                    <Typography ml={0.3}>{likesCount}</Typography>
                </Stack>

                <Stack
                    flexDirection="row"
                    alignItems="center"
                >
                    {/* <Link to={`/post/${_id}`}> */}
                        {comments?.includes(user?._id) ?
                            <Comment sx={{cursor: "pointer"}} onClick={goToPostDetailsPage} fontSize="small" color="primary" />
                            :
                            <CommentOutlined sx={{cursor: "pointer"}} onClick={goToPostDetailsPage} fontSize="small" color="primary" />
                        }
                    {/* </Link> */}
                    <Typography ml={0.3}>{comments?.length}</Typography>
                </Stack>

                <Share sx={{cursor: "pointer"}} onClick={copyLinkToClipboard} fontSize="small" color="primary" />
            </Stack>
            {postSaved ?
                <Bookmark sx={{cursor: "pointer"}} onClick={savePost} fontSize="small" color="primary" />
                :
                <BookmarkBorder sx={{cursor: "pointer"}} onClick={savePost} fontSize="small" color="primary" />
            }
        </Stack>
    )
}

export default PostActions