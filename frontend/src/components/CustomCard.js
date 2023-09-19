import Card from "@mui/material/Card";
import React from "react";


const CustomCard = ({ children, p}) => {
    return (
        <Card
            variant='outlined'
            sx={{
                p: p ? p : 2,
                position: "relative",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                flexDirection: "column",
                height: "max-content"
            }}
        >
            {children}
        </Card>
    )
}

export default CustomCard