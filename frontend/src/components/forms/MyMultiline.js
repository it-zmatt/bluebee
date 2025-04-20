import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';



const MyMultiline = (props) => {
    const {label, placeholder, name, control, width, height, margin, rows} = props;

    return (


        <Controller
        name = {name}
        control={control}
        rules={{ required: "Question is required" }} // Add any validation rules here
        render={({ 
            field: { onChange, value, name },
            fieldState: { error },
            formState,
         }) => (
            <TextField
            sx={{ width, margin, height }}
            id="outlined-multiline-static"
            label={label}
            placeholder={placeholder}
            multiline
            rows={rows}
            variant="outlined"
            onChange={onChange}
            value={value || ''} // Ensure controlled component behavior
            error={!!error} // Show error state if validation fails
            helperText={error?.message} // Display validation error message
        />
        )
        }
        />






        
    );
};

export default MyMultiline;