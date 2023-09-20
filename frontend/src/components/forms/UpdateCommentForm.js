import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { editCommentFn } from "../../store/actions/CommentActions";
import updateCommentSchema from "../../schema/UpdateCommentSchema";

const UpdateCommentForm = ({ handleClose, handleCommentText, comment }) => {
    const { loading } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState("");


    const defaultValues = {
        text: comment.text,
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updateCommentSchema),
        defaultValues
    });

    const onSubmit = (data) => {
        handleCommentText(data.text);
        handleClose();
        dispatch(editCommentFn(comment._id, data, setErrorMsg));
    };
    return (
        <Stack
            spacing={2}
            bgcolor="background.primary"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextField
                variant="filled"
                size="small"
                type="text"
                name="text"
                label="Text"
                {...register("text")}
                error={errors.text && true}
                helperText={errors.text?.message}
            />

            <Typography
                variant="caption"
                textAlign="center"
                color="red"
            >
                {errorMsg && errorMsg}
            </Typography>

            <Button
                type="submit"
                variant="contained"
                size="large"
            >
                {loading ? <CircularProgress color="inherit" size="26px" /> : "Submit"}
            </Button>
        </Stack>
    )
}

export default UpdateCommentForm;