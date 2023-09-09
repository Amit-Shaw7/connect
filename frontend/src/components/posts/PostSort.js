import React from 'react';
import { FormControl, MenuItem, Select, Stack, Typography } from '@mui/material'
const types = [
    "Trending",
    "Latest",
    "Oldest"
]

const PostSort = ({ sortBy, heading, handleChange }) => {

    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            my="30px"
            sx={{
                px:{ xs:"10px" , sm: "10px", md: "5px"}
            }}
        >
            <Typography variant='h5'>{heading}</Typography>
            <FormControl sx={{ width: "110px" }}>
                <Select
                    size='small'
                    variant='outlined'
                    value={sortBy}
                    onChange={handleChange}
                    id="demo-simple-select"
                >
                    {
                        types?.map((type) => (
                            <MenuItem value={type} key={type}>{type}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Stack>
    )
}

export default PostSort