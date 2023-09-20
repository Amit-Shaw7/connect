import React, { useState } from "react";
import moment from "moment/moment";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollowUserFn } from "../../store/actions/UserActions";


const User = ({ user, createdAt, type }) => {
    const { user: loggedInUser } = useSelector(state => state.user);

    const [followed, setFollowed] = useState(loggedInUser?.followings?.includes(user?._id));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goToUserPage = (id) => {
        navigate(`/user/${id}`);
    }

    const handleFollowUnfollow = () => {
        setFollowed((prev) => !prev);
        dispatch(followUnfollowUserFn(user?._id));
    }
    return (
        <>
            <ListItem
                secondaryAction={
                    type === "user" &&
                    (
                        <CustomButton
                            onClickFn={handleFollowUnfollow}
                            size="small"
                            text={followed ? "UnFollow" : "Follow"}
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