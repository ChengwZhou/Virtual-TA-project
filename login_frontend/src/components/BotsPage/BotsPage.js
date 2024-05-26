import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Grid, Box, List, ListItem } from '@mui/material';
import CourseSelector from '../CourseSelector/CourseSelector';
import CreateBotButton from './components/CreateBotButton';
import UploadVideo from './components/UploadVideo';
import KnowledgeItems from './components/KnowledgeItems';
const BotsPage = () => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState("");
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

    return (
        <Box sx={{ flexGrow: 1, height: '100vh' }}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={2} md={2} sx={{ p: 2, bgcolor: 'grey.100' }}>
                    <CreateBotButton/>
                    <CourseSelector tables={tables} selectedTable={selectedTable} setSelectedTable={setSelectedTable} prompt="Select the Bot you want to modify:"/>
                </Grid>
                <Grid item xs={12} sm={8} md={8} sx={{ p: 2 }}>
                    {selectedTable ? (
                        <KnowledgeItems courseID={selectedTable} />
                    ) : (
                        <Typography variant="h6" style={{ textAlign: 'center', marginTop: 20 }}>
                            Select a course to view its knowledge base.
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={2} md={2} sx={{ p: 2 }}>
                    <Box sx={{ height: '100%' }}>
                        <Typography variant="subtitle1" sx={{ mb: 2, paddingTop: '30px' }}>
                            Add new knowledge
                        </Typography>
                        <UploadVideo/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BotsPage;