import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { uploadImage } from "../../store/actions/UserActions";
import { Box } from "@mui/material";
import { Camera } from "@mui/icons-material";
import Image from "../image/Image";
import UploadingModal from "../modals/UploadingModal";
import ColorPallete from "../ColorPallete";
import { addStory, editStory } from "../../store/actions/StoryAction";

const AddStoryForm = ({ handleClose, type, story }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [media, setMedia] = useState(type === "edit" ? story?.media : "");
    const [mediaUrl, setMediaUrl] = useState(type === "edit" ? story?.media : "");
    const [color, setColor] = useState(type === "edit" ? story?.color : "");
    const [text, seTtext] = useState(type === "edit" ? story?.text : "");

    const [errorMsg, setErrorMsg] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            media: mediaUrl,
            text,
            color
        }
        if (type === "edit") {
            dispatch(editStory(data, story?._id, setErrorMsg, setLoading));
            handleClose();
        } else {
            dispatch(addStory(data, setErrorMsg, setLoading));
        }
        handleClose();
    };

    const handleText = (e) => {
        seTtext(e.target.value);
    }

    const handleChangeMedia = async (e) => {
        setUploading(true);
        setMedia(URL.createObjectURL(e.target.files[0]));
        const uploaded = await dispatch(uploadImage(e.target.files[0]));
        setMediaUrl(uploaded.secure_url);
        console.log(uploaded.secure_url);
        setUploading(false);
    }

    const handleCloseUploading = () => {
        setUploading(false);
    }
    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <Box sx={{ position: "relative", height: { md: "max-content", xs: "300px" }, width: { md: "300px", xs: "100%" } }}>
                    <Stack flexDirection="row" justifyContent="space-between">
                        {
                            media
                                ?
                                <Stack position="relative">
                                    <Image
                                        src={media}
                                        height="300px"
                                        width="200px"
                                        fit="cover"
                                    />
                                    <Box width="100%" sx={{ backgroundColor: "red" }}>
                                        <Typography variant="caption" sx={{ wordWrap: "break-word", width: "100%", position: "absolute", bottom: "40px", color: { color } }} textAlign="center">{text}</Typography>
                                    </Box>
                                </Stack>
                                :
                                <Stack
                                    height="250px"
                                    width="200px"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        backgroundColor: "lightgray"
                                    }}
                                >
                                    <label
                                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                        htmlFor="upload-story"
                                    >
                                        <Camera fontSize="large" color="primary" />
                                    </label>

                                </Stack>
                        }
                        <ColorPallete setColor={setColor} />
                    </Stack>
                    <TextField
                        sx={{ display: "none" }}
                        id="upload-story"
                        name="upload-avatar-btn"
                        type="file"
                        onChange={handleChangeMedia}
                    />
                </Box>

                <Stack spacing={1} mt={2}>
                    <TextField
                        value={text}
                        variant="filled"
                        size="small"
                        type="text"
                        name="text"
                        label="Text"
                        fullWidth
                        onChange={handleText}
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

export default AddStoryForm;