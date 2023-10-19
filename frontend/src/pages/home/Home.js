import React, {  useState } from "react";
import AddPost from "../../sections/home/AddPost";
import Feed from "../../sections/home/Feed";
import PostSort from "../../components/posts/PostSort";
import CustomContainer from "../../components/CustomContainer";
import {useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { Stack } from "@mui/material";
import Stories from "../../components/story/Stories";
import DispalyStoriesModal from "../../components/modals/DispalyStoriesModal";


const Home = () => {
  const { user } = useSelector(state => state.user);
  const { stories, myStory } = useSelector(state => state.story);
  const [idxOfClickedStory, setIdxOfClickedStory] = useState(0);
  // const [loading, setLoading] = useState(false);
  const loading = false;

  const allStories = [myStory, ...stories];


  const [sortBy, setSortBy] = useState("trending");
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
            // loading={loading}
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
                sortBy={sortBy}
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