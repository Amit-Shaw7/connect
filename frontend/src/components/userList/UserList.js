import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import CustomCard from '../customCard/CustomCard';

const UserList = ({ users }) => {
    return (
        <CustomCard>
            <List sx={{gap:1}}>
                {
                    users?.map((user) => (
                        <ListItem
                            key={user?._id}
                            // disablePadding
                        >
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar
                                        sx={{
                                            height: "50px",
                                            width: "50px"
                                        }}
                                        alt={"image"}
                                        src={user?.avatar}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    id={user?.username}
                                    primary={user?.name}
                                    secondary={user?.username}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </CustomCard>
    )
}

export default UserList