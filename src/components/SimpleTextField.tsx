import React, { useEffect } from 'react'

import { TextField } from '@mui/material';
import { FieldProps, useFormikContext } from 'formik';

interface SimpleTextFieldProps {
    name: string;
    label: any;
    type?: string;
    rows?: number;
    multiline?: boolean;
    disabled?: boolean;
    // placeholder: any;
}

const SimpleTextField = ({name, label, type="text", rows=1, multiline = false, disabled = false, ...props}: SimpleTextFieldProps) => {

    const formik = useFormikContext();
    return (
        <TextField 
            name={name}
            label={label}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}  
            fullWidth
            multiline={multiline}
            type={type}
            rows={rows}
            disabled={disabled}
            // placeholder={placeholder}
            {...props}       
        />
    );
}

export default SimpleTextField;
