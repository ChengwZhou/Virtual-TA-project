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
            width: 'calc(100% - 16px)',  
            backgroundColor: table === selectedTable ? '#e0e0e0' : 'transparent',
            color: 'black',
            border: '1px solid',
            borderColor: table === selectedTable ? '#e0e0e0' : 'transparent',
            boxShadow: 'none', 
            justifyContent: 'flex-start',  
            textTransform: 'none', 
            paddingLeft: '10px', 
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
