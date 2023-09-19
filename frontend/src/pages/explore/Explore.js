import React, { useEffect, useState } from "react";
import CustomContainer from "../../components/CustomContainer";
import PostList from "../../components/posts/PostList";
import PostSort from "../../components/posts/PostSort";
import { useDispatch, useSelector } from "react-redux";
import { getPostsForExplorefn } from "../../store/actions/PostActions";
import Loader from "../../components/Loader";
import { Stack } from "@mui/material";

const fetchPosts = async (sortBy, dispatch, setPosts, setLoading) => {
  const posts = await dispatch(getPostsForExplorefn(sortBy, setLoading));
  setPosts(posts);
}

const Explore = () => {
  const { user } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState("Trending");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSortBy(e.target.value);
  }

  useEffect(() => {
    fetchPosts(sortBy, dispatch, setPosts, setLoading);
  }, [sortBy, dispatch]);


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
            <PostList user={user} posts={posts} />
        }
      </Stack>
    </CustomContainer>
  )
}

export default Explore;