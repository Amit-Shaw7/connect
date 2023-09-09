import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomContainer from "../../components/customContainer/CustomContainer";
import PostList from "../../components/posts/PostList";
import PostSort from "../../components/posts/PostSort";
import { getSavedPostsFn } from "../../store/actions/PostActions";
import Loader from "../../components/loader/Loader";
import { Stack } from "@mui/material";

const fetchSavedPosts = async (dispatch) => {
  await dispatch(getSavedPostsFn());
};

const SavedPosts = () => {
  const { user } = useSelector(state => state.user);
  const { loading, savedPosts } = useSelector(state => state.post);

  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("Trending");
  const handleChange = (e) => {
    setSortBy(e.target.value);
  }

  useEffect(() => {
    fetchSavedPosts(dispatch);
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <CustomContainer>
      <Stack sx={{ mx: { md: 3, sm: 0 } }}>
        <PostSort heading="Saved" sortBy={sortBy} handleChange={handleChange} />
        <PostList user={user} posts={savedPosts} />
      </Stack>
    </CustomContainer>
  )
}

export default SavedPosts;