import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBackIos, ArrowForwardIos, ArrowLeft, ArrowRight, Delete, Edit, MoreVert, Settings } from '@mui/icons-material';
import { Box, Fab, IconButton, ListItemIcon, MenuItem, Popover, Typography } from '@mui/material';
import { Image } from './image';
import Morevertical from './morevertical';
import AddStoryModal from './modals/AddStoryModal';
import { useDispatch } from 'react-redux';
import { deleteStoryFn } from '../store/actions/StoryAction';

const slideVariants = {
    hiddenRight: {
        x: "100%",
        opacity: 0,
    },
    hiddenLeft: {
        x: "-100%",
        opacity: 0,
    },
    visible: {
        x: "0",
        opacity: 1,
        transition: {
            duration: 1,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: {
            duration: 0.5,
        },
    },
};


const Carousel = ({ user , stories, idx }) => {
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(idx);
    const [direction, setDirection] = useState('left');
    const [anchorEl, setAnchorEl] = useState(null);
    const [openEditStory, setOpenEditStory] = useState(false);
    const open = Boolean(anchorEl);

    const handleNext = () => {
        console.log(currentIndex);
        setDirection("right");
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 === stories.length ? 0 : prevIndex + 1
        );
    };
    const handlePrevious = () => {
        setDirection("left");

        console.log(currentIndex);
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? stories.length - 1 : prevIndex - 1
        );
    };
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        console.log("CLicked");
        setAnchorEl(null);
        console.log(anchorEl);
    };

    const handleDeleteStory = () => {
        dispatch(deleteStoryFn(stories[0]._id));
        handlePopoverClose();
    };

    const handleOpenEditStory = () => {
        setOpenEditStory(true);
        handlePopoverClose();
    }
    const handleCloseEditStory = () => {
        setOpenEditStory(false);
    } 

    console.log(open);

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-around"
                sx={{
                    width: { lg: "400px", md: "350px", sm: "350px", xs: "300px" },
                    height: { md: "700px", sm: "600px", xs: "500px" },
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                <Box
                    height="100%"
                    display="flex"
                    alignItems="center"
                    sx={{
                        position: "absolute",
                        left: 0,
                        // zIndex: 5, 
                    }}
                >
                    <Fab
                        size='small'
                        onClick={handlePrevious}
                        sx={{
                            backgroundColor: "#f5f5f5",
                        }}
                    >
                        <ArrowBackIos />
                    </Fab>
                </Box>

                {/* <AnimatePresence> */}
                <motion.img
                    style={{ borderRadius: "10px" }}
                    src={stories[currentIndex]?.media}
                    key={currentIndex}
                    alt="story"
                    height="100%"
                    width="100%"
                    variants={slideVariants}
                    initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                    animate="visible"
                    exit="exit"
                />
                {/* </AnimatePresence> */}

                {/* <Morevertical  variant="light"/> */}

                <Box
                    height="100%"
                    display="flex"
                    alignItems="center"
                    sx={{
                        position: "absolute",
                        right: 0,
                        zIndex: 5,
                    }}
                >
                    <Fab
                        size='small'
                        onClick={handleNext}
                        // color='secondary'
                        sx={{
                            backgroundColor: "#f5f5f5",
                        }}
                    >
                        <ArrowForwardIos />
                    </Fab>
                </Box>

                <Typography
                    color={stories[currentIndex]?.color}
                    textAlign="center"
                    sx={{
                        wordWrap: "break-word",
                        width: "100%",
                        position: "absolute",
                        bottom: "50px",
                        fontSize: "1.3rem"
                    }}
                >
                    {stories[currentIndex]?.text}
                </Typography>

                <Box
                    sx={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "gray",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        p: 0.2,
                        cursor: "pointer",
                        zIndex: 5
                    }}
                >
                    {stories[currentIndex]?.user === user._id && <MoreVert onClick={handlePopoverOpen} htmlColor='white' fontSize="medium" />}
                    <StoryActionPopover open={open} anchorEl={anchorEl} handleOpenEditStory={handleOpenEditStory} handlePopoverClose={handlePopoverClose} handleDeleteStory={handleDeleteStory} />
                </Box>
            </Box>
            <AddStoryModal type="edit" story={stories[0]} open={openEditStory} handleClose={handleCloseEditStory}/>
        </>
    )
}

export default Carousel;

const StoryActionPopover = ({ open, anchorEl, handlePopoverClose, handleOpenEditStory, handleDeleteStory }) => {
    return (
        <Popover
            open={open}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            closeAfterTransition
        >


            <MenuItem onClick={handleOpenEditStory}>
                <ListItemIcon>
                    <Edit />
                </ListItemIcon>
                Edit
            </MenuItem>
            <MenuItem onClick={handleDeleteStory} sx={{ color: "red" }}>
                <ListItemIcon>
                    <Delete color="error" />
                </ListItemIcon>
                Delete
            </MenuItem>
        </Popover>
    )
}