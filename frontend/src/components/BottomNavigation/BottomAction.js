import { ListItemButton, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const BottomAction = ({ icon, selectedIcon, label, selected , path }) => {
    return (
        <Link style={{textDecoration:"none" , color:"gray"}} to={path}>
            <ListItemButton sx={{ width: "100px", flexDirection: "column", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {selected ? selectedIcon : icon}
                <Typography variant='caption' fontSize="0.9rem">{label}</Typography>
            </ListItemButton>
        </Link>
    )
}

export default BottomAction