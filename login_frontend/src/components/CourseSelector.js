import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const CourseSelector = ({ tables, selectedTable, setSelectedTable, prompt }) => {
  return (
    <Box sx={{ height: '50%', mb: 0, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 1.5, fontSize: '0.85rem', paddingLeft: '10px',  paddingTop: '5px'}}>{prompt}</Typography>
      {tables.map((table, index) => (
        <Button
          key={index}
          variant="contained"
          onClick={() => setSelectedTable(table)}
          sx={{
            m: 1,
            width: 'calc(100% - 16px)',  // Adjust width to account for margins
            backgroundColor: table === selectedTable ? '#e0e0e0' : 'transparent',
            color: 'black',
            border: '1px solid',
            borderColor: table === selectedTable ? '#e0e0e0' : 'transparent',
            boxShadow: 'none',  // Remove box shadow
            justifyContent: 'flex-start',  // Align text to the left
            textTransform: 'none',  // Prevent uppercase transformation
            paddingLeft: '10px',  // Left padding to move text to the right
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#e0e0e0',
              boxShadow: 'none', 
              borderColor: 'transparent'
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
