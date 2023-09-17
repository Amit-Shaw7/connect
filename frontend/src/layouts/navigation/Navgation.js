import React from "react";
import { Link, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { links } from "./navLinks";

const Navigation = () => {
  const location = useLocation();

  return (
    <Stack
      sx={{
        width: {xs:"0px" , sm: "0px", md: "20%" , lg:"20%"},
        height: "100%",
        overflowY: "scroll",
        borderLeft:"0.5px solid #f5f5f5",
      }}>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          px: 1
        }}
      >
        {
          links?.map((item) => (
            <Link key={item?.path} className="remove-link-style" to={item.path}>
              <ListItemButton
                key={item?.path}
                selected={location.pathname === item?.path}
              >
                <ListItemIcon>
                  {location.pathname === item?.path ? item?.selectedIcon : item?.icon}
                </ListItemIcon>
                <ListItemText primary={item?.title} />
              </ListItemButton>
            </Link>
          ))
        }
      </List>
    </Stack>
  )
}

export default Navigation;