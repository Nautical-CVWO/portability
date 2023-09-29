import React, { MouseEvent } from 'react'

import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
    label: string;
    onClick: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

const CustomButton = ({label, color, onClick}: CustomButtonProps) => {
  return (<>
    
      <Button color={color} onClick={onClick}>
        {label}
      </Button>
    
    </>
   
  )
}

export default CustomButton;
