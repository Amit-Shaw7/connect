import { Box, Stack } from '@mui/material'
import React from 'react'

const colors = [
  [
    "#1450A3",
    "#3085C3"
  ],
  [
    "#D80032",
    "#A73121"
  ],
]

const ColorPallete = ({ setColor }) => {
  const handleChangeColor = (color) => {
    console.log(color);
    setColor(color);
  }
  return (
    <Stack spacing={1}>
      {
        colors.map((set, index) => (
          <Stack key={index} flexDirection="row" alignItems="center" gap={1}>
            {
              set?.map((color) => (
                  <Box key={color} onClick={() => handleChangeColor(color)} height="20px" width="20px" sx={{ cursor: "pointer", border: "1px solid black", borderRadius: "5px", backgroundColor: color }}></Box>
              ))
            }
          </Stack>

        ))
      }
    </Stack>

  )
}

export default ColorPallete;

