import { Button, CircularProgress } from '@mui/material'
import React from 'react'

const CustomButton = ({ loading, text, sx, size, onClickFn , disabled}) => {
    console.log(disabled);
    return (
        <Button
            color='primary'
            variant='contained'
            size={size ? size : "large"}
            sx={{
                textTransform: "capitalize",
                ...sx
            }}
            onClick={onClickFn}
            disabled={disabled}
        >
            {
                loading
                    ?
                    <CircularProgress
                        color="inherit"
                        size="26px"
                    />
                    : text
            }
        </Button>
    )
}

export default CustomButton