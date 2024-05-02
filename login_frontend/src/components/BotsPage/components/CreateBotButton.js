import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

const CreateNewButton = () => {
    const [tables, setTables] = useState([]);
    const [open, setOpen] = useState(false);
    const [newBotName, setNewBotName] = useState('');

    const handleOpen = () => {
        setNewBotName('');
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleCreateBot = async () => {
        if (!newBotName.trim()) {
            alert('Please enter a name for the bot.');
            return;
        }

        const data = {
            courseID: newBotName,
            fileID: "Bot creation",
            content: {}
        };

        try {
            const response = await axios.post('http://lax.nonev.win:5000/upload-json', data);
            alert(`Bot created successfully: ${response.data.message}`);
        } catch (error) {
            console.error('Failed to create bot:', error);
            alert('Failed to create bot');
        }

        handleClose();
    };

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" color="primary">Create New Bot</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a New Bot</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Bot Name"
                        type="text"
                        fullWidth
                        value={newBotName}
                        onChange={(e) => setNewBotName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleCreateBot} color="primary">Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateNewButton;
