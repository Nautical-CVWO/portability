import React, { MouseEvent } from 'react'

import { Button, ButtonProps, Typography } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
    label: string;
    colour?: string;
    onClick: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

const CustomButton = ({label, colour = "#161616", onClick}: CustomButtonProps) => {
  return (
    <>
      <Button sx={{backgroundColor: colour, border:'1px solid white'}} onClick={onClick}>
        <Typography sx={{color: 'white', padding:'10px', fontFamily: 'Montserrat'}}>{label}</Typography>
      </Button>
    
    </>
   
  )
}

export default CustomButton;
