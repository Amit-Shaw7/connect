import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Camera from "@mui/icons-material/Camera";

import EditProfileSchema from "../../schema/EditProfileSchema";
import { editProfileFn, uploadImage } from "../../store/actions/UserActions";
import Image from "../image/Image";
import UploadingModal from "../modals/UploadingModal";

const LoginForm = () => {
    const { loading } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [coverPic, setCoverPic] = useState(user?.cover ? user?.cover : "/assets/logo/logoLg.png");
    const [coverPicUrl, setcoverPicUrl] = useState("");
    const [profilePicUrl, setProfilePicUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const defaultValues = {
        name: user?.name,
        phone: user?.phone,
        website: user?.website,
        bio: user?.bio,
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(EditProfileSchema),
        defaultValues
    });

    const onSubmit = (data) => {
        console.log(data);
        data.cover = coverPicUrl;
        data.avatar = profilePicUrl
        dispatch(editProfileFn(data, setErrorMsg, navigate));
    };

    const handleChangeProfilePic = async (e) => {
        setUploading(true);
        setProfilePic(URL.createObjectURL(e.target.files[0]));
        const uploaded = await dispatch(uploadImage(e.target.files[0]));
        setProfilePicUrl(uploaded.secure_url);
        console.log(uploaded.secure_url);
        setUploading(false);
    }
    const handleChangeCoverPic = async (e) => {
        setUploading(true);
        setCoverPic(URL.createObjectURL(e.target.files[0]));
        const uploaded = await dispatch(uploadImage(e.target.files[0]));
        setcoverPicUrl(uploaded?.secure_url);
        console.log(uploaded.secure_url);
        setUploading(false);
    }
    const handleCloseUploading = () => {
        setUploading(false);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <Box sx={{ position: "relative", height: "150px", width: { xs: "90vw", sm: "100%", md: "500px" } }}>
                    <Image
                        src={coverPic ? coverPic : user?.cover}
                        height="100%"
                        width="100%"
                        fit="cover"
                    />
                    <label style={{ position: "absolute", right: "10px", top: "70%" }} htmlFor="upload-cover"><Camera fontSize="large" color="primary" /></label>
                    <TextField  {...register("coverPic")} sx={{ display: "none" }} id="upload-cover" name="upload-avatar-btn" type="file" onChange={handleChangeCoverPic} />
                </Box>

                <Box sx={{ width: "200px", marginTop: "55px", mx: "20px", p: 1, position: "absolute", zIndex: 5 }}>
                    <Avatar
                        src={profilePic ? profilePic : user?.avatar}
                        sx={{
                            height: "150px",
                            width: "150px",
                            objectFit: "contain"
                        }}
                    />
                    <label style={{ position: "relative", bottom: "50px", left: "120px" }} htmlFor="upload-avatar"><Camera fontSize="large" color="primary" /></label>
                    <TextField  {...register("profilePic")} sx={{ display: "none" }} id="upload-avatar" name="upload-avatar-btn" type="file" onChange={handleChangeProfilePic} />
                </Box>

                <Stack spacing={1} mt={10}>
                    <TextField
                        variant="filled"
                        size="small"
                        type="text"
                        name="name"
                        label="Name"
                        {...register("name")}
                        error={errors.name && true}
                        helperText={errors.name?.message}
                        fullWidth
                    />

                    <TextField
                        variant="filled"
                        size="small"
                        type="number"
                        name="phone"
                        label="Phone"
                        {...register("phone")}
                        error={errors.phone && true}
                        helperText={errors.phone?.message}
                        fullWidth
                    />

                    <TextField
                        variant="filled"
                        size="small"
                        type="text"
                        name="bio"
                        label="Bio"
                        {...register("bio")}
                        error={errors.bio && true}
                        helperText={errors.bio?.message}
                    />

                    <TextField
                        variant="filled"
                        size="small"
                        type="text"
                        name="website"
                        label="Website"
                        {...register("website")}
                        error={errors.website && true}
                        helperText={errors.website?.message}
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
                        disabled={loading || uploading}
                    >
                        {(loading || uploading) ? <CircularProgress color="inherit" size="26px" /> : "Submit"}
                    </Button>
                </Stack>
            </Stack>
            <UploadingModal open={uploading} handleClose={handleCloseUploading} />
        </form>
    )
}

export default LoginForm;