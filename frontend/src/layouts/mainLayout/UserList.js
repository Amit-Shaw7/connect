import React from "react";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Loader from "../../components/loader/Loader";
import User from "./User";
import CustomCard from "../../components/customCard/CustomCard";
const UserList = ({ loading, users, type }) => {
    if (loading) {
        return <Loader />
    }

    if (users?.length === 0) {
        return <Stack mt={2}>
            <Typography textAlign="center">No {type}</Typography>
        </Stack>
    }
    return (
        <CustomCard p={1}>
            <Stack spacing={1}>
                {
                    users?.length > 0 && users?.map((user) => (
                        <User key={user?._id} user={user} type="user" />
                    ))
                }
            </Stack>
        </CustomCard>
    )
}

export default UserList;