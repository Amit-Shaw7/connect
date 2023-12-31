import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress, ListItemButton, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchSearchedUsersFn } from '../store/actions/UserActions';
import CustomAvatar from "../components/CustomAvatar";
import { Link } from 'react-router-dom';
import Loader from './Loader';


export default function SearchUserMenu() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [query, setQuery] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleQuery = (e) => {
        setLoading(true);
        setQuery(e.target.value);
        if (e.target.value.length === 0) {
            setOptions([]);
        }
        if (e.target.value.length > 0) {
            handleClick(e.target.value);
        }
        setLoading(false);
    };

    const handleClick = async (queryTyped) => {
        if (queryTyped) {
            await dispatch(fetchSearchedUsersFn(queryTyped, setOptions));
        }
        console.log(options);
    };

    // const loading = open && options.length === 0;

    return (
        <Autocomplete
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            freeSolo
            size='small'
            id="asynchronous"
            loading={loading}
            sx={{ width: 300 }}
            options={options}
            autoHighlight
            getOptionLabel={(option) => option.name}
            loadingText={<Loader />}
            
            renderOption={(props, option) => (
                <Link to={`/user/${option?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItemButton dense {...props}>
                        <CustomAvatar height="30px" width="30px" user={option} />
                        <Typography ml={1}>
                            {option?.name}
                        </Typography>
                    </ListItemButton>
                </Link>
            )}
            renderInput={(params) => (
                <TextField
                    sx={{
                        borderRadius: "5px"
                    }}
                    value={query}
                    onChange={handleQuery}
                    size='small'
                    {...params}
                    placeholder="Search user"
                    inputProps={{
                        ...params.inputProps,
                        endadornment: (
                            <React.Fragment>
                                {/* {loading ? <CircularProgress color="inherit" size={20} /> : null} */}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
};