import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography, List, ListItem, Button } from '@mui/material';
import ChatDialog from './ChatDialog'; 
import UploadVideo from './UploadVideo'; 
import CourseSelector from './CourseSelector';

const HomeMain = () => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState("");
  
    useEffect(() => {
      const fetchTables = async () => {
        try {
          const response = await axios.get('http://lax.nonev.win:5000/list-tables');
          if (response.data && response.data.status === 200) {
            setTables(response.data.Tables);
          }
        } catch (error) {
          console.error('Error fetching tables:', error);
          setTables([]);
        }
      };
  
      fetchTables();
    }, []);
  
    return (
      <Box sx={{ flexGrow: 1, height: '100vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ p: 2 }}>
            <CourseSelector tables={tables} selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
            <Box sx={{ height: '50%' }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Upload new knowledge to knowledge base, will be changed to another page
                </Typography>  
              <UploadVideo/>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ p: 2 }}>
              <ChatDialog tableName={selectedTable} />
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default HomeMain;