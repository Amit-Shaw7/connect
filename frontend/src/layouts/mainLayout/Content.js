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