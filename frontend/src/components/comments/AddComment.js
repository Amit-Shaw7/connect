import React, { useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CustomAvatar from "../CustomAvatar";
import Send from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { addCommentFn } from "../../store/actions/CommentActions";
import { TextField } from "@mui/material";
import useResponsive from "../../hooks/usResponsive";

const AddComment = ({ postId }) => {
    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const isDesktop = useResponsive("up", "md");

    const [postText, setPostText] = useState("");

    const handlePostText = (e) => {
        setPostText(e.target.value);
    }

    const handleAddComment = () => {
        const data = {
            text: postText
        }
        dispatch(addCommentFn(data, postId));
        setPostText("");
    }
    return (
        <Card
            variant="elevation"
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                position: "absolute",
                bottom: 10,
                width: "90%",
                p: 1,
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
        >
            {isDesktop && <CustomAvatar height="35px" width="35px" user={user} />}

            <TextField
                fullWidth
                variant="standard"
                placeholder="What's on your mind"
                name="what's in your mind"
                type="text"
                value={postText}
                onChange={handlePostText}
                sx={{
                    fontSize: { md: "1rem", sm: "0.9rem" },
                }}
            />

            <IconButton size="small" onClick={handleAddComment}>
                <Send color="primary" />
            </IconButton>
        </Card>
    )
}

export default AddComment;