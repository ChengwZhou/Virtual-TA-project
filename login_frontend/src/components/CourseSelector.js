import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const CourseSelector = ({ tables, selectedTable, setSelectedTable }) => {
  return (
    <Box sx={{ height: '50%', mb: 2 }}>
      <Typography variant="h6">Select the class you want to ask:</Typography>
      {tables.map((table, index) => (
        <Button
          key={index}
          variant="contained"
          onClick={() => setSelectedTable(table)}
          sx={{
            m: 1,
            width: '90%',
            backgroundColor: table === selectedTable ? 'primary.main' : '#ffffff',
            color: table === selectedTable ? '#ffffff' : 'primary.main',
            '&:hover': {
              backgroundColor: table === selectedTable ? 'primary.dark' : '#eeeeee'
            }
          }}
        >
          {table}
        </Button>
      ))}
    </Box>
  );
};

export default CourseSelector;
