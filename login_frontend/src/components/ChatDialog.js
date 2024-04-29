import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography} from '@mui/material';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import './ChatDialog.css';

const ChatDialog = ({ tableName }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [alertInfo, setAlertInfo] = useState({ open: false, text: '', severity: 'info' });

  const fetchReply = async (userMessage) => {
    try {
      const response = await axios.post('http://lax.nonev.win:5000/ask', {
        question: userMessage,
        courseID: tableName
      });

      if (response.data && response.data.hasAnswer) {
        const newMessage = { text: response.data.answer, author: "bot", image: response.data.link[0] };
        setMessages(messages => [...messages, newMessage]);
      } else {
        setMessages(messages => [...messages, { text: "Please wait for the instructor to answer.", author: "bot" }]);
      }
    } catch (error) {
      console.error('Error fetching reply:', error);
      setMessages(messages => [...messages, { text: "Failed to fetch reply, please try again.", author: "bot" }]);
    }
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) {
      openAlert('Please enter your question here.', 'error');
      return;
    } 
    const newMessage = { text: inputMessage, author: "user" };
    setMessages(messages => [...messages, newMessage]);
    setInputMessage("");
    await fetchReply(inputMessage);
    openAlert('Your question has been sent successfully.', 'success');
  };

  const openAlert = (message, severity) => {
    setAlertInfo({ open: true, text: message, severity: severity });
    setTimeout(() => {
      setAlertInfo({ open: false, text: '' });
    }, 5000);
  };

  const closeAlert = () => {
    setAlertInfo({ ...alertInfo, open: false });
  };

  const courseStatusMessage = tableName ? "Currently Asking for: " + tableName : "Please select a course first.";

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', p: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {courseStatusMessage}
      </Typography>
      <Box className="message-list">
        {alertInfo.open && (
          <Alert severity="error"> {alertInfo.text} </Alert>
        )}
        {messages.map((message, index) => (
            <Box key={index} sx={{ textAlign: message.author === 'user' ? 'right' : 'left', mb: 1 }}>
                <Typography className="message-author">{message.author.toUpperCase()}</Typography>
                <Box className={`message-bubble ${message.author === 'user' ? 'user-message' : 'bot-message'}`}>
                    <Typography>{message.text}</Typography>
                    {message.image && <img src={message.image} alt="Related visual content" style={{ maxWidth: '100%', marginTop: 8 }} />}
                </Box>
            </Box>
        ))}
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter your question..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' ? handleSend() : null}
        sx={{ mb: 1 }}
      />
      <Button variant="contained" fullWidth onClick={handleSend} disabled={!tableName}>Send</Button>
    </Box>
  );
};

export default ChatDialog;
