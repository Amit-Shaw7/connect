import React, { useEffect, useState } from "react";
import AddPost from "./section/AddPost";
import Feed from "./section/Feed";
// import { posts } from "../../mocks/post";
import PostSort from "../../components/posts/PostSort";
import CustomContainer from "../../components/customContainer/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import { getPostsForFeedFn } from "../../store/actions/PostActions";
import Loader from "../../components/loader/Loader";
import { Stack } from "@mui/material";
import Stories from "../../components/story/Stories";

const getPostsForFeed = (dispatch, sortBy) => dispatch(getPostsForFeedFn(sortBy));

const Home = () => {
  const { loading } = useSelector(state => state.post);
  const { user } = useSelector(state => state.user);
  const { posts } = useSelector(state => state.post);
  const { stories, myStory } = useSelector(state => state.story);


  // const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("Trending");
  const handleChange = (e) => {
    setSortBy(e.target.value);
  }

  useEffect(() => {
    getPostsForFeed(dispatch, sortBy);
  }, [sortBy, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <CustomContainer>
        <Stories myStory={myStory} user={user} stories={stories} />
        <AddPost user={user} loading={loading} />
        <Stack sx={{ mx: { md: 3, sm: 0 } }}>

          <PostSort sortBy={sortBy} handleChange={handleChange} heading="Trending" />

          <Feed user={user} posts={posts} />
        </Stack>
      </CustomContainer>
    </>
  )
}

export default Home;