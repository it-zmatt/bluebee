import React from 'react';
import { Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const MyTextField = ({
    label,
    placeholder,
    name,
    control,
    rules,
    type = 'text',
    className,
    width = '25ch'
}) => {
    return (
        <Box
            component="div"
            sx={{ '& > :not(style)': {  width } }}
        >
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        type={type}
                        label={label}
                        placeholder={placeholder}
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : ''}
                        fullWidth
                    />
                )}
            />
        </Box>
    );
};

export default MyTextField;
