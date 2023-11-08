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
import useResponsive from "../../hooks/usResponsive";


const User = ({ user, createdAt, type }) => {
    const { user: loggedInUser } = useSelector(state => state.user);

    const isFollowed = loggedInUser?.followings?.includes(user?._id);
    const [followed, setFollowed] = useState(isFollowed);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isTablet = useResponsive("up", "sm");

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
               
                sx={{
                    cursor: "pointer",
                    width: type === "user" ? "100%" : "max-content",
                }}
            >
                <>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                height: { md: "40px", sm: "30px" },
                                width: { md: "40px", sm: "30px" }
                            }}
                            alt={"image"}
                            src={user?.avatar}
                            onClick={() => goToUserPage(user?._id)}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        id={user?.username}
                        primary={
                            isTablet ? user?.name : (user?.name?.length > 10 ? user?.name?.slice(0, 10) + "..." : user?.name?.slice(0, 10))
                        }
                        secondary={
                            createdAt
                            &&
                            <>
                                {user?.username} - {moment(createdAt, "YYYYMMDD HH:mm:ss GMT Z").fromNow()}
                            </>
                        }
                        onClick={() => goToUserPage(user?._id)}
                    />
                </>
            </ListItem>
        </>
    )
}

export default User