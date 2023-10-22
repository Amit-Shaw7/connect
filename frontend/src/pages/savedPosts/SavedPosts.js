import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomContainer from "../../components/CustomContainer";
import PostSort from "../../components/posts/PostSort";
import Loader from "../../components/Loader";
import { Stack } from "@mui/material";
import SavedPostsFeed from "../../sections/savedPosts/SavedPostsFeed";

const SavedPosts = () => {
  const { user } = useSelector(state => state.user);

  const [sortBy, setSortBy] = useState("trending");
  const handleChange = (e) => {
    setSortBy(e.target.value);
  };
  const loading = false;

  return (
    <CustomContainer>
      <Stack sx={{ mx: { md: 3, sm: 0 } }}>
        <PostSort heading="Saved" sortBy={sortBy} handleChange={handleChange} />
        {
          loading
            ?
            <Stack height="70vh">
              <Loader />
            </Stack>
            :
            <SavedPostsFeed user={user} sortBy={sortBy} />
        }
      </Stack>
    </CustomContainer>
  )
}

export default SavedPosts;