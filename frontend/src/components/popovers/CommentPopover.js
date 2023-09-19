import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch } from "react-redux";
import { deleteCommentFn } from "../../store/actions/CommentActions";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

const CommentActionPopover = ({ anchorEl, open, handlePopoverClose, id, handleOpenModal }) => {
    const dispatch = useDispatch();
    const handleDeleteComment = () => {
        dispatch(deleteCommentFn(id));
    }
    return (
        <Popover
            open={open}
            anchorOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            closeAfterTransition
        >


            <MenuItem onClick={handleOpenModal}>
                <ListItemIcon>
                    <Edit />
                </ListItemIcon>
                Edit
            </MenuItem>
            <MenuItem onClick={handleDeleteComment} sx={{ color: "red" }}>
                <ListItemIcon>
                    <Delete color="error" />
                </ListItemIcon>
                Delete
            </MenuItem>
        </Popover>
    )
}

export default CommentActionPopover;