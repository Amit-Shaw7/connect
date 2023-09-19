import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomContainer from "../../components/CustomContainer";
import PostList from "../../components/posts/PostList";
import PostSort from "../../components/posts/PostSort";
import { getSavedPostsFn } from "../../store/actions/PostActions";
import Loader from "../../components/Loader";
import { Stack } from "@mui/material";

const fetchSavedPosts = async (dispatch, setLoading) => {
  await dispatch(getSavedPostsFn(setLoading));
};

const SavedPosts = () => {
  const { user } = useSelector(state => state.user);
  const { savedPosts } = useSelector(state => state.post);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("Trending");
  const handleChange = (e) => {
    setSortBy(e.target.value);
  }

  useEffect(() => {
    fetchSavedPosts(dispatch, setLoading);
  }, [dispatch]);

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
            <PostList user={user} posts={savedPosts} />
        }
      </Stack>
    </CustomContainer>
  )
}

export default SavedPosts;