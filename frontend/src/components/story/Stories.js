import React from 'react';
import { Box, Stack, Typography } from "@mui/material";
import Story from './Story';
import Image from '../image/Image';
import AddStory from './AddStory';

const Stories = ({ user, stories, myStory }) => {
  return (
    <Stack
      className='hide-scrollbar'
      width="100%"
      gap={1}
      justifyContent="flex-start"
      alignItems="center"
      display="flex"
      flexDirection="row"
      sx={{
        overflowX: "scroll",
        py: 2,
      }}
    >
      <Box display="flex" gap={2}>
        {
          myStory
            ?
            <Story user={user} story={myStory} />
            :
            <AddStory user={user} />
        }

        {
          stories?.map((story, index) => (
            <Story key={index} story={story} />
          ))
        }
      </Box>
    </Stack>
  )
}

export default Stories;