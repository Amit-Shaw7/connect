import React from "react";
import { Box, Stack } from "@mui/material";
import Story from "./Story";
import AddStory from "./AddStory";

const Stories = ({ openStoryModal, user, stories, myStory }) => {
  return (
    <Stack
      className="hide-scrollbar"
      width="100%"
      gap={1}
      justifyContent="flex-start"
      alignItems="center"
      display="flex"
      flexDirection="row"
      sx={{
        overflowX: "scroll",
        pb:2
      }}
    >
      <Box display="flex" gap={2}>
        {
          myStory
            ?
            <Story
              openStoryModal={openStoryModal}
              user={user}
              story={myStory}
              idx={0}
            />
            :
            <AddStory user={user} />
        }

        {
          stories?.map((story, index) => (
            <Story
              openStoryModal={openStoryModal}
              idx={myStory ? index + 1 : index}
              key={index}
              story={story}
            />
          ))
        }
      </Box>
    </Stack>
  )
}

export default Stories;