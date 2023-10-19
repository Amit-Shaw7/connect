import React, { useState } from "react";
import CustomContainer from "../../components/CustomContainer";
import PostSort from "../../components/posts/PostSort";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { Stack } from "@mui/material";
import ExploreFeed from "../../sections/explore/ExploreFeed";

const Explore = () => {
  const { user } = useSelector(state => state.user);
  const [sortBy, setSortBy] = useState("trending");
  const loading = false;

  const handleChange = (e) => {
    setSortBy(e.target.value);
  }

  return (
    <CustomContainer>
      <Stack sx={{ mx: { md: 3, sm: 0 } }}>
        <PostSort heading="Explore" sortBy={sortBy} handleChange={handleChange} />
        {
          loading
            ?
            <Stack height="70vh">
              <Loader />
            </Stack>
            :
            <ExploreFeed sortBy={sortBy} user={user} />
        }
      </Stack>
    </CustomContainer>
  )
}

export default Explore;