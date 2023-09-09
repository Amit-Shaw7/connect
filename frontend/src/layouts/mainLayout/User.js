import React, { useState } from "react";
import moment from "moment/moment";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CustomButton from "../../components/customButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUserFn, unfollowUserFn } from "../../store/actions/UserActions";
import { ListItemButton } from "@mui/material";


const User = ({ user, createdAt, type }) => {
    const { user: loggedInUser } = useSelector(state => state.user);

    const [followed, setFollowed] = useState(loggedInUser?.followings?.includes(user?._id));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goToUserPage = (id) => {
        navigate(`/user/${id}`);
    }

    const follow = async (id) => {
        setFollowed(true);
        const follow = await dispatch(followUserFn(id));
        console.log("Followed" + follow);
        if (!follow) {
            setFollowed(false);
        }
        
    }
    const unfollow = async (id) => {
        setFollowed(false);
        const unfollow = await dispatch(unfollowUserFn(id));
        console.log("unFollowed" + unfollow);
        if (!unfollow) {
            setFollowed(true);
        }
    }
    return (
        <>
            <ListItem
                secondaryAction={
                    type === "user" &&
                    (
                        followed
                            ?
                            <CustomButton
                                onClickFn={() => unfollow(user?._id)}
                                size="small"
                                text="UnFollow"
                            />
                            :
                            <CustomButton
                                onClickFn={() => follow(user?._id)}
                                size="small"
                                text="Follow"
                            />

                    )
                }
                disablePadding
                sx={{
                    cursor: "pointer",
                    width: type === "user" ? "100%" : "max-content",
                }}
            >
                <>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                height: "40px",
                                width: "40px"
                            }}
                            alt={"image"}
                            src={user?.avatar}
                            onClick={() => goToUserPage(user?._id)}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        id={user?.username}
                        primary={user?.name}
                        secondary={
                            createdAt
                                &&
                                // <Stack flexDirection="row" alignItems="center" gap={1}>
                                //     <Typography variant="caption">
                                       <> {user?.username} - {moment(createdAt, "YYYYMMDD HH:mm:ss GMT Z").fromNow()}</>
                                //     </Typography>
                                //     <Typography>
                                //         -
                                //     </Typography>
                                //     <Typography variant="caption">
                                //         {moment(createdAt, "YYYYMMDD HH:mm:ss GMT Z").fromNow()}
                                //     </Typography>
                                // </Stack>
                        }
                        onClick={() => goToUserPage(user?._id)}
                    />
                </>
            </ListItem>
        </>
    )
}

export default User