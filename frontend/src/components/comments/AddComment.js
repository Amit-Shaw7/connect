import React, { useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CustomAvatar from "../CustomAvatar";
import CustomTextInput from "../customInput/CustomInput";
import Send from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { addCommentFn } from "../../store/actions/CommentActions";

const AddComment = ({ postId }) => {
    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();

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
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                position: "static",
                bottom: 0,
                width: "100%",
                p: 1,
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
        >
            <CustomAvatar height="35px" width="35px" user={user} />

            <CustomTextInput
                fullWidth={true}
                query={postText}
                handleQuery={handlePostText}
            />

            <IconButton onClick={handleAddComment}>
                <Send />
            </IconButton>
        </Card>
    )
}

export default AddComment;