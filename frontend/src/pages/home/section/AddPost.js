import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CustomTextArea from "../../../components/customInput/CustomTextArea";
import CustomButton from "../../../components/customButton/CustomButton";
import CollectionsOutlined from "@mui/icons-material/CollectionsOutlined";
import SentimentSatisfiedAlt from "@mui/icons-material/SentimentSatisfiedAlt";
import { addPostFn } from "../../../store/actions/PostActions";
import Loader from "../../../components/loader/Loader";
import CustomAvatar from "../../../components/CustomAvatar";
import { TextField } from "@mui/material";
import { UploadOutlined } from "@mui/icons-material";
import UploadinModal from "../../../components/modals/UploadingModal";
import { uploadImage } from "../../../store/actions/UserActions";
import { Image } from "../../../components/image";

const AddPost = ({ user }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [uploading, setUpLoading] = useState(false);
    const [postText, setPostText] = useState("");
    const [postMedia, setPostMedia] = useState();
    const [postMediaUrl, setPostMediaUrl] = useState();

    const handlePostText = (e) => {
        setPostText(e.target.value);
    }
    const handlePostMedia = async(e) => {
        setUpLoading(true);
        setPostMedia(URL.createObjectURL(e.target.files[0]));
        const uploaded = await dispatch(uploadImage(e.target.files[0]));
        console.log(uploaded);
        setPostMediaUrl(uploaded?.secure_url);
        setUpLoading(false);
    }
    const handleCloseModal= (e) => {
        setUpLoading(e.target.files[0]);
    }

    const handleAddPost = (e) => {
        e.preventDefault();
        const data = {
            media: postMediaUrl,
            postText,
        }
        dispatch(addPostFn(data));
    }

    return (
        <Card
            variant='outlined'
            sx={{
                p: 2,
                position: "relative",
                minHeight: {md:"180px" , sm:"120px"},
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column"
            }}
        >
            {loading
                ?
                <Loader />
                :
                <>
                    <Stack
                        flexDirection="row"
                        alignItems="flex-start"
                        gap={2}
                    >
                        <CustomAvatar user={user} />

                        <Stack
                            spacing={1}
                            flexDirection="column"
                        >
                            <CustomTextArea
                                fullWidth={true}
                                query={postText}
                                handleQuery={handlePostText}
                            />
                        </Stack>
                    </Stack>

                    {postMedia && <Image height="150px"  width="150px" fit="contain" src={postMedia}/>}

                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Stack
                            flexDirection="row"
                            alignItems="center"
                        >
                            <IconButton sx={{ display:"flex" , alignItem:'center' , justifyContent:"center"}}>
                                <label htmlFor="upload-post">
                                    <CollectionsOutlined color='primary' />
                                </label>
                            </IconButton>
                            <TextField id="upload-post" name="upload-post-field" onChange={handlePostMedia} type="file" sx={{ display: "none" }} />
                            <IconButton>
                                <SentimentSatisfiedAlt color='primary' />
                            </IconButton>
                        </Stack>

                        <CustomButton text="Post" onClickFn={handleAddPost} />
                    </Stack>
                </>}
                <UploadinModal open={uploading}  handleClose={handleCloseModal}/>
        </Card>
    )
}

export default AddPost