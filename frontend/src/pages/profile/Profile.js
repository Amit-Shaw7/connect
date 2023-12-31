import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import CustomContainer from "../../components/CustomContainer";
import { followUnfollowUserFn, getUserProfileFn } from "../../store/actions/UserActions";
import CustomCard from "../../components/CustomCard";
import CustomButton from "../../components/CustomButton";
import EditProfileModal from "../../components/modals/EditProfileModal";
import Loader from "../../components/Loader";
import UserInfo from "../../sections/profile/UserInfo";
import UserImages from "../../sections/profile/UserImages";
import MoreInfo from "../../sections/profile/MoreInfo";
import { Stack } from "@mui/material";

const fetchUserPosts = async (setLoading, dispatch, paramId, setUser) => {
  setLoading(true);
  const user = await dispatch(getUserProfileFn(paramId));
  setUser(user);
  setLoading(false);
}

const Profile = () => {
  const { user: loggedInUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const [currentTab, setCurrentTab] = useState("posts");

  const following = loggedInUser?.followings?.includes(user?._id);
  const [isFollowing, setIsFollowing] = useState(following);

  const handleFollowUnfollow = () => {
    setIsFollowing((prev) => !prev);
    dispatch(followUnfollowUserFn(user?._id));
  }

  const handleOpenEditProfileModal = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetchUserPosts(setLoading, dispatch, params.id, setUser);
  }, [dispatch, params.id]);

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <Stack p={1}>
      <CustomContainer>
        <CustomCard>
          <UserImages user={user} />

          {user?._id === loggedInUser?._id ?
            <CustomButton
              onClickFn={handleOpenEditProfileModal}
              sx={{
                alignSelf: "end"
              }}
              text="Edit Profile"
            />
            :
            <CustomButton
              onClickFn={handleFollowUnfollow}
              sx={{
                alignSelf: "end"
              }}
              text={isFollowing || loggedInUser?.followings?.includes(user?._id) ? "UnFollow" : "Follow"}
            />
          }

          <UserInfo currentTab={currentTab} user={user} setCurrentTab={setCurrentTab} />
        </CustomCard>

        <Box sx={{ my: "20px" }}>
          <MoreInfo currentTab={currentTab} />
        </Box>
      </CustomContainer>
      <EditProfileModal user={user} open={open} handleClose={handleClose} />
    </Stack>
  )
}

export default Profile;