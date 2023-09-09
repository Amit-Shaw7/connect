import { Box, Modal } from '@mui/material';
import React from 'react';
import UserList from '../userList/UserList';
import CrossButton from './CrossButton';
import { style } from './modalStyle';
import Loader from '../loader/Loader';

const UserListModal = ({ loading, open, handleClose, users, sx }) => {
    console.log(loading);
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={{ ...style, ...sx }}>
                {
                    loading
                        ?
                        <Loader />
                        :
                        <>
                            <CrossButton handleClose={handleClose} />
                            <UserList users={users} />
                        </>
                }
            </Box>
        </Modal>
    )
}

export default UserListModal;


