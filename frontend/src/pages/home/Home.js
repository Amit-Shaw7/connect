import React, { useEffect, useState } from "react";
import AddPost from "./section/AddPost";
import Feed from "./section/Feed";
import PostSort from "../../components/posts/PostSort";
import CustomContainer from "../../components/customContainer/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import { getPostsForFeedFn } from "../../store/actions/PostActions";
import Loader from "../../components/loader/Loader";
import { Stack } from "@mui/material";
import Stories from "../../components/story/Stories";
import DispalyStoriesModal from "../../components/modals/DispalyStoriesModal";

const getPostsForFeed = (dispatch, sortBy) => dispatch(getPostsForFeedFn(sortBy));

const Home = () => {
  const { loading } = useSelector(state => state.post);
  const { user } = useSelector(state => state.user);
  const { posts } = useSelector(state => state.post);
  const { stories, myStory } = useSelector(state => state.story);
  const [idxOfClickedStory, setIdxOfClickedStory] = useState(0);

  const allStories = [myStory , ...stories];

  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState("Trending");
  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    setSortBy(e.target.value);
  }

  const handleOpenStoriesModal = (idx) => {
    setOpen(true);
    setIdxOfClickedStory(idx);
  }

  const handleCloseStoriesModal = () => {
    setOpen(false);
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
        <Stack p={1}>
          <Stories
            openStoryModal={handleOpenStoriesModal}
            myStory={myStory}
            user={user}
            stories={stories}
          />
          <AddPost
            user={user}
            loading={loading}
          />

          <PostSort
            sortBy={sortBy}
            handleChange={handleChange}
            heading="Trending"
          />

          <Feed
            user={user}
            posts={posts}
          />
        </Stack>
      </CustomContainer>
      <DispalyStoriesModal
        idxOfClickedStory={idxOfClickedStory}
        stories={allStories}
        open={open}
        handleClose={handleCloseStoriesModal}
      />
    </>
  )
}

export default Home;