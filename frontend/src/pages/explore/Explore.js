import React, { useEffect, useState } from "react";
import CustomContainer from "../../components/customContainer/CustomContainer";
import PostList from "../../components/posts/PostList";
import PostSort from "../../components/posts/PostSort";
import { useDispatch, useSelector } from "react-redux";
import { getPostsForExplorefn } from "../../store/actions/PostActions";
import Loader from "../../components/loader/Loader";
import { Stack } from "@mui/material";

const fetchPosts = async (sortBy, dispatch, setPosts) => {
  const posts = await dispatch(getPostsForExplorefn(sortBy));
  setPosts(posts);
}

const Explore = () => {
  const { loading } = useSelector(state => state.post);
  const { user } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState("Trending");
  const [posts, setPosts] = useState([]);

  const handleChange = (e) => {
    setSortBy(e.target.value);
  }

  useEffect(() => {
    fetchPosts(sortBy, dispatch, setPosts);
  }, [sortBy, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <CustomContainer>
      <Stack sx={{ mx: { md: 3, sm: 0 } }}>
        <PostSort heading="Explore" sortBy={sortBy} handleChange={handleChange} />
        <PostList user={user} posts={posts} />
      </Stack>
    </CustomContainer>
  )
}

export default Explore;