import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import ThumbDown from "@mui/icons-material/ThumbDown";
import ThumbDownOutlined from "@mui/icons-material/ThumbDownOutlined";
import ThumbUp from "@mui/icons-material/ThumbUp";
import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { getUserProfileFn } from "../../store/actions/UserActions";
import MoreVertical from "../MoreVertical";
import { dislikeCommentFn, likeCommentFn } from "../../store/actions/CommentActions";
import EditCommentModal from "../modals/EditCommentModal";
import CommentActionPopover from "../popovers/CommentPopover";

const style = {
    cursor: "pointer"
}

const fetchUser = async (userId, setUser, dispatch) => {
    const user = await dispatch(getUserProfileFn(userId));
    setUser(user);
}
const EachComment = ({ comment }) => {
    const { user: currentUser } = useSelector(state => state.user);
    const { likes, dislikes, _id, text } = comment;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const [liked, setLiked] = useState(likes.includes(currentUser._id));
    const [likesCount, setLikesCount] = useState(likes?.length || 0);
    const [dislikesCount, setDislikesCount] = useState(dislikes?.length || 0);
    const [disliked, setDisliked] = useState(dislikes.includes(currentUser._id));
    const [commentText, setCommentText] = useState(text);
    const [openModal, setOpenModal] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const goToUserPage = () => {
        navigate(`/user/${user._id}`);
    };

    const handleOpenModal = () => {
        handlePopoverClose();
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleCommentText = (data) => {
        setCommentText(data);
    }

    const handleLikeUnlikeComment = (liked) => {
        setLiked(liked);
        if (!liked && likesCount > 0) {
            setLikesCount(likesCount - 1);
        } else {
            if (disliked) {
                setDisliked(false);
                setDislikesCount(dislikesCount - 1);
            }
            setLikesCount(likesCount + 1);
        }
        const like = dispatch(likeCommentFn(_id, currentUser?._id));
        if (!like) {
            setLiked(!liked);
            setLikesCount(likes?.length);
        }
    };

    const handleDisikeUndislikeComment = (disliked) => {
        setDisliked(disliked);
        if (!disliked && dislikesCount > 0) {
            setDislikesCount(dislikesCount - 1);
        } else {
            if (liked) {
                setLiked(false);
                setLikesCount(likesCount - 1);
            }
            setDislikesCount(dislikesCount + 1);
        }
        const dislike = dispatch(dislikeCommentFn(_id, currentUser?._id));
        if (!dislike) {
            setLiked(!disliked);
            setDislikesCount(dislikes?.length);
        }
    }

    useEffect(() => {
        fetchUser(comment?.user, setUser, dispatch);
    }, [comment?.user, dispatch]);

    return (
        <>
            <Stack flexDirection="row" position="relative" width="100%">
                {comment?.user === currentUser?._id && <MoreVertical onclickFn={handlePopoverOpen} />}
                <CommentActionPopover
                    handleOpenModal={handleOpenModal}
                    anchorEl={anchorEl}
                    handlePopoverClose={handlePopoverClose}
                    open={open}
                    id={comment._id}
                />
                <ListItemAvatar>
                    <Avatar
                        sx={{
                            height: "30px",
                            width: "30px"
                        }}
                        alt={"image"}
                        src={user?.avatar}
                        onClick={() => goToUserPage(user?._id)}
                    />
                </ListItemAvatar>
                <Stack flexDirection="column">
                    <Stack flexDirection="column">
                        <Stack flexDirection="row" gap={1}>
                            <Typography variant="caption">
                                {user?.username}
                            </Typography>
                            <Typography>
                                -
                            </Typography>
                            <Typography variant="caption">
                                {moment(comment?.createdAt, "YYYYMMDD HH:mm:ss GMT Z").fromNow()}
                            </Typography>
                        </Stack>
                        <Stack justifySelf="start">
                            <Typography variant="body1">
                                {commentText}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack
                        flexDirection="row"
                        gap={2}
                        mt={1}
                    >
                        <Stack
                            flexDirection="row"
                            alignItems="center"
                            gap={1}
                        >
                            {
                                liked
                                    ? <ThumbUp
                                        sx={style}
                                        onClick={(e) => handleLikeUnlikeComment(false)}
                                        color="primary"
                                        fontSize="10px"
                                    />
                                    : <ThumbUpOutlined
                                        sx={style}
                                        onClick={(e) => handleLikeUnlikeComment(true)}
                                        color="primary"
                                        fontSize="10px"
                                    />
                            }
                            <Typography variant="caption">{likesCount}</Typography>
                        </Stack>

                        <Stack
                            flexDirection="row"
                            alignItems="center"
                            gap={1}
                        >
                            {
                                disliked
                                    ?
                                    <ThumbDown
                                        onClick={() => handleDisikeUndislikeComment(false)}
                                        sx={style}
                                        color="primary"
                                        fontSize="10px"
                                    />
                                    :
                                    <ThumbDownOutlined
                                        onClick={() => handleDisikeUndislikeComment(true)}
                                        sx={style}
                                        color="primary"
                                        fontSize="10px"
                                    />
                            }
                            <Typography variant="caption">{dislikesCount}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <EditCommentModal
                open={openModal}
                handleClose={handleCloseModal}
                handleCommentText={handleCommentText}
                comment={comment}
            />
        </>
    )
}

export default EachComment;