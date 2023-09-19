import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import updatePostSchema from '../../schema/UpdatePostSchema';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostFn } from '../../store/actions/PostActions';

const UpdatePostForm = ({ handleClose, handlePostText, post }) => {
    const { loading } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState("");


    const defaultValues = {
        postText: post.postText,
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updatePostSchema),
        defaultValues
    });

    const onSubmit = (data) => {
        handlePostText(data.postText);
        handleClose();
        dispatch(updatePostFn(post._id, data, setErrorMsg));
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
                spacing={2}
            >
                <TextField
                    variant="filled"
                    size="small"
                    type="text"
                    name="text"
                    label="Text"
                    {...register("postText")}
                    error={errors.postText && true}
                    helperText={errors.postText?.message}
                />

                <Typography
                    variant="caption"
                    textAlign="center"
                    color="red"
                >
                    {errorMsg && errorMsg}
                </Typography>

                <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    disabled={loading}
                >
                    {loading ? <CircularProgress color="inherit" size="26px" /> : "Submit"}
                </Button>
            </Stack>
        </form>
    )
}

export default UpdatePostForm