import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomContainer from "../../components/CustomContainer";
import PostSort from "../../components/posts/PostSort";
import Loader from "../../components/Loader";
import { Stack } from "@mui/material";
import MyPostsFeed from "../../sections/myPosts/MyPostsFeed";

const MyPosts = () => {
  const { user } = useSelector(state => state.user);

  const [sortBy, setSortBy] = useState("trending");
  const loading = false;
  const handleChange = (e) => {
    setSortBy(e.target.value);
  }


  return (
    <CustomContainer>
      <Stack sx={{ mx: { md: 3, sm: 0 } }}>
        <PostSort heading="My Posts" sortBy={sortBy} handleChange={handleChange} />
        {
          loading
            ?
            <Stack height="70vh">
              <Loader />
            </Stack>
            :
            <MyPostsFeed sortBy={sortBy} user={user} />
        }
      </Stack>
    </CustomContainer>
  )
}

export default MyPosts