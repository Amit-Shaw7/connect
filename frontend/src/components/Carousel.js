import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBackIos, ArrowForwardIos, ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Box, Fab, IconButton, Typography } from '@mui/material';
import { Image } from './image';
import Morevertical from './morevertical';

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


const Carousel = ({ stories, idx }) => {
    console.log(stories);
    const [currentIndex, setCurrentIndex] = useState(idx);
    const [direction, setDirection] = useState('left');


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

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            sx={{
                width: { lg: "350px", md: "350px", sm: "350px", xs: "300px" },
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
                    zIndex: 5,
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
            <Morevertical  variant="light"/>
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
                    bottom: "10px",
                    fontSize: "1.3rem"
                }}
            >
                {stories[currentIndex]?.text}
            </Typography>
        </Box>
    )
}

export default Carousel;