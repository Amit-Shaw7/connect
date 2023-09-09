import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomContainer from "../../components/customContainer/CustomContainer";
import PostList from "../../components/posts/PostList";
import PostSort from "../../components/posts/PostSort";
import { getLikedPostsFn } from "../../store/actions/PostActions";
import Loader from "../../components/loader/Loader";
import { Stack } from "@mui/material";

const fetchSavedPosts = async (dispatch, sortBy) => {
  await dispatch(getLikedPostsFn());
};

const LikedPosts = () => {
  const { user } = useSelector(state => state.user);
  const { loading, likedPosts } = useSelector(state => state.post);

  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("Trending");
  const handleChange = (e) => {
    setSortBy(e.target.value);
  }

  useEffect(() => {
    fetchSavedPosts(dispatch, sortBy);
  }, [dispatch, sortBy]);

  if (loading) {
    return <Loader />;
  }

  return (
    <CustomContainer>
      <Stack sx={{ mx: { md: 3, sm: 0 } }}>
        <PostSort heading="Liked" sortBy={sortBy} handleChange={handleChange} />
        <PostList user={user} posts={likedPosts} />
      </Stack>
    </CustomContainer>
  )
}

export default LikedPosts