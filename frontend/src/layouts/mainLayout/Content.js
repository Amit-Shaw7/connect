import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUserFn } from "../../store/actions/UserActions";
import Loader from "../../components/loader/Loader";
import { Box } from "@mui/material";
import Stories from "../../components/story/Stories";
import { fetchMyStory, fetchStoriesFn } from "../../store/actions/StoryAction";

const Content = ({ children }) => {
  const { loading } = useSelector(state => state.user);
  const { userId } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const getUser = (dispatch, navigate, userId) => {
  //   dispatch(loadUserFn(userId, navigate));
  // };

  useEffect(() => {
    dispatch(loadUserFn(userId, navigate));
    dispatch(fetchStoriesFn());
    dispatch(fetchMyStory())
  }, [dispatch, navigate, userId]);

  if (loading) {
    return <Loader />
  }

  return (
    <Box
      sx={{
        width: { xs:"100vw" , sm: "100%", md: "50%" },
        height: "90vh",
        overflowY: "scroll",
        px: { sm: 12, md: 0 },
      }}>
      {children}
    </Box>
  )
}

export default Content