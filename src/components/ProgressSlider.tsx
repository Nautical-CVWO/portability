import React, { useEffect, useState } from 'react'

import { Badge, Slider, Typography } from '@mui/material';
import { FormikProps, useFormikContext } from 'formik';

interface ProgressSliderProps {
    name: string;
    min: number;
    max: number;
    defaultValue: number;
    header: any;
    disabled?: boolean;
}

const ProgressSlider = ({ name, min, max, defaultValue, header, disabled, ...props }: ProgressSliderProps) => {

    const formik: FormikProps<any> = useFormikContext();

    const [currColor, setCurrColor] = useState("error");

    // useEffect(() => {
    //     setCurrColor((color) => {
    //         if (formik.values[name] <= min + (max - min) * 0.333) {
    //             return "error";
    //         } else if (formik.values[name] <= min + (max - min) * 0.66) {
    //             return "warning";
    //         } else {
    //             return "success";
    //         }
    //     })
    // }, formik.values[name])


    return (
        <>
            <Typography variant="body1" sx={{ fontFamily: 'Arial', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {header}
            </Typography>

            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", margin: "10px" }}>
                <Badge badgeContent={<>{formik.values[name]}</>} color={currColor as "error" | "default" | "warning" | "success" | "primary" | "secondary" | "info"} sx={{
                    borderRadius: '50%',
                    position: 'relative',
                    left: '5px',
                }} />
                <Slider
                    name={name}
                    onChange={(event) => {
                        formik.handleChange(event);
                        setCurrColor(() => {
                            if (formik.values[name] <= min + (max - min) * 0.333) {
                                return "error";
                            } else if (formik.values[name] <= min + (max - min) * 0.66) {
                                return "warning";
                            } else {
                                return "success";
                            }
                        })
                    }}
                    value={formik.values[name]}
                    onBlur={formik.handleBlur}
                    min={min}
                    max={max}
                    defaultValue={defaultValue}
                    sx={{
                        marginLeft: '30px',
                    }}
                    disabled={disabled}
                    {...props}
                />
            </div>
        </>

    );
}

export default ProgressSlider;
