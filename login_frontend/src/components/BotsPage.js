import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const BotsPage = () => {
    const [tables, setTables] = useState([]);
    const [open, setOpen] = useState(false);
    const [newBotName, setNewBotName] = useState('');

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const response = await axios.get('http://lax.nonev.win:5000/list-tables');
            if (response.data && response.data.status === 200) {
                setTables(response.data.Tables);
            }
        } catch (error) {
            console.error('Failed to fetch tables:', error);
        }
    };

    const handleOpen = () => {
        setNewBotName('');  // Reset the bot name input field to empty
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleCreateBot = async () => {
        if (!newBotName.trim()) {
            alert('Please enter a name for the bot.');  // Alert the user to enter a bot name
            return;  // Exit the function to prevent further execution
        }

        const data = {
            courseID: newBotName,  // User-inputted name as the courseID
            fileID: "Bot creation",  // Fixed value for fileID
            content: {}  // Assuming you might need to send additional data in the future
        };

        try {
            const response = await axios.post('http://lax.nonev.win:5000/upload-json', data);
            console.log('Response:', response.data);
            alert(`Bot created successfully: ${response.data.message}`);
            fetchTables();
        } catch (error) {
            console.error('Failed to create bot:', error);
            alert('Failed to create bot');
        }

        handleClose(); // Close the dialog after submitting
    };

    return (
        <div>
            <h1>Bot Management Page</h1>
            <Button onClick={handleOpen} variant="contained" color="primary">Create New Bot</Button>
            <ul>
                {tables.map((table, index) => (
                    <li key={index}>
                        {table}
                        <Link to={`/modify/${table}`} className="modify-button">Modify</Link>
                    </li>
                ))}
            </ul>
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

export default BotsPage;
