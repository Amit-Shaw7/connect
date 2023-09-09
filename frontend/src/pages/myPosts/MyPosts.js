import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomContainer from "../../components/customContainer/CustomContainer";
import PostList from "../../components/posts/PostList";
import PostSort from "../../components/posts/PostSort";
import { fetchMyPostsFn } from "../../store/actions/PostActions";
import Loader from "../../components/loader/Loader";
import { Stack } from "@mui/material";

const fetchMyPosts = async (dispatch, sortBy) => {
  await dispatch(fetchMyPostsFn(sortBy));
};

const MyPosts = () => {
  const { user } = useSelector(state => state.user);
  const { loading, myposts } = useSelector(state => state.post);

  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("Trending");
  const handleChange = (e) => {
    setSortBy(e.target.value);
  }

  useEffect(() => {
    fetchMyPosts(dispatch, sortBy);
  }, [dispatch, sortBy]);

  if (loading) {
    return <Loader />;
  }

  return (
    <CustomContainer>
      <Stack sx={{ mx: { md: 3, sm: 0 } }}>
        <PostSort heading="My Posts" sortBy={sortBy} handleChange={handleChange} />
        <PostList editable={true} user={user} posts={myposts} />
      </Stack>
    </CustomContainer>
  )
}

export default MyPosts