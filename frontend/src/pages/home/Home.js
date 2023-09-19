import React, { useEffect, useState } from "react";
import AddPost from "../../sections/home/AddPost";
import Feed from "../../sections/home/Feed";
import PostSort from "../../components/posts/PostSort";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import { getPostsForFeedFn } from "../../store/actions/PostActions";
import Loader from "../../components/Loader";
import { Stack } from "@mui/material";
import Stories from "../../components/story/Stories";
import DispalyStoriesModal from "../../components/modals/DispalyStoriesModal";

const getPostsForFeed = (dispatch, sortBy, setLoading) => dispatch(getPostsForFeedFn(sortBy, setLoading));

const Home = () => {
  const { user } = useSelector(state => state.user);
  const { posts } = useSelector(state => state.post);
  const { stories, myStory } = useSelector(state => state.story);
  const [idxOfClickedStory, setIdxOfClickedStory] = useState(0);
  const [loading, setLoading] = useState(false);

  const allStories = [myStory, ...stories];

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
    getPostsForFeed(dispatch, sortBy, setLoading);
  }, [sortBy, dispatch]);

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
          {
            loading
              ?
              <Stack height="70vh">
                <Loader />
              </Stack>
              :
              <Feed
                user={user}
                posts={posts}
              />
          }
        </Stack>
      </CustomContainer>
      <DispalyStoriesModal
        user={user}
        idxOfClickedStory={idxOfClickedStory}
        stories={myStory ? allStories : stories}
        open={open}
        handleClose={handleCloseStoriesModal}
      />
    </>
  )
}

export default Home;