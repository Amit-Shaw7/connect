import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import UserInfo from "./UserInfo";
import UserImages from "./UserImages";
import CustomContainer from "../../components/customContainer";
import { getUserProfileFn } from "../../store/actions/UserActions";
import CustomCard from "../../components/customCard/CustomCard";
import CustomButton from "../../components/customButton/CustomButton";
import EditProfileModal from "../../components/modals/EditProfileModal";
import Loader from "../../components/loader/Loader";
import MoreInfo from "./MoreInfo";

const fetchSavedPosts = async (setLoading, dispatch, paramId, setUser) => {
  setLoading(true);
  const user = await dispatch(getUserProfileFn(paramId));
  setUser(user);
  setLoading(false);
}

const Profile = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const [currentTab, setCurrentTab] = useState("posts");

  const handleOpenEditProfileModal = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetchSavedPosts(setLoading, dispatch, params.id, setUser);
  }, [dispatch, params.id]);

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <>
      <CustomContainer>
        <CustomCard>
          <UserImages user={user} />

          <CustomButton
            onClickFn={handleOpenEditProfileModal}
            sx={{
              alignSelf: "end"
            }}
            text="Edit Profile"
          />

          <UserInfo user={user} setCurrentTab={setCurrentTab} />
        </CustomCard>

        <Box sx={{ my: "20px" }}>
          <MoreInfo currentTab={currentTab} />
        </Box>
      </CustomContainer>
      <EditProfileModal user={user} open={open} handleClose={handleClose} />
    </>
  )
}

export default Profile;