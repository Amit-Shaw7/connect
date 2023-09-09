import React, { useState } from 'react'
import { IconButton, Stack } from '@mui/material'
import CustomAvatar from '../CustomAvatar'
import CustomTextInput from '../customInput/CustomInput'
import { Send } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentFn } from '../../store/actions/CommentActions'

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
    }
    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            gap={2}
            my={1}
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
        </Stack>
    )
}

export default AddComment;