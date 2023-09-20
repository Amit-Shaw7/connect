import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import { fetchSuggestedUsersFn } from "../../store/actions/UserActions";
import UserList from "./UserList";
import { Typography } from "@mui/material";

const fetchSuggestedUser = async (dispatch, setUsers , setLoading) => {
    const users = await dispatch(fetchSuggestedUsersFn(setLoading));
    setUsers(users);
};

const Suggestions = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchSuggestedUser(dispatch, setUsers , setLoading);
    }, [dispatch]);

    return (
        <Stack
            sx={{
                width: { xs: "0px", sm: "0px", md: "30%" , lg:"30%"},
                p: 2,
            }}
        >
            <Typography
                mb={1}
                variant="h6"
            >
                Suggested users
            </Typography>
            <UserList
                loading={loading}
                users={users}
                type="suggestions"
            />
        </Stack>
    )
}

export default Suggestions