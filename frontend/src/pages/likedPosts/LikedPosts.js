import React, {  useState } from "react";
import {  useSelector } from "react-redux";
import CustomContainer from "../../components/CustomContainer";
import PostSort from "../../components/posts/PostSort";
import Loader from "../../components/Loader";
import { Stack } from "@mui/material";
import LikedPostsFeed from "../../sections/likedPosts/LikedPostsFeed";


const LikedPosts = () => {
  const { user } = useSelector(state => state.user);


  const [sortBy, setSortBy] = useState("trending");
  const handleChange = (e) => {
    setSortBy(e.target.value);
  };
  const loading = false;


  return (
    <CustomContainer>
      <Stack sx={{ mx: { md: 3, sm: 0 } }}>
        <PostSort heading="Liked" sortBy={sortBy} handleChange={handleChange} />
        {
          loading
            ?
            <Stack height="70vh">
              <Loader />
            </Stack>
            :
            <LikedPostsFeed sortBy={sortBy} user={user} />
        }
      </Stack>
    </CustomContainer>
  )
}

export default LikedPosts