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
import useResponsive from "../../hooks/usResponsive";
import SimpleBottomNavigation from "../../components/BottomNavigation/BottomNavigation";


const Home = () => {
  const { loading } = useSelector(state => state.post);
  const { user } = useSelector(state => state.user);
  const { posts } = useSelector(state => state.post);

  // const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("Trending");
  const handleChange = (e) => {
    setSortBy(e.target.value);
  }

  useEffect(() => {
    dispatch(getPostsForFeedFn(sortBy));
  }, [dispatch, sortBy]);

  if (loading) {
    return <Loader />;
  }

  return (
    <CustomContainer>
      <AddPost user={user} loading={loading} />
      <Stack sx={{ mx: { md: 3, sm: 0 } }}>

        <PostSort sortBy={sortBy} handleChange={handleChange} heading="Trending" />

        <Feed user={user} posts={posts} />
      </Stack>
    </CustomContainer>
  )
}

export default Home;