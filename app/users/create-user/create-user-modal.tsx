"use client"

import { Box, Button, Modal, Stack, TextField } from "@mui/material"
import { FormResponse } from "../../common/interfaces/form-response.interface";
import { useState } from "react";
import createUser from "../actions/create-users";

const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

interface CreateUserModalProps {
    open: boolean;
    handleClose: () => void;
}

export default function CreateUserModal({open, handleClose}: CreateUserModalProps) {

    const [response, setResponse] = useState<FormResponse>();
    const onClose = () => {
        setResponse(undefined);
        handleClose();
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={styles} >
                <form className="w-full max-w-xs" action={async (formData) => {
                   const response = await createUser(formData);
                   setResponse(response);
                   if(!response.error) {
                    onClose();
                   }
                }}>
                <Stack spacing={2} >
                    <TextField name="email" label="Email" variant="outlined" type="email"   
                    helperText={response?.error} 
                    error={!!response?.error}
                    required
                />
                    <TextField name="password" label="Password" variant="outlined" type="password" 
                    helperText={response?.error} 
                    error={!!response?.error}
                />
                <Button type="submit" variant="contained">Submit</Button>
                </Stack>
                </form>
            </Box>
        </Modal>
    )
}