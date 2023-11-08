import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { Box } from "@mui/material";
import { fetchMyStory, fetchStoriesFn } from "../../store/actions/StoryAction";

const Content = ({ children }) => {
  const { loading } = useSelector(state => state.user);
  const { userId } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    userId && dispatch(fetchStoriesFn());
    userId && dispatch(fetchMyStory());
  }, [dispatch, navigate, userId]);

  if (loading) {
    return <Loader />
  }

  return (
    <Box
      id="scrollableDiv"
      sx={{
        width: { xs: "100%", sm: "100%", md: "50%" , lg:"40%" },
        height: "90vh",
        overflowY: "scroll",
        px: { xs: 0, sm: 8, md: 0 },
        position: "relative",
      }}>
      {children}
    </Box>
  )
}

export default Content