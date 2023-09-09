import React from "react";
import { Avatar } from "@mui/material";

const CustomAvatar = ({user , height , width}) => {
    return (
        <Avatar
            src={user?.avatar}
            alt={user?.name}
            sx={{
                height: height || "50px" ,
                width: width || "50px"
            }}
        >
            {user?.avatar ? "" : user?.name?.charAt(0).toUpperCase()}
        </Avatar>
    )
}

export default CustomAvatar