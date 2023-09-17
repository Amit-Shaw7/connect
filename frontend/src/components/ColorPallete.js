import { Box, Stack } from '@mui/material'
import React from 'react'

const ColorPallete = ({ setColor }) => {
  const handleChangeColor = (color) => {
    console.log(color);
    setColor(color);
  }
  return (
    <Stack spacing={1}>
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Box onClick={() => handleChangeColor("red")} height="20px" width="20px" sx={{ cursor: "pointer", border: "1px solid black", borderRadius: "5px", backgroundColor: "red" }}></Box>
        <Box onClick={() => handleChangeColor("blue")} height="20px" width="20px" sx={{ cursor: "pointer", border: "1px solid black", borderRadius: "5px", backgroundColor: "blue" }}></Box>
      </Stack>
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Box onClick={() => handleChangeColor("green")} height="20px" width="20px" sx={{ cursor: "pointer", border: "1px solid black", borderRadius: "5px", backgroundColor: "green" }}></Box>
        <Box onClick={() => handleChangeColor("yellow")} height="20px" width="20px" sx={{ cursor: "pointer", border: "1px solid black", borderRadius: "5px", backgroundColor: "yellow" }}></Box>
      </Stack>
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Box onClick={() => handleChangeColor("white")} height="20px" width="20px" sx={{ cursor: "pointer", border: "1px solid black", borderRadius: "5px", backgroundColor: "white" }}></Box>
        <Box onClick={() => handleChangeColor("black")} height="20px" width="20px" sx={{ cursor: "pointer", border: "1px solid black", borderRadius: "5px", backgroundColor: "black" }}></Box>
      </Stack>
    </Stack>
  )
}

export default ColorPallete;