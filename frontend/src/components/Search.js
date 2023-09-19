import { Box, IconButton, InputBase, Stack } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { fetchSearchedUsersFn } from "../store/actions/UserActions";
import Loader from "./Loader";


const Search = ({ setUsers }) => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const handleQuery = (e) => {
        setQuery(e.target.value);
        if (e.target.value.length > 3) {
            handleClick(e.target.value);
        }
    };

    const handleClick = (queryTyped) => {
        if (queryTyped) {
            setLoading(true);
            dispatch(fetchSearchedUsersFn(queryTyped, setUsers));
            setLoading(false);
        }
    };

   

    if (loading) {
        <Loader />
    }
    return (
        <Box
            sx={{
                border: "1px solid lightgray",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <InputBase
                sx={{
                    width: "100%",
                    pl: 2
                }}
                placeholder='Search'
                value={query}
                onChange={handleQuery}
                size='small'
                endAdornment={
                    <Stack direction="row" spacing={1}>
                        <IconButton size="medium">
                            <SearchIcon color='primary' />
                        </IconButton>
                    </Stack>
                }
            />
        </Box>
    )
}

export default Search