import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import MoreVertical from "../MoreVertical";
import User from "../../layouts/mainLayout/User";
import { ListItemIcon, MenuItem, Popover } from "@mui/material";
import { Delete, Edit, } from "@mui/icons-material";
import UpdatePostModal from "../modals/UpdatePostModal";
import { useDispatch } from "react-redux";
import { deletePostFn } from "../../store/actions/PostActions";

const PostOwner = ({ editable, post, handlePostText }) => {
  const { _id, user, createdAt } = post;

  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = () => {
    dispatch(deletePostFn(_id));
  };

  const handleOpenModal = () => {
    handlePopoverClose();
    setOpenModal(true);
  }
  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const open = Boolean(anchorEl);
  return (
    <>
      <Stack
        flexDirection="row"
        gap="10px"
        alignItems="center"
        sx={{
          mx: { xs: 1 }
        }}
      >
        {editable && <MoreVertical onclickFn={handlePopoverOpen} />}
        {
          editable
          &&
          <Popover
            open={open}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            closeAfterTransition
          >


            <>
              <MenuItem onClick={handleOpenModal}>
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                Edit
              </MenuItem>
              <MenuItem sx={{ color: "red" }} onClick={handleDeletePost}>
                <ListItemIcon>
                  <Delete color="error" />
                </ListItemIcon>
                Delete
              </MenuItem>
            </>
          </Popover>
        }

        <User user={user} createdAt={createdAt} type="post" />
        <Stack
          spacing={-0.5}
        >
        </Stack>
      </Stack>
      <UpdatePostModal
        post={post}
        handleClose={handleCloseModal}
        open={openModal}
        handlePostText={handlePostText}
      />
    </>
  )
}

export default PostOwner;