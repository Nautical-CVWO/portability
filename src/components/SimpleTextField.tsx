import React, { useEffect } from 'react'

import { TextField } from '@mui/material';
import { FieldProps, FormikProps, useFormikContext } from 'formik';

interface SimpleTextFieldProps {
    name: string;
    label: any;
    type?: string;
    rows?: number;
    multiline?: boolean;
    disabled?: boolean;
    // placeholder: any;
    isEmployeeSurvey?: boolean;
    required?: boolean;
}

const labelContainerStyle = {
    display: "flex",
    alignItems: "center",
};

const SimpleTextField = ({ name, label, type = "text", rows = 1, multiline = false, disabled = false, isEmployeeSurvey = false, required = true, ...props }: SimpleTextFieldProps) => {

    const formik: FormikProps<any> = useFormikContext();
    return (
        <TextField
            required
            InputLabelProps={{ required: false }}
            name={name}
            label={required ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {label}
                    <span style={{ color: 'grey', marginLeft: '5px', lineHeight: 1 }}>
                        *
                    </span>
                </div>) : <>{label}</>
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            multiline={multiline}
            type={type}
            rows={rows}
            disabled={disabled}
            value={formik.values[name]}
            // placeholder={placeholder}
            // sx={formik.dirty ? {} : { color: 'white' }}
            InputProps={isEmployeeSurvey ? formik.values["email"] !== undefined ? {} : { style: { color: 'white' } } : {}}
            {...props}
        />
    );
}

export default SimpleTextField;
