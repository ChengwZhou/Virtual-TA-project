import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Input, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const UploadVideo = () => {
    const [open, setOpen] = useState(false);
    const [video, setVideo] = useState(null);
    const [courseID, setCourseID] = useState('');
    const [fileID, setFileID] = useState('');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await axios.get('http://lax.nonev.win:5000/list-tables');
            if (response.data && response.data.status === 200) {
                setCourses(response.data.Tables);
            }
        };
        fetchCourses();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('video', video);
        formData.append('courseID', courseID);
        formData.append('fileID', fileID);

        try {
            const response = await axios.post('http://lax.nonev.win:5000/upload-rawVideo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed');
        }
        handleClose();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Upload Video
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload Video</DialogTitle>
                <DialogContent>
                    <Box sx={{ marginBottom: 2 }}>  
                        <Input
                            type="file"
                            onChange={e => setVideo(e.target.files[0])}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>  
                        <FormControl fullWidth>
                            <InputLabel>Course ID</InputLabel>
                            <Select
                                value={courseID}
                                label="Course ID"
                                onChange={e => setCourseID(e.target.value)}
                            >
                                {courses.map((course, index) => (
                                    <MenuItem key={index} value={course}>
                                        {course}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>  
                        <TextField
                            fullWidth
                            label="File ID (Remark)"
                            value={fileID}
                            onChange={e => setFileID(e.target.value)}
                            margin="normal"  
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpload} disabled={!video || !courseID}>Upload</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UploadVideo;
