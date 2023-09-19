import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomContainer from "../../components/CustomContainer";
import PostList from "../../components/posts/PostList";
import PostSort from "../../components/posts/PostSort";
import { getLikedPostsFn } from "../../store/actions/PostActions";
import Loader from "../../components/Loader";
import { Stack } from "@mui/material";

const fetchSavedPosts = async (dispatch, setLoading) => {
  setLoading(true);
  await dispatch(getLikedPostsFn(setLoading));
};

const LikedPosts = () => {
  const { user } = useSelector(state => state.user);
  const { likedPosts } = useSelector(state => state.post);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("Trending");
  const handleChange = (e) => {
    setSortBy(e.target.value);
  }

  useEffect(() => {
    fetchSavedPosts(dispatch, setLoading);
  }, [dispatch, sortBy]);


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
            <PostList user={user} posts={likedPosts} />
        }
      </Stack>
    </CustomContainer>
  )
}

export default LikedPosts