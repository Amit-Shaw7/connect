import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUserFn } from "../../store/actions/UserActions";
import Loader from "../../components/loader/Loader";
import { Box } from "@mui/material";

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
  }, [dispatch, navigate, userId]);

  if (loading) {
    return <Loader />
  }

  return (
    <Box
      sx={{
        height: "90vh",
        width: "100%",
        overflowY: "scroll",
        px: { lg: 12, md: 0, sm: 15, xs: 0 }
      }}>

      {children}
    </Box>
  )
}

export default Content