import { Popover, Stack, Typography } from "@mui/material"
import axios from "axios"
import React, {  useState } from "react"
import CustomTextInput from "../../components/customInput/CustomInput";
import Loader from "../../components/Loader";


const searchEmoji = async (query, setEmojis) => {
    let response = {};
    const url = `https://emoji-api.com/emojis?search=${query}&access_key=${process.env.REACT_APP_EMOJI_API_KEY}`;
    try {
        response = await axios.get(url);
    } catch (error) {
        console.log(error);
    } finally {
        if (response.status === 200) {
            setEmojis(response?.data);
        }
    }
}

const EmojiPopover = ({ emojis , setEmojis , posText, setPostText, open, anchorEl, handleClose }) => {
    // const [emojis, setEmojis] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePostText = (val) => {
        setPostText(posText.concat(val));
    }

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value);
        searchEmoji(e.target.value, setEmojis);
    }

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
        >
            <Stack height="300px" flexDirection="row" alignItems="flex-start" gap={1} p={1} sx={{width:{ms:"200px" , md:"300px"}}}>
                {loading
                    ?
                    <Loader />
                    :
                    <Stack width="max-content" height="max-content" flexDirection="row" alignItems="flex-start" gap={1} flexWrap="wrap">
                        
                        {
                            emojis?.length > 0
                                ?
                                emojis?.map((emoji) => (
                                    <Typography key={emoji.character} sx={{ cursor: "pointer" }} onClick={() => handlePostText(emoji.character)}>{emoji.character}</Typography>
                                ))
                                :
                                <Typography>No emojis found</Typography>
                        }
                    </Stack>}
            </Stack>
            <Stack p={1}>
                <CustomTextInput fullWidth={true} query={searchQuery} handleQuery={handleSearchQuery} />
            </Stack>
        </Popover>
    )
}

export default EmojiPopover