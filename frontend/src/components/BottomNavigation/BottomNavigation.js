import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Add, Book, Bookmark, BookmarkOutlined, Explore, ExploreOutlined, Home, HomeOutlined, Person, PersonOff, PersonOutline } from '@mui/icons-material';
import { Stack, useTheme } from '@mui/material';
import BottomAction from './BottomAction';
import { useLocation } from 'react-router-dom';

export default function SimpleBottomNavigation({ user }) {

    const location = useLocation();
    const [value, setValue] = React.useState(0);
    const theme = useTheme();

    return (
        <Stack sx={{ width: "100%"}}>
            <Box
                sx={{
                    display: "flex",
                    width:"100%",
                    alignItems: "center",
                    flexDirection:"row",
                }}
            >
                <BottomAction
                    label="Home"
                    icon={<HomeOutlined color='primary' />}
                    selected={true}
                    selectedIcon={<Home color='primary' />}
                    path="/"
                />

                <BottomAction
                    label="Explore"
                    selected={false}
                    selectedIcon={<Explore color='primary' />}
                    icon={<ExploreOutlined color='primary' />}
                    path="/explore"
                />
                <BottomAction
                    icon={<Stack sx={{ backgroundColor: "#2196f3" }}
                        borderRadius="100%">
                        <Add htmlColor='white' fontSize='large' />
                    </Stack>}
                />
                <BottomAction
                    label="Saved"
                    selected={false}
                    selectedIcon={<Bookmark color='primary' />}
                    icon={<BookmarkOutlined color='primary' />}
                    path="/saved-posts"
                />
                <BottomAction
                    label="Account"
                    selected={false}
                    selectedIcon={<PersonOutline color='primary' />}
                    icon={<Person color='primary' />}
                    path={`/profile/${user?._id}`}
                />
            </Box>
        </Stack>
    );
}