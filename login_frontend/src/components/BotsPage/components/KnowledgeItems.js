import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const KnowledgeItems = ({ courseID }) => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [startKey, setStartKey] = useState(null);

    // Fetch data
    const fetchData = async (hasStartKey) => {
        try {
            const response = await axios.post('http://lax.nonev.win:5000/readDB', {
                hasStartKey: hasStartKey,
                startKey: startKey,
                courseID: courseID,
                readLimit: "10"
            });
            if (response.data && response.data.result.status === 200) {
                setItems(response.data.result.items);
                setStartKey(response.data.result.startKey);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    // Fetch data on mount and when courseID changes
    useEffect(() => {
        fetchData(false);
    }, [courseID]);

    // Handle pagination
    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        fetchData(true);
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            fetchData(false); // Implement a way to fetch previous page data if possible
        }
    };

    return (
        <Grid container spacing={2}>
            {items.map((item, index) => (
                <Grid item xs={12} key={index}> {/* Set Grid item to full width */}
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" color="text.secondary">
                                Uploaded: {new Date(item.CreatedTime).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                            <Typography variant="body1">
                                {item.OriginalText}
                            </Typography>
                            {item.frameURL && item.frameURL !== 'None' && (
                                <img src={item.frameURL} alt="Frame" style={{ maxWidth: '100%', marginTop: '10px' }} />
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Button onClick={handlePrevious} disabled={currentPage === 0}>Previous</Button>
                <Button onClick={handleNext}>Next</Button>
            </Grid>
        </Grid>
    );
};

export default KnowledgeItems;
